import {
  RESOURCE_TYPE_LEARNING_PATH,
  RESOURCE_TYPE_SUBJECT_MATERIAL,
  RESOURCE_TYPE_TASKS_AND_ACTIVITIES,
  RESOURCE_TYPE_ASSESSMENT_RESOURCES,
  RESOURCE_TYPE_SOURCE_MATERIAL,
  RESOURCE_TYPE_EXTERNAL_LEARNING_RESOURCES,
} from '../../constants';
import {
  GQLResource,
  GQLResourceInfoFragment,
  GQLResourceType,
} from '../../graphqlTypes';

export const sortOrder: Record<string, number> = {
  [RESOURCE_TYPE_LEARNING_PATH]: 1,
  [RESOURCE_TYPE_SUBJECT_MATERIAL]: 2,
  [RESOURCE_TYPE_TASKS_AND_ACTIVITIES]: 3,
  [RESOURCE_TYPE_ASSESSMENT_RESOURCES]: 4,
  [RESOURCE_TYPE_SOURCE_MATERIAL]: 5,
  [RESOURCE_TYPE_EXTERNAL_LEARNING_RESOURCES]: 6,
};

export const groupResourcesByResourceTypes = (
  supplementaryResources: GQLResourceInfoFragment[],
  coreResources: GQLResourceInfoFragment[],
) => {
  const resources = [
    ...coreResources,
    ...supplementaryResources
      .map(resource => ({
        ...resource,
        additional: true,
      }))
      .filter(resource => !coreResources.find(core => core.id === resource.id)), // don't show supp resources that exists in core
  ];
  return resources.reduce<Record<string, GQLResource[]>>((obj, resource) => {
    const resourceTypesWithResources = resource.resourceTypes?.map(type => {
      const existing = obj[type.id] ?? [];
      return { ...type, resources: [...existing, resource] };
    });
    const reduced = resourceTypesWithResources?.reduce(
      (acc, type) => ({ ...acc, [type.id]: type.resources }),
      {},
    );
    return { ...obj, ...reduced };
  }, {});
};

type SharedResourceType = Pick<GQLResourceType, 'id' | 'name'>;

export const sortResourceTypes = (resourceTypes: SharedResourceType[]) =>
  [...resourceTypes].sort((a, b) => {
    if (!sortOrder[a.id] && !sortOrder[b.id]) return 0;
    if (sortOrder[a.id] === undefined) return 1;
    if (sortOrder[b.id] === undefined) return -1;
    if (sortOrder[a.id]! > sortOrder[b.id]!) return 1;
    if (sortOrder[a.id]! < sortOrder[b.id]!) return -1;
    return 0;
  });

export const getResourceGroups = (
  resourceTypes: SharedResourceType[],
  supplementaryResources: GQLResourceInfoFragment[],
  coreResouces: GQLResourceInfoFragment[],
): GQLResourceType[] => {
  const groupedResources = groupResourcesByResourceTypes(
    supplementaryResources,
    coreResouces,
  );
  const sortedResourceTypes = sortResourceTypes(resourceTypes);

  return sortedResourceTypes
    .map(type => {
      const resources = groupedResources[type.id] ?? [];
      return { ...type, resources };
    })
    .filter(type => type.resources.length > 0);
};
