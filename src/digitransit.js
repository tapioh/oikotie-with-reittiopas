import moment from 'moment';

import {
  DIGITRANSIT_API_URL,
  JOURNEY_PLANNER_URL,
  RAUTATIENTORI_COORDS
} from './constants';

import { sendMessageToBackground } from './chromeRunTime';

export const getCoordinatesForAddress = async text => {
  const response = await fetch(
    `${DIGITRANSIT_API_URL}/geocoding/v1/search?text=${encodeURI(text)}&size=1`
  );
  const responseJSON = await response.json();
  const coordinates =
    responseJSON &&
    responseJSON.features &&
    responseJSON.features[0] &&
    responseJSON.features[0].geometry &&
    responseJSON.features[0].geometry.coordinates;

  if (!coordinates) {
    return null;
  }

  return { lat: coordinates[1], lon: coordinates[0] };
};

export const getTripDurations = async fromCoords => {
  const responseJSON = await sendMessageToBackground({
    contentScriptQuery: 'getTripDurations',
    fromCoords
  });

  const itineraries =
    responseJSON &&
    responseJSON.data &&
    responseJSON.data.plan &&
    responseJSON.data.plan.itineraries;

  if (!itineraries) {
    return null;
  }

  return itineraries.map(itinerary => itinerary.duration);
};

export const getDigitransitQueryString = (
  fromCoords,
  toCoords = RAUTATIENTORI_COORDS
) => {
  if (!fromCoords || !fromCoords.lat || !fromCoords.lon) {
    return null;
  }

  const thisFriday = moment()
    .endOf('isoWeek')
    .subtract(2, 'days');
  const departureDate = thisFriday.format('YYYY-MM-DD');
  const departureTime = '07:30:00';

  return `{
        plan(
          from: {lat: ${fromCoords.lat}, lon: ${fromCoords.lon}}
          to: {lat: ${toCoords.lat}, lon: ${toCoords.lon}}
          date: "${departureDate}",
          time: "${departureTime}",
          numItineraries: 10
        ) {
          itineraries {
            duration
            legs {
              duration
            }
          }
        }
      }`;
};

export const getJourneyPlannerLink = (
  address,
  fromCoords,
  toCoords = RAUTATIENTORI_COORDS
) => {
  const fridayAt0730 = moment()
    .endOf('isoWeek')
    .subtract(2, 'days')
    .hours(7)
    .minutes(30)
    .unix();
  return `${JOURNEY_PLANNER_URL}/reitti/${address}::${fromCoords.lat}%2C${fromCoords.lon}/Rautatientori::${toCoords.lat}%2C${toCoords.lon}?time=${fridayAt0730}`;
};
