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
import { Podcast } from '@ndla/icons/common';
import {
  getGroupedContributorDescriptionList,
  metaTypes,
} from '@ndla/licenses';
import { useTranslation } from 'react-i18next';
import CopyTextButton from './CopyTextButton';
import AnchorButton from './AnchorButton';
import { GQLPodcastLicenseList_PodcastLicenseFragment } from '../../graphqlTypes';
import { licenseCopyrightToCopyrightType } from './licenseHelpers';
import { licenseListCopyrightFragment } from './licenseFragments';

interface PodcastLicenseInfoProps {
  podcast: GQLPodcastLicenseList_PodcastLicenseFragment;
}

const PodcastLicenseInfo = ({ podcast }: PodcastLicenseInfoProps) => {
  const { t, i18n } = useTranslation();
  const safeCopyright = licenseCopyrightToCopyrightType(podcast.copyright);
  const items = getGroupedContributorDescriptionList(
    safeCopyright,
    i18n.language,
  );

  if (podcast.title) {
    items.unshift({
      label: t('title'),
      description: podcast.title,
      metaType: metaTypes.title,
    });
  }
  if (podcast.copyright.origin) {
    items.push({
      label: t('source'),
      description: podcast.copyright.origin,
      metaType: metaTypes.other,
    });
  }

  return (
    <MediaListItem>
      <MediaListItemImage>
        <Podcast className="c-medialist__icon" />
      </MediaListItemImage>

      <MediaListItemBody
        title={t('license.podcast.rules')}
        license={podcast.copyright.license?.license}
        resourceType="podcast"
        resourceUrl={podcast.src}
        locale={i18n.language}>
        <MediaListItemActions>
          <div className="c-medialist__ref">
            <MediaListItemMeta items={items} />
            {podcast.copyright.license?.license !== 'COPYRIGHTED' && (
              <>
                {podcast.copyText && (
                  <CopyTextButton
                    stringToCopy={podcast.copyText}
                    copyTitle={t('license.copyTitle')}
                    hasCopiedTitle={t('license.hasCopiedTitle')}
                  />
                )}
                <AnchorButton href={podcast.src} download appearance="outline">
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
  podcasts: GQLPodcastLicenseList_PodcastLicenseFragment[];
}

const PodcastLicenseList = ({ podcasts }: Props) => {
  const { t } = useTranslation();
  return (
    <div>
      <h2>{t('license.podcast.heading')}</h2>
      <p>{t('license.podcast.description')}</p>
      <MediaList>
        {podcasts.map(podcast => (
          <PodcastLicenseInfo podcast={podcast} key={uuid()} />
        ))}
      </MediaList>
    </div>
  );
};

PodcastLicenseList.fragments = {
  podcast: gql`
    fragment PodcastLicenseList_PodcastLicense on PodcastLicense {
      src
      copyText
      title
      description
      copyright {
        origin
        ...LicenseListCopyright
      }
    }
    ${licenseListCopyrightFragment}
  `,
};

export default PodcastLicenseList;
