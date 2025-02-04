/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  ApolloCache,
  gql,
  QueryHookOptions,
  Reference,
  useApolloClient,
  useMutation,
} from '@apollo/client';
import {
  GQLAddFolderMutation,
  GQLAddResourceToFolderMutation,
  GQLDeleteFolderMutation,
  GQLDeleteFolderResourceMutation,
  GQLFolder,
  GQLFolderResourceMetaQuery,
  GQLFolderResourceMetaSearchInput,
  GQLFolderResourceMetaSearchQuery,
  GQLFoldersPageQuery,
  GQLMutationAddFolderArgs,
  GQLMutationAddFolderResourceArgs,
  GQLMutationDeleteFolderArgs,
  GQLMutationDeleteFolderResourceArgs,
  GQLMutationUpdateFolderArgs,
  GQLMutationUpdateFolderResourceArgs,
  GQLRecentlyUsedQuery,
  GQLUpdateFolderMutation,
  GQLUpdateFolderResourceMutation,
} from '../../graphqlTypes';
import { useGraphQuery } from '../../util/runQueries';

export const folderResourceFragment = gql`
  fragment FolderResourceFragment on FolderResource {
    __typename
    resourceId
    id
    resourceType
    path
    created
    tags
  }
`;

export const folderFragment = gql`
  fragment FolderFragment on Folder {
    __typename
    id
    name
    status
    parentId
    breadcrumbs {
      __typename
      id
      name
    }
    resources {
      ...FolderResourceFragment
    }
  }
  ${folderResourceFragment}
`;

const deleteFolderMutation = gql`
  mutation deleteFolder($id: String!) {
    deleteFolder(id: $id)
  }
`;

// GraphQL does not support recursion. As such, we just do
// an arbitrary number of nested queries that is above the
// maximum folder depth
export const foldersPageQueryFragment = gql`
  fragment FoldersPageQueryFragment on Folder {
    ...FolderFragment
    subfolders {
      ...FolderFragment
      subfolders {
        ...FolderFragment
        subfolders {
          ...FolderFragment
          subfolders {
            ...FolderFragment
            subfolders {
              ...FolderFragment
              subfolders {
                ...FolderFragment
                subfolders {
                  ...FolderFragment
                  subfolders {
                    ...FolderFragment
                    subfolders {
                      ...FolderFragment
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${folderFragment}
`;

export const foldersPageQuery = gql`
  query foldersPage {
    folders(includeSubfolders: true, includeResources: true) {
      ...FoldersPageQueryFragment
    }
  }
  ${foldersPageQueryFragment}
`;

const updateFolderResourceMutation = gql`
  mutation updateFolderResource($id: String!, $tags: [String!]!) {
    updateFolderResource(id: $id, tags: $tags) {
      ...FolderResourceFragment
    }
  }
  ${folderResourceFragment}
`;

const addFolderMutation = gql`
  mutation addFolder($name: String!, $parentId: String, $status: String) {
    addFolder(name: $name, parentId: $parentId, status: $status) {
      ...FoldersPageQueryFragment
    }
  }
  ${foldersPageQueryFragment}
`;

const updateFolderMutation = gql`
  mutation updateFolder($id: String!, $name: String, $status: String) {
    updateFolder(id: $id, name: $name, status: $status) {
      ...FoldersPageQueryFragment
    }
  }
  ${foldersPageQueryFragment}
`;

const folderResourceMetaFragment = gql`
  fragment FolderResourceMeta on FolderResourceMeta {
    __typename
    id
    title
    description
    type
    metaImage {
      url
      alt
    }
    resourceTypes {
      id
      name
    }
  }
`;

const folderResourceMetaQuery = gql`
  query folderResourceMeta($resource: FolderResourceMetaSearchInput!) {
    folderResourceMeta(resource: $resource) {
      ...FolderResourceMeta
    }
  }
  ${folderResourceMetaFragment}
`;

