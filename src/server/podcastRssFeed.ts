/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import config from '../config';
import { fetchSeries } from '../util/audioApi';

const podcastRssFeed = async (seriesId: number): Promise<string> => {
  try {
    const series = await fetchSeries(seriesId, 'nb');
    const podcastUrl = `${config?.ndlaFrontendDomain}/podkast/${series.id}`;
    const ownerEmail = 'hjelp+podcast@ndla.no';

    const description = `
    <description>
      <![CDATA[
      ${series.description.description}
      ]]>
    </description>
    `;

    const episodes = series.episodes.map(episode => {
      const episodeLink = `${podcastUrl}#episode-${episode.id}`;
      const GUIDEnvPart =
        config.ndlaEnvironment === 'prod' ? '' : `${config.ndlaEnvironment}-`;
      const episodeGUID = `NDLA-${GUIDEnvPart}${episode.id}`;
      const episodePubDate = new Date(episode.created).toUTCString();
      const description = !episode.podcastMeta?.introduction
        ? ''
        : `
      <description>
      <![CDATA[
      ${episode.podcastMeta?.introduction}
      ]]>
      </description>
      <guid>${episodeGUID}</guid>
      <link>${episodeLink}</link>
      `;

      const coverPhoto = !episode.podcastMeta?.coverPhoto.url
        ? ''
        : `<itunes:image href="${episode.podcastMeta.coverPhoto.url}" />`;
      return `
      <item>
        <title>${episode.title.title}</title>
        <enclosure
          url="${episode.audioFile.url}"
          length="${episode.audioFile.fileSize}"
          type="${episode.audioFile.mimeType}"
        />
        <pubDate>${episodePubDate}</pubDate>
        ${description}
        ${coverPhoto}
      </item>
      `;
    });

    // TODO: These are hardcoded right now.
    //       At some point we will probably want to store them in the audio-api
    const category = `<itunes:category text="Education"><itunes:category text="Courses" /></itunes:category>`;
    const explicitness = `false`;

    return `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
        <title>${series.title.title}</title>
        ${description}
        <link>${podcastUrl}</link>
        <language>${series.title.language}</language>
        ${category}
        <itunes:explicit>${explicitness}</itunes:explicit>
        <itunes:author>NDLA</itunes:author>
        <itunes:owner>
          <itunes:name>NDLA</itunes:name>
          <itunes:email>${ownerEmail}</itunes:email>
        </itunes:owner>
        <itunes:image href="${series.coverPhoto.url}" />
        ${episodes.join('')}
      </channel>
    </rss>
      `;
  } catch (err) {
    return Promise.reject(err);
  }
};

export default podcastRssFeed;
