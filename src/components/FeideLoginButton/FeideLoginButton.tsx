/*
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ReactNode, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { AuthModal } from '@ndla/ui';
import { appearances, ButtonV2 as Button } from '@ndla/button';
import { colors, fonts, spacing } from '@ndla/core';
import Modal, { ModalBody, ModalCloseButton, ModalHeader } from '@ndla/modal';
import SafeLink from '@ndla/safelink';
import { AuthContext } from '../AuthenticationContext';
import LoginComponent from '../MyNdla/LoginComponent';
import IsMobileContext from '../../IsMobileContext';
import { useIsNdlaFilm } from '../../routeHelpers';
import { constructNewPath, toHref } from '../../util/urlHelper';
import { useBaseName } from '../BaseNameContext';

const FeideFooterButton = styled(Button)`
  padding: ${spacing.xsmall} ${spacing.small};
  background: none;
  color: ${colors.white};
  border: 2px solid ${colors.brand.grey};
`;

interface StyledLinkProps {
  ndlaFilm?: boolean;
}

const shouldForwardProp = (p: string) => p !== 'ndlaFilm';

const StyledLink = styled(SafeLink, { shouldForwardProp })<StyledLinkProps>`
  ${appearances.ghostPill};
  display: flex;
  align-items: center;
  color: ${p => (p.ndlaFilm ? colors.white : colors.brand.primary)};
  gap: ${spacing.small};
  box-shadow: none;
  font-size: 16px;
  margin-right: ${spacing.normal};
  font-weight: ${fonts.weight.semibold};
  svg {
    width: 20px;
    height: 20px;
  }
`;

const MyNdlaButton = styled(Button)`
  font-weight: ${fonts.weight.semibold};
  display: flex;
  align-items: center;
  gap: ${spacing.xxsmall};
  svg {
    height: 22px;
    width: 22px;
    margin-left: ${spacing.xxsmall};
  }
`;

interface Props {
  footer?: boolean;
  children?: ReactNode;
  masthead?: boolean;
}

const FeideLoginButton = ({ footer, children, masthead }: Props) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { authenticated, user } = useContext(AuthContext);
  const basename = useBaseName();
  const ndlaFilm = useIsNdlaFilm();
  const isMobile = useContext(IsMobileContext);
  const destination = isMobile ? '/minndla/meny' : '/minndla';
  const activateButton = footer ? (
    <FeideFooterButton>{children}</FeideFooterButton>
  ) : (
    <MyNdlaButton
      variant="ghost"
      shape="pill"
      colorTheme="lighter"
      size="medium"
      inverted={ndlaFilm}>
      {children}
    </MyNdlaButton>
  );

  if (authenticated && !footer) {
    return (
      <StyledLink
        ndlaFilm={ndlaFilm}
        to={destination}
        aria-label={t('myNdla.myNDLA')}>
        {children}
      </StyledLink>
    );
  }

  if (!authenticated) {
    return (
      <>
        <Modal
          backgroundColor="white"
          activateButton={activateButton}
          label={t('user.modal.isNotAuth')}>
          {onClose => (
            <>
              <ModalHeader>
                <ModalCloseButton
                  title={t('modal.closeModal')}
                  onClick={onClose}
                />
              </ModalHeader>
              <ModalBody>
                <LoginComponent onClose={onClose} masthead={masthead} />
              </ModalBody>
            </>
          )}
        </Modal>
      </>
    );
  }

  return (
    <AuthModal
      activateButton={activateButton}
      isAuthenticated={authenticated}
      showGeneralMessage={false}
      user={user}
      onAuthenticateClick={() => {
        const route = authenticated ? 'logout' : 'login';
        window.location.href = constructNewPath(
          `/${route}?state=${toHref(location)}`,
          basename,
        );
      }}
    />
  );
};

export default FeideLoginButton;
