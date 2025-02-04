/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useMemo, useContext } from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { breakpoints, mq, spacing } from '@ndla/core';
import { FolderType, MessageBox, TreeStructure } from '@ndla/ui';
import { SafeLinkButton } from '@ndla/safelink';
import { Outlet, useLocation } from 'react-router-dom';
import { useFolder, useFolders } from './folderMutations';
import { createStaticStructureElements } from '../../util/folderHelpers';
import IsMobileContext from '../../IsMobileContext';
import { toHref } from '../../util/urlHelper';
import { AuthContext } from '../../components/AuthenticationContext';

const StyledLayout = styled.div`
  display: grid;
  min-height: 60vh;
  margin-top: ${spacing.medium};
  grid-template-columns: minmax(300px, 1fr) minmax(auto, 1024px) minmax(
      0px,
      1fr
    );

  ${mq.range({ until: breakpoints.tablet })} {
    display: flex;
  }
`;

interface StyledContentProps {
  isMobile: boolean;
}

const StyledContent = styled.div<StyledContentProps>`
  max-width: 1024px;
  flex: 1;
  margin: 0 ${({ isMobile }) => (isMobile ? spacing.nsmall : spacing.large)};
`;

const StyledSideBar = styled.div`
  margin-left: auto;
  display: flex;
  gap: ${spacing.normal};
  flex-direction: column;
  min-width: 300px;
  width: 300px;
  ${mq.range({ until: breakpoints.tablet })} {
    display: none;
  }
`;

const ButtonWrapper = styled.div`
  padding: 0 ${spacing.normal};
`;

const MessageboxWrapper = styled.div`
  margin-bottom: ${spacing.nsmall};
`;

const MyNdlaLayout = () => {
  const { folders } = useFolders();
  const { t } = useTranslation();
  const { examLock } = useContext(AuthContext);
  const location = useLocation();
  const [page, folderId] = location.pathname
    .replace('/minndla/', '')
    .split('/');
  const selectedFolder = useFolder(folderId);

  const isMobile = useContext(IsMobileContext);

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
    () =>
      createStaticStructureElements(
        location.pathname.startsWith('/minndla/folders') ? folders : [],
        t,
      ),
    [folders, t, location],
  );

  return (
    <StyledLayout>
      <StyledSideBar>
        <div>
          <TreeStructure
            type={'navigation'}
            folders={staticStructureElements}
            defaultOpenFolders={defaultSelected}
          />
          <ButtonWrapper>
            <SafeLinkButton
              width="auto"
              outline
              reloadDocument
              to={`/logout?state=${toHref(location)}`}>
              {t('user.buttonLogOut')}
            </SafeLinkButton>
          </ButtonWrapper>
        </div>
      </StyledSideBar>
      <StyledContent isMobile={isMobile}>
        {examLock && (
          <MessageboxWrapper>
            <MessageBox>{t('myNdla.examLockInfo')}</MessageBox>
          </MessageboxWrapper>
        )}
        <Outlet />
      </StyledContent>
    </StyledLayout>
  );
};

export default MyNdlaLayout;
