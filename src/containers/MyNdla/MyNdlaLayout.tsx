/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useMemo } from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { breakpoints, mq, spacing } from '@ndla/core';
import { FolderType, TreeStructure } from '@ndla/ui';
import { Outlet, useLocation } from 'react-router-dom';
import { useFolder, useFolders } from './folderMutations';
import { createStaticStructureElements } from '../../util/folderHelpers';

const StyledLayout = styled.div`
  display: flex;
`;

const StyledContent = styled.div`
  max-width: 960px;
  flex: 1;
`;

const StyledSideBar = styled.div`
  margin: 0 ${spacing.large};
  min-width: 300px;
  width: 300px;
  ${mq.range({ until: breakpoints.tablet })} {
    display: none;
  }
`;

const MyNdlaLayout = () => {
  const { folders } = useFolders();
  const { t } = useTranslation();
  const location = useLocation();
  const [page, folderId] = location.pathname
    .replace('/minndla/', '')
    .split('/');
  const selectedFolder = useFolder(folderId);

  const defaultSelected = useMemo(() => {
    if (typeof page === 'string') {
      if (folderId) {
        return [page].concat(
          selectedFolder ? selectedFolder.breadcrumbs.map(b => b.id) : [],
        );
      }
      return [page];
    }
    return [];
  }, [selectedFolder, folderId, page]);

  const staticStructureElements: FolderType[] = useMemo(
    () => createStaticStructureElements(folders, t),
    [folders, t],
  );

  return (
    <StyledLayout>
      <StyledSideBar>
        <TreeStructure
          folders={staticStructureElements}
          defaultOpenFolders={defaultSelected}
          openOnFolderClick
        />
      </StyledSideBar>
      <StyledContent>
        <Outlet />
      </StyledContent>
    </StyledLayout>
  );
};

export default MyNdlaLayout;
