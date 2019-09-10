import moment from 'moment';

import {
  getCoordinatesForAddress,
  getJourneyPlannerLink,
  getTripDurations
} from './digitransit';

const ids = [];

export const searchAndSetTripDurations = async () => {
  const cards = document.querySelectorAll('.cards__card card');

  cards.forEach(async card => {
    const durationDiv = document.createElement('div');
    durationDiv.className = 'ot-card__duration';

    const cardHeader = card.querySelector('.ot-card__header');
    cardHeader.parentNode.insertBefore(durationDiv, cardHeader.nextSibling);

    const link = card.querySelector('a');
    if (!link) {
      return false;
    }

    const id = link.getAttribute('ng-href');
    const identified = ids.includes(id);
    if (identified) {
      return false;
    }

    ids.push(id);

    const street = card.querySelector('.ot-card__street').textContent;
    const city = card.querySelector('.ot-card__text--concat').textContent;
    const coordinates = await getCoordinatesForAddress(`${street} ${city}`);

    try {
      const tripDurations = await getTripDurations(coordinates);

      if (!tripDurations) {
        return false;
      }

      const journeyPlannerLink = getJourneyPlannerLink(address, coordinates);
      const tripDurationFastest = Math.round(Math.min(...tripDurations) / 60);
      const tripDurationSlowest = Math.round(Math.max(...tripDurations) / 60);
      const tripDurationText =
        tripDurationFastest === tripDurationSlowest
          ? `${tripDurationFastest} min`
          : `${tripDurationFastest}–${tripDurationSlowest} min`;

      card.querySelector(
        '.ot-card__duration'
      ).innerHTML = `${tripDurationText} <a href="${journeyPlannerLink}" target="_blank">(reittiopas.fi)</a>`;
    } catch (e) {
      console.log('Failed to fetch trip durations for address');
      console.log(e);
    }
  });
};
