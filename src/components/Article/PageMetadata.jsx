import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import config from '../../config';
import { LocationShape, ImageShape } from '../../shapes';


const MetadataPage = ({ title, metaData, description, locale, location }) => {
  const image =
    metaData && metaData.images && metaData.images.length > 0
      ? metaData.images[0]
      : undefined;
  const basename = locale === 'nb' ? '' : `/${locale}`;
  const url = `${config.ndlaFrontendDomain}${basename}${location.pathname}`;
  return (
    <Helmet>
      <meta name="twitter:card" content="summary" />
      <meta property="og:url" content={url} />
      {title && <meta property="og:title" content={title} />}
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta property="og:image" content={image.src} />}
      {image && <meta property="twitter:image" content={image.src} />}
    </Helmet>
  );
};

MetadataPage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  locale: PropTypes.string,
  image: PropTypes.string,
  location: LocationShape,
  metaData: PropTypes.shape({
    images: PropTypes.arrayOf(ImageShape),
  }),
};

export default withRouter(MetadataPage);
