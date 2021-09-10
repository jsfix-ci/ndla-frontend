import { spacingUnit } from '@ndla/core';

export const findName = (themeNames, language) => {
  const themeName = themeNames.find(name => name.language === language);
  if (themeName) {
    return themeName.name;
  }
  const fallback = themeNames.find(name => name.language === 'nb');
  if (fallback) {
    return fallback.name;
  }
  return '';
};

export const breakpoints = [
  {
    until: 'mobile',
    columnsPrSlide: 1,
    distanceBetweenItems: spacingUnit / 2,
    margin: spacingUnit,
    arrowOffset: 13,
  },
  {
    until: 'mobileWide',
    columnsPrSlide: 2,
    distanceBetweenItems: spacingUnit / 2,
    margin: spacingUnit,
    arrowOffset: 13,
  },
  {
    until: 'tabletWide',
    columnsPrSlide: 3,
    distanceBetweenItems: spacingUnit / 2,
    margin: spacingUnit,
    arrowOffset: 13,
  },
  {
    until: 'desktop',
    columnsPrSlide: 4,
    distanceBetweenItems: spacingUnit,
    margin: spacingUnit * 2,
    arrowOffset: 0,
  },
  {
    until: 'wide',
    columnsPrSlide: 4,
    distanceBetweenItems: spacingUnit,
    margin: spacingUnit * 2,
    arrowOffset: 0,
  },
  {
    until: 'ultraWide',
    columnsPrSlide: 4,
    distanceBetweenItems: spacingUnit,
    margin: spacingUnit * 3.5,
    arrowOffset: 0,
  },
  {
    columnsPrSlide: 6,
    distanceBetweenItems: spacingUnit,
    margin: spacingUnit * 3.5,
    arrowOffset: 0,
  },
];
