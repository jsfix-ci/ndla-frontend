/*
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { gql } from '@apollo/client';
import { uuid } from '@ndla/util';
import {
  Image,
  MediaList,
  MediaListItem,
  MediaListItemImage,
  MediaListItemBody,
  MediaListItemActions,
  MediaListItemMeta,
} from '@ndla/ui';
import {
  metaTypes,
  getGroupedContributorDescriptionList,
} from '@ndla/licenses';
import queryString from 'query-string';
import { useTranslation } from 'react-i18next';
import CopyTextButton from './CopyTextButton';
import AnchorButton from './AnchorButton';
import { GQLImageLicenseList_ImageLicenseFragment } from '../../graphqlTypes';
import { licenseCopyrightToCopyrightType } from './licenseHelpers';
import { licenseListCopyrightFragment } from './licenseFragments';

export const downloadUrl = (imageSrc: string) => {
  const urlObject = queryString.parseUrl(imageSrc);
  return `${urlObject.url}?${queryString.stringify({
    ...urlObject.query,
    download: true,
  })}`;
};

interface ImageLicenseInfoProps {
  image: GQLImageLicenseList_ImageLicenseFragment;
}

const ImageLicenseInfo = ({ image }: ImageLicenseInfoProps) => {
  const { t, i18n } = useTranslation();
  const safeCopyright = licenseCopyrightToCopyrightType(image.copyright);
  const items = getGroupedContributorDescriptionList(
    safeCopyright,
    i18n.language,
  );

  if (image.title) {
    items.unshift({
      label: t('license.images.title'),
      description: image.title,
      metaType: metaTypes.title,
    });
  }

  if (image.copyright.origin) {
    items.push({
      label: t('license.images.source'),
      description: image.copyright.origin,
      metaType: metaTypes.other,
    });
  }

  return (
    <MediaListItem>
      <MediaListItemImage>
        <Image alt={image.altText} src={image.src} />
      </MediaListItemImage>
      <MediaListItemBody
        title={t('license.images.rules')}
        license={image.copyright.license?.license}
        resourceType="image"
        resourceUrl={image.src}
        locale={i18n.language}>
        <MediaListItemActions>
          <div className="c-medialist__ref">
            <MediaListItemMeta items={items} />
            {image.copyright.license?.license !== 'COPYRIGHTED' && (
              <>
                {image.copyText && (
                  <CopyTextButton
                    stringToCopy={image.copyText}
                    copyTitle={t('license.copyTitle')}
                    hasCopiedTitle={t('license.hasCopiedTitle')}
                  />
                )}
                <AnchorButton
                  href={downloadUrl(image.src)}
                  appearance="outline"
                  download>
                  {t('license.download')}
                </AnchorButton>
              </>
            )}
          </div>
        </MediaListItemActions>
      </MediaListItemBody>
    </MediaListItem>
  );
};

interface Props {
  images: GQLImageLicenseList_ImageLicenseFragment[];
}

const ImageLicenseList = ({ images }: Props) => {
  const { t } = useTranslation();
  return (
    <div>
      <h2>{t('license.images.heading')}</h2>
      <p>{t('license.images.description')}</p>
      <MediaList>
        {images.map(image => (
          <ImageLicenseInfo image={image} key={uuid()} />
        ))}
      </MediaList>
    </div>
  );
};

ImageLicenseList.fragments = {
  image: gql`
    fragment ImageLicenseList_ImageLicense on ImageLicense {
      title
      altText
      src
      copyText
      copyright {
        origin
        ...LicenseListCopyright
      }
    }
    ${licenseListCopyrightFragment}
  `,
};

export default ImageLicenseList;
