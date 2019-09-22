import {
  getCoordinatesForAddress,
  getJourneyPlannerLink,
  getTripDurations
} from './digitransit';

import { removeApartmentLettersFromStreetAddress } from './helpers/address';

const CARDS_KEY = 'OIKOTIE_CARDS';

const cards = JSON.parse(localStorage.getItem(CARDS_KEY)) || {};

export const addTripDurationToCard = async card => {
  const durationDiv = document.createElement('div');
  durationDiv.className = 'ot-card__duration';

  const cardHeader = card.querySelector('.ot-card__header');
  if (!cardHeader || !cardHeader.parentNode) {
    return false;
  }

  cardHeader.parentNode.insertBefore(durationDiv, cardHeader.nextSibling);

  const link = card.querySelector('a');
  if (!link) {
    return false;
  }

  const id = link
    .getAttribute('ng-href')
    .split('/')
    .pop();
  const street = card.querySelector('.ot-card__street').textContent;
  const city = card.querySelector('.ot-card__text--concat').textContent;
  const address = `${removeApartmentLettersFromStreetAddress(street)} ${city}`;

  const details = cards[id] || {};
  const coordinates = details.coordinates || (await getCoordinatesForAddress(address)); // prettier-ignore
  const tripDurations = details.tripDurations || (await getTripDurations(coordinates)); // prettier-ignore
  const journeyPlannerLink = getJourneyPlannerLink(address, coordinates);

  const tripDurationFastest =
    tripDurations.length > 0
      ? Math.round(Math.min(...tripDurations) / 60)
      : '–';
  const tripDurationSlowest =
    tripDurations.length > 0
      ? Math.round(Math.max(...tripDurations) / 60)
      : '–';
  const tripDurationText =
    tripDurationFastest === tripDurationSlowest
      ? `${tripDurationFastest} min`
      : `${tripDurationFastest}–${tripDurationSlowest} min`;

  card.querySelector(
    '.ot-card__duration'
  ).innerHTML = `${tripDurationText} <a href="${journeyPlannerLink}" target="_blank">(reittiopas.fi)</a>`;

  cards[id] = {
    id,
    street,
    city,
    address,
    coordinates,
    tripDurations
  };

  localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
};
