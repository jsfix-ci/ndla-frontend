/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import config from '../config';
import { LocationShape, ImageShape } from '../shapes';

const SocialMediaMetadata = ({
  title,
  image,
  description,
  locale,
  location,
  children,
}) => {
  return (
    <Helmet>
      {children}
      <meta property="og:type" content="article" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@ndla_no" />
      <meta name="twitter:creator" content="@ndla_no" />
      <meta
        property="og:url"
        content={`${config.ndlaFrontendDomain}/${locale}${location.pathname}`}
      />
      {title && <meta property="og:title" content={`${title} - NDLA`} />}
      {title && <meta name="twitter:title" content={`${title} - NDLA`} />}
      {description && <meta property="og:description" content={description} />}
      {description && <meta name="twitter:description" content={description} />}
      {image && image.src && <meta property="og:image" content={image.src} />}
      {image && image.src && (
        <meta name="twitter:image:src" content={image.src} />
      )}
      {!image || !image.src ? (
        <meta
          name="twitter:image:src"
          content={'/static/metalogo.png'}
        />
      ) : (
        ''
      )}
      {!image || !image.src ? (
        <meta
          property="og:image"
          content={'/static/metalogo.png'}
        />
      ) : (
        ''
      )}
      <meta property="og:site_name" content="ndla.no" />
      <meta
        property="article:publisher"
        content="https://www.facebook.com/ndla.no"
      />
      <meta
        property="article:author"
        content="https://www.facebook.com/ndla.no"
      />
    </Helmet>
  );
};

SocialMediaMetadata.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  locale: PropTypes.string,
  location: LocationShape,
  image: ImageShape,
};

export default withRouter(SocialMediaMetadata);
