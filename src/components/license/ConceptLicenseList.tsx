/*
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { gql } from '@apollo/client';
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
import { Concept } from '@ndla/icons/editor';
import { useTranslation } from 'react-i18next';
import CopyTextButton from './CopyTextButton';
import { GQLConceptLicenseList_ConceptLicenseFragment } from '../../graphqlTypes';
import { licenseCopyrightToCopyrightType } from './licenseHelpers';

interface ConceptLicenseInfoProps {
  concept: GQLConceptLicenseList_ConceptLicenseFragment;
}

const ConceptLicenseInfo = ({ concept }: ConceptLicenseInfoProps) => {
  const { t, i18n } = useTranslation();
  if (
    concept.copyright?.license?.license === undefined ||
    concept.copyright.license.license === 'unknown'
  )
    return null;

  const src = `${concept.src}/${i18n.language}`;
  const safeCopyright = licenseCopyrightToCopyrightType(concept.copyright);
  const items = getGroupedContributorDescriptionList(
    safeCopyright,
    i18n.language,
  );
  if (concept.title) {
    items.unshift({
      label: t('license.concept.title'),
      description: concept.title,
      metaType: metaTypes.title,
    });
  }
  return (
    <MediaListItem>
      <MediaListItemImage>
        <a href={src} target="_blank" rel="noopener noreferrer">
          <Concept className="c-medialist__icon" />
        </a>
      </MediaListItemImage>
      <MediaListItemBody
        license={concept.copyright.license.license}
        title={t('license.concept.rules')}
        resourceUrl={concept.src}
        locale={i18n.language}>
        <MediaListItemActions>
          <div className="c-medialist__ref">
            <MediaListItemMeta items={items} />
            <CopyTextButton
              stringToCopy={`<iframe title="${concept.title}" aria-label="${concept.title}" height="400" width="500" frameborder="0" src="${src}" allowfullscreen=""></iframe>`}
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
  concepts: GQLConceptLicenseList_ConceptLicenseFragment[];
}

const ConceptLicenseList = ({ concepts }: Props) => {
  const { t } = useTranslation();
  return (
    <div>
      <h2>{t('license.concept.heading')}</h2>
      <p>{t('license.concept.description')}</p>
      <MediaList>
        {concepts.map((concept, index) => (
          <ConceptLicenseInfo concept={concept} key={index} />
        ))}
      </MediaList>
    </div>
  );
};

ConceptLicenseList.fragments = {
  concept: gql`
    fragment ConceptLicenseList_ConceptLicense on ConceptLicense {
      title
      src
      copyright {
        license {
          license
        }
        creators {
          name
          type
        }
        processors {
          name
          type
        }
        rightsholders {
          name
          type
        }
      }
    }
  `,
};

export default ConceptLicenseList;
