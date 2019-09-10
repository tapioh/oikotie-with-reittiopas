import { searchAndSetTripDurations } from './oikotieModifier';

let cardPoller = null;
let previousCardsCount = 0;

const pollForCards = () => {
  cardPoller = window.setInterval(() => {
    console.log('Polling for cards...');
    const cards = document.querySelectorAll('.cards__card card');
    const cardsCount = cards.length;
    if (cardsCount && cardsCount !== previousCardsCount) {
      console.log('New cards found – calling Digitransit!', {
        cardsCount,
        previousCardsCount
      });
      previousCardsCount = cardsCount;
      searchAndSetTripDurations();
    } else {
      console.log('No new cards found.', { cardsCount, previousCardsCount });
    }
  }, 1000);
};

document.addEventListener('DOMContentLoaded', function(event) {
  pollForCards();

  document.body.addEventListener(
    'click',
    evt => {
      if (evt.target.className === 'pagination__page') {
        previousCardsCount = 0;
      }
    },
    false
  );
});