export const useFolderResourceMeta = (
  resource: GQLFolderResourceMetaSearchInput,
  options?: QueryHookOptions<GQLFolderResourceMetaQuery>,
) => {
  const { data: { folderResourceMeta } = {}, ...rest } = useGraphQuery<
    GQLFolderResourceMetaQuery
  >(folderResourceMetaQuery, {
    variables: { resource },
    ...options,
  });

  return { meta: folderResourceMeta, ...rest };
};

const folderResourceMetaSearchQuery = gql`
  query folderResourceMetaSearch(
    $resources: [FolderResourceMetaSearchInput!]!
  ) {
    folderResourceMetaSearch(resources: $resources) {
      ...FolderResourceMeta
    }
  }

  ${folderResourceMetaFragment}
`;

export const useFolderResourceMetaSearch = (
  resources: GQLFolderResourceMetaSearchInput[],
  options?: QueryHookOptions<GQLFolderResourceMetaSearchQuery>,
) => {
  const {
    data: { folderResourceMetaSearch: data } = {},
    ...rest
  } = useGraphQuery<GQLFolderResourceMetaSearchQuery>(
    folderResourceMetaSearchQuery,
    {
      variables: { resources },
      ...options,
    },
  );

  return { data, ...rest };
};

interface UseFolders {
  skip?: boolean;
}

export const useFolders = ({ skip }: UseFolders = {}): {
  folders: GQLFolder[];
  loading: boolean;
} => {
  const { cache } = useApolloClient();
  const { data, loading } = useGraphQuery<GQLFoldersPageQuery>(
    foldersPageQuery,
    {
      skip,
      onCompleted: () => {
        cache.gc();
      },
    },
  );

  const folders = (data?.folders ?? []) as GQLFolder[];
  return { folders, loading };
};

export const getFolder = (
  cache: ApolloCache<object>,
  folderId?: string,
): GQLFolder | null => {
  if (!folderId) return null;

  return cache.readFragment({
    fragmentName: 'FoldersPageQueryFragment',
    fragment: foldersPageQueryFragment,
    id: cache.identify({ __typename: 'Folder', id: folderId }),
  });
};

export const useFolder = (folderId?: string): GQLFolder | null => {
  const { cache } = useApolloClient();
  return getFolder(cache, folderId);
};

export const recentlyUsedQuery = gql`
  query recentlyUsed {
    allFolderResources(size: 5) {
      id
      resourceId
      path
      tags
      resourceType
      created
    }
  }
`;

export const useRecentlyUsedResources = () => {
  const { cache } = useApolloClient();
  const { data, ...rest } = useGraphQuery<GQLRecentlyUsedQuery>(
    recentlyUsedQuery,
    {
      onCompleted: () => {
        cache.gc();
      },
    },
  );

  return { allFolderResources: data?.allFolderResources, ...rest };
};

export const useAddFolderMutation = () => {
  const client = useApolloClient();
  const [addFolder, { loading }] = useMutation<
    GQLAddFolderMutation,
    GQLMutationAddFolderArgs
  >(addFolderMutation, {
    onCompleted: ({ addFolder: newFolder }) => {
      const parentId = newFolder.parentId;
      if (!parentId) {
        client.cache.modify({
          fields: {
            folders: (existingFolders = []) =>
              existingFolders.concat({
                __ref: client.cache.identify(newFolder),
              }),
          },
        });
      } else {
        client.cache.modify({
          id: client.cache.identify({
            __ref: `Folder:${newFolder.parentId}`,
          }),
          fields: {
            subfolders: (existingSubFolders = []) =>
              existingSubFolders.concat({
                __ref: client.cache.identify(newFolder),
              }),
          },
        });
      }
    },
  });

  return { addFolder, loading };
};

