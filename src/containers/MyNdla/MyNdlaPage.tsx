/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { keyBy } from 'lodash';
import styled from '@emotion/styled';
import { breakpoints, mq, spacing } from '@ndla/core';
import { HeartOutline } from '@ndla/icons/action';
import { FolderOutlined } from '@ndla/icons/contentType';
import { Feide, HashTag } from '@ndla/icons/common';
import { ListResource, UserInfo, Image } from '@ndla/ui';
import Button, { DeleteButton } from '@ndla/button';
import SafeLink, { SafeLinkButton } from '@ndla/safelink';
import { HelmetWithTracker } from '@ndla/tracker';
import Modal, { ModalBody, ModalCloseButton, ModalHeader } from '@ndla/modal';
import InfoPart, { InfoPartIcon, InfoPartText } from './InfoSection';
import { AuthContext } from '../../components/AuthenticationContext';
import {
  useDeletePersonalData,
  useFolderResourceMetaSearch,
  useRecentlyUsedResources,
} from './folderMutations';
import MyNdlaBreadcrumb from './components/MyNdlaBreadcrumb';
import MyNdlaTitle from './components/MyNdlaTitle';
import TitleWrapper from './components/TitleWrapper';

const HeartOutlineIcon = InfoPartIcon.withComponent(HeartOutline);
const FolderOutlinedIcon = InfoPartIcon.withComponent(FolderOutlined);
const HashTagIcon = InfoPartIcon.withComponent(HashTag);
const FeideIcon = InfoPartIcon.withComponent(Feide);

const StyledPageContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledIntroContainer = styled.div`
  display: flex;
  ${mq.range({ from: breakpoints.tablet })} {
    gap: ${spacing.large};
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: ${spacing.small};
  justify-content: flex-end;
`;

const RoundedImage = styled(Image)`
  border-radius: 50%;
  height: 160px;
  min-width: 160px;
  object-fit: cover;
  ${mq.range({ until: breakpoints.tablet })} {
    display: none;
  }
`;

const StyledResourceList = styled.ul`
  display: flex;
  margin: 0;
  flex-direction: column;
  gap: ${spacing.xsmall};
`;

const ListItem = styled.li`
  list-style: none;
  margin: 0;
`;

const LinkText = styled.p`
  margin: 0;
`;

const InfoContainer = styled.div`
  display: flex;
  padding: ${spacing.medium} 0;
  flex-direction: column;
  gap: ${spacing.small};
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: column;
  gap: ${spacing.xsmall};
  padding-bottom: ${spacing.normal};
`;

