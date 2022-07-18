/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useApolloClient } from '@apollo/client';
import styled from '@emotion/styled';
import Button from '@ndla/button';
import { spacing } from '@ndla/core';
import { ListResource, TagSelector, TreeStructure } from '@ndla/ui';
import { isEqual, sortBy, uniq } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAllTags } from '../../containers/MyNdla/folderHelpers';
import {
  folderResourceFragment,
  useAddFolderMutation,
  useAddResourceToFolderMutation,
  useFolder,
  useFolderResourceMeta,
  useFolders,
  useUpdateFolderResourceMutation,
} from '../../containers/MyNdla/folderMutations';
import { GQLFolderResource } from '../../graphqlTypes';

export interface ResourceAttributes {
  path: string;
  resourceType: string;
  id: number;
}

interface Props {
  onClose: () => void;
  resource: ResourceAttributes;
}

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${spacing.small};
`;

const AddResourceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.normal};
`;

const AddResourceToFolder = ({ onClose, resource }: Props) => {
  const { t } = useTranslation();
  const { meta } = useFolderResourceMeta(resource);
  const { folders, loading } = useFolders();
  const [storedResource, setStoredResource] = useState<
    GQLFolderResource | undefined
  >(undefined);
  const [tags, setTags] = useState<{ id: string; name: string }[]>(
    getAllTags(folders).map(t => ({ id: t, name: t })),
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [canSave, setCanSave] = useState<boolean>(false);
  const cache = useApolloClient();
  const [selectedFolderId, setSelectedFolderId] = useState<string | undefined>(
    undefined,
  );
  const selectedFolder = useFolder(selectedFolderId);

  useEffect(() => {
    if (!loading && folders) {
      const test = cache.readFragment<GQLFolderResource>({
        fragment: folderResourceFragment,
        id: `FolderResource:${resource.path}`,
      });
      setStoredResource(test ?? undefined);
      setSelectedTags(test?.tags ?? []);
    }
  }, [loading, folders, cache, resource]);

  useEffect(() => {
    if (storedResource) {
      setSelectedTags(storedResource.tags);
    }
  }, [storedResource]);

  useEffect(() => {
    if (selectedFolder) {
      setCanSave(true);
    } else if (storedResource) {
      const _canSave = shouldUpdateFolderResource(storedResource, selectedTags);
      setCanSave(_canSave);
    } else {
      setCanSave(false);
    }
  }, [storedResource, selectedTags, selectedFolder]);

  const shouldUpdateFolderResource = (
    storedResource: GQLFolderResource,
    selectedTags: string[],
  ) => {
    const sortedStored = sortBy(storedResource.tags);
    const sortedSelected = sortBy(selectedTags);
    return !isEqual(sortedStored, sortedSelected);
  };

  const structureFolders = [
    {
      id: 'folders',
      name: t('myNdla.myFolders'),
      status: 'private',
      isFavorite: false,
      subfolders: folders,
      breadcrumbs: [],
      resources: [],
    },
  ];
  const { addFolder } = useAddFolderMutation();
  const { updateFolderResource } = useUpdateFolderResourceMutation();
  const { addResourceToFolder } = useAddResourceToFolderMutation(
    selectedFolder?.id ?? '',
  );

  const onSave = async () => {
    if (selectedFolder) {
      await addResourceToFolder({
        variables: {
          resourceId: resource.id,
          resourceType: resource.resourceType,
          path: resource.path,
          folderId: selectedFolder.id,
          tags: selectedTags,
        },
      });
    } else if (
      storedResource &&
      shouldUpdateFolderResource(storedResource, selectedTags)
    ) {
      await updateFolderResource({
        variables: { id: storedResource.id, tags: selectedTags },
      });
    }
    onClose();
  };

  const onAddNewFolder = async (name: string, parentId: string) => {
    const res = await addFolder({
      variables: {
        name,
        parentId: parentId !== 'folders' ? parentId : undefined,
      },
    });
    return res.data!.addFolder;
  };

  return (
    <AddResourceContainer>
      <h1>{t('myNdla.resource.addToMyNdla')}</h1>
      <ListResource
        link={resource.path}
        title={meta?.title ?? ''}
        topics={meta?.resourceTypes.map(rt => rt.name) ?? []}
        resourceImage={{
          src: meta?.metaImage?.url ?? '',
          alt: meta?.metaImage?.alt ?? '',
        }}
      />
      <TreeStructure
        folders={structureFolders}
        label={t('myNdla.myFolders')}
        onNewFolder={onAddNewFolder}
        onSelectFolder={setSelectedFolderId}
        defaultOpenFolders={['folders']}
        framed
        editable
      />
      <TagSelector
        prefix="#"
        label={t('myNdla.myTags')}
        tagsSelected={selectedTags}
        tags={tags}
        onToggleTag={tag => {
          if (selectedTags.some(t => t === tag)) {
            setSelectedTags(prev => prev.filter(t => t !== tag));
            return;
          }
          setSelectedTags(prev => uniq(prev.concat(tag)));
        }}
        onCreateTag={tag => {
          if (!tags.some(t => t.id === tag)) {
            setTags(prev => prev.concat({ id: tag, name: tag }));
          }
          setSelectedTags(prev => uniq(prev.concat(tag)));
        }}
      />
      <ButtonRow>
        <Button outline onClick={onClose}>
          {t('cancel')}
        </Button>
        <Button disabled={!canSave} onClick={onSave}>
          {t('save')}
        </Button>
      </ButtonRow>
    </AddResourceContainer>
  );
};

export default AddResourceToFolder;
