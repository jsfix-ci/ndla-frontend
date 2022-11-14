/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import format from 'date-fns/format';
import { LocaleType } from '../interfaces';

export default function formatDate(date: string, locale: LocaleType) {
  if (locale === 'nb' || locale === 'nn') {
    return (
      /* TODO: JSFIX could not patch the breaking change:
      now functions don't accept string arguments, but only numbers or dates.  
      Suggested fix: The input string should now be parsed beforehand. Use parse or parseISO (if you’re using ISO 8601) to parse your strings. */
      format(date, 'DD.MM.YYYY')
    );
  }
  return (
    /* TODO: JSFIX could not patch the breaking change:
    now functions don't accept string arguments, but only numbers or dates.  
    Suggested fix: The input string should now be parsed beforehand. Use parse or parseISO (if you’re using ISO 8601) to parse your strings. */
    format(date, 'MM/DD/YYYY')
  );
}