const MyNdlaPage = () => {
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();
  const location = useLocation();
  const { deletePersonalData } = useDeletePersonalData();
  const navigate = useNavigate();
  const { allFolderResources } = useRecentlyUsedResources();
  const { data: metaData, loading } = useFolderResourceMetaSearch(
    allFolderResources?.map(r => ({
      id: r.resourceId,
      path: r.path,
      resourceType: r.resourceType,
    })) ?? [],
    {
      skip: !allFolderResources || !allFolderResources.length,
    },
  );

  const onDeleteAccount = async () => {
    await deletePersonalData();
    navigate('/logout', { state: { from: location.pathname } });
  };

  const keyedData = keyBy(metaData ?? [], r => `${r.type}${r.id}`);

  return (
    <StyledPageContentContainer>
      <HelmetWithTracker title={t('htmlTitles.myNdlaPage')} />
      <TitleWrapper>
        <MyNdlaBreadcrumb page="minndla" breadcrumbs={[]} backCrumb="minndla" />
        <MyNdlaTitle title={t('myNdla.myPage.myPage')} />
      </TitleWrapper>
      <StyledIntroContainer>
        <h2>{t('myNdla.myPage.welcome')}</h2>
        <RoundedImage src="/static/my-ndla-login.png" alt="alt" />
      </StyledIntroContainer>
      <h2>{t('myNdla.myPage.newFavourite')}</h2>
      {allFolderResources && allFolderResources.length > 0 && (
        <StyledResourceList>
          {allFolderResources.map(res => {
            const meta = keyedData[`${res.resourceType}${res.resourceId}`];
            return (
              <ListItem key={res.id}>
                <ListResource
                  id={res.id}
                  tagLinkPrefix="/minndla/tags"
                  isLoading={loading}
                  key={res.id}
                  link={res.path}
                  title={meta?.title ?? ''}
                  resourceImage={{
                    src: meta?.metaImage?.url ?? '',
                    alt: '',
                  }}
                  tags={res.tags}
                  topics={meta?.resourceTypes.map(rt => rt.name) ?? []}
                />
              </ListItem>
            );
          })}
        </StyledResourceList>
      )}
      <InfoPart
        icon={<HeartOutlineIcon />}
        title={t('myNdla.myPage.storageInfo.title')}
        children={
          <InfoPartText>{t('myNdla.myPage.storageInfo.text')}</InfoPartText>
        }
      />
      <InfoPart
        icon={<FolderOutlinedIcon />}
        title={t('myNdla.myPage.folderInfo.title')}
        children={
          <InfoPartText>{t('myNdla.myPage.folderInfo.text')}</InfoPartText>
        }
      />
      <InfoPart
        icon={<HashTagIcon />}
        title={t('myNdla.myPage.tagInfo.title')}
        children={
          <InfoPartText>{t('myNdla.myPage.tagInfo.text')}</InfoPartText>
        }
      />
      {user && (
        <InfoPart
          icon={<FeideIcon />}
          title={t('myNdla.myPage.feide')}
          children={
            <>
              <UserInfo user={user} />
              <p>
                {t('user.wrongUserInfoDisclaimer')}
                <SafeLink to="https://feide.no/brukerstotte">
                  feide.no/brukerstotte
                </SafeLink>
              </p>
            </>
          }
        />
      )}
      <InfoContainer>
        <LinkText>
          {`${t('myNdla.myPage.read.our')} `}
          <SafeLink target="_blank" to={t('myNdla.myPage.privacyLink')}>
            {t('myNdla.myPage.privacy')}
          </SafeLink>
        </LinkText>
        <LinkText>
          {`${t('myNdla.myPage.questions.question')} `}
          <Button
            link
            onClick={() => document.getElementById('zendesk')?.click()}>
            {t('myNdla.myPage.questions.ask')}
          </Button>
        </LinkText>
      </InfoContainer>
      <ButtonContainer>
        <SafeLinkButton
          outline
          to={'/logout'}
          state={{ from: location.pathname }}>
          {t('myNdla.myPage.logout')}
        </SafeLinkButton>
      </ButtonContainer>
      <ButtonContainer>
        {t('myNdla.myPage.wishToDelete')}
        <Modal
          backgroundColor="white"
          activateButton={
            <DeleteButton>{t('myNdla.myPage.deleteAccount')}</DeleteButton>
          }
          label={t('myNdla.myPage.deleteAccount')}>
          {onClose => (
            <>
              <ModalHeader>
                <h1>{t('myNdla.myPage.deleteAccount')}</h1>
                <ModalCloseButton
                  title={t('modal.closeModal')}
                  onClick={onClose}
                />
              </ModalHeader>
              <ModalBody>
                <p>{t('myNdla.myPage.confirmDeleteAccount')}</p>
                <ButtonRow>
                  <Button outline onClick={onClose}>
                    {t('cancel')}
                  </Button>
                  <DeleteButton onClick={onDeleteAccount}>
                    {t('myNdla.myPage.confirmDeleteAccountButton')}
                  </DeleteButton>
                </ButtonRow>
              </ModalBody>
            </>
          )}
        </Modal>
      </ButtonContainer>
    </StyledPageContentContainer>
  );
};

export default MyNdlaPage;
