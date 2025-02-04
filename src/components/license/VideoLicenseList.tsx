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
import { useTranslation } from 'react-i18next';
import CopyTextButton from './CopyTextButton';
import AnchorButton from './AnchorButton';
import { GQLVideoLicenseList_BrightcoveLicenseFragment } from '../../graphqlTypes';
import { licenseCopyrightToCopyrightType } from './licenseHelpers';
import { licenseListCopyrightFragment } from './licenseFragments';

interface VideoLicenseInfoProps {
  video: GQLVideoLicenseList_BrightcoveLicenseFragment;
}

const VideoLicenseInfo = ({ video }: VideoLicenseInfoProps) => {
  const { t, i18n } = useTranslation();
  const safeCopyright = licenseCopyrightToCopyrightType(video.copyright);
  const items = getGroupedContributorDescriptionList(
    safeCopyright,
    i18n.language,
  );
  if (video.title) {
    items.unshift({
      label: t('license.images.title'),
      description: video.title,
      metaType: metaTypes.title,
    });
  }
  return (
    <MediaListItem>
      <MediaListItemImage>
        <img alt="presentation" src={video.cover} />
      </MediaListItemImage>
      <MediaListItemBody
        title={t('license.video.rules')}
        license={video.copyright.license?.license}
        resourceType="video"
        resourceUrl={video.src}
        locale={i18n.language}>
        <MediaListItemActions>
          <div className="c-medialist__ref">
            <MediaListItemMeta items={items} />
            {video.copyright.license?.license !== 'COPYRIGHTED' && (
              <AnchorButton href={video.download} download appearance="outline">
                {t('license.download')}
              </AnchorButton>
            )}
            <CopyTextButton
              stringToCopy={`<iframe title="${video.title}" height="${video.iframe?.height}" aria-label="${video.title}" width="${video.iframe?.width}" frameborder="0" src="${video.iframe?.src}" allowfullscreen=""></iframe>`}
              copyTitle={t('license.embed')}
              hasCopiedTitle={t('license.embedCopied')}
            />
          </div>
        </MediaListItemActions>
      </MediaListItemBody>
    </MediaListItem>
  );
};

interface Props {
  videos: GQLVideoLicenseList_BrightcoveLicenseFragment[];
}

const VideoLicenseList = ({ videos }: Props) => {
  const { t } = useTranslation();
  return (
    <div>
      <h2>{t('license.video.heading')}</h2>
      <p>{t('license.video.description')}</p>
      <MediaList>
        {videos.map(video => (
          <VideoLicenseInfo video={video} key={uuid()} />
        ))}
      </MediaList>
    </div>
  );
};

VideoLicenseList.fragments = {
  video: gql`
    fragment VideoLicenseList_BrightcoveLicense on BrightcoveLicense {
      title
      download
      src
      cover
      iframe {
        width
        height
        src
      }
      copyright {
        ...LicenseListCopyright
      }
    }
    ${licenseListCopyrightFragment}
  `,
};

export default VideoLicenseList;