export const useDeleteFolderMutation = () => {
  const client = useApolloClient();
  const [deleteFolder, { loading }] = useMutation<
    GQLDeleteFolderMutation,
    GQLMutationDeleteFolderArgs
  >(deleteFolderMutation, {
    refetchQueries: () => {
      const beforeDeletion: GQLFoldersPageQuery | null = client.cache.readQuery(
        {
          query: foldersPageQuery,
        },
      );
      if (beforeDeletion?.folders?.length === 1) {
        return [{ query: recentlyUsedQuery }, { query: foldersPageQuery }];
      }
      return [{ query: recentlyUsedQuery }];
    },
    onCompleted: ({ deleteFolder: id }) => {
      const normalizedId = client.cache.identify({ id, __typename: 'Folder' });
      client.cache.evict({ id: normalizedId, broadcast: false });
      client.cache.gc();
    },
  });
  return { deleteFolder, loading };
};

export const useUpdateFolderResourceMutation = () => {
  const [updateFolderResource, { loading }] = useMutation<
    GQLUpdateFolderResourceMutation,
    GQLMutationUpdateFolderResourceArgs
  >(updateFolderResourceMutation);

  return { updateFolderResource, loading };
};

export const useUpdateFolderMutation = () => {
  const [updateFolder, { loading }] = useMutation<
    GQLUpdateFolderMutation,
    GQLMutationUpdateFolderArgs
  >(updateFolderMutation);

  return { updateFolder, loading };
};

const addResourceToFolderQuery = gql`
  mutation addResourceToFolder(
    $resourceId: Int!
    $folderId: String!
    $resourceType: String!
    $path: String!
    $tags: [String!]
  ) {
    addFolderResource(
      resourceId: $resourceId
      folderId: $folderId
      resourceType: $resourceType
      path: $path
      tags: $tags
    ) {
      ...FolderResourceFragment
    }
  }
  ${folderResourceFragment}
`;

export const useAddResourceToFolderMutation = (folderId: string) => {
  const { cache } = useApolloClient();
  const [addResourceToFolder, { loading }] = useMutation<
    GQLAddResourceToFolderMutation,
    GQLMutationAddFolderResourceArgs
  >(addResourceToFolderQuery, {
    refetchQueries: [{ query: recentlyUsedQuery }],
    onCompleted: data => {
      cache.modify({
        id: cache.identify({
          __ref: `Folder:${folderId}`,
        }),
        fields: {
          resources(existingResources = []) {
            return existingResources.concat({
              __ref: cache.identify(data.addFolderResource),
            });
          },
        },
      });
    },
  });

  return { addResourceToFolder, loading };
};

const deleteFolderResourceMutation = gql`
  mutation deleteFolderResource($folderId: String!, $resourceId: String!) {
    deleteFolderResource(folderId: $folderId, resourceId: $resourceId)
  }
`;

export const useDeleteFolderResourceMutation = (folderId: string) => {
  const { cache } = useApolloClient();
  const [deleteFolderResource] = useMutation<
    GQLDeleteFolderResourceMutation,
    GQLMutationDeleteFolderResourceArgs
  >(deleteFolderResourceMutation, {
    refetchQueries: [{ query: recentlyUsedQuery }],
    onCompleted: ({ deleteFolderResource: id }) => {
      cache.modify({
        id: cache.identify({ __typename: 'Folder', id: folderId }),
        fields: {
          resources(existing = []) {
            return existing.filter(
              (res: Reference) => res.__ref !== `FolderResource:${id}`,
            );
          },
        },
      });
      cache.gc();
    },
  });
  return { deleteFolderResource };
};

const deletePersonalDataMutation = gql`
  mutation deletePersonalData {
    deletePersonalData
  }
`;

export const useDeletePersonalData = () => {
  const client = useApolloClient();
  const [deletePersonalData] = useMutation<boolean>(
    deletePersonalDataMutation,
    {
      onCompleted: () => client.resetStore(),
    },
  );

  return { deletePersonalData };
};
