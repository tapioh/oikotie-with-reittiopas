import { searchAndSetTripDurations } from './oikotieModifier';

let cardPoller = null;

const pollForCards = () => {
  cardPoller = window.setInterval(() => {
    console.log('Finding cards...');
    const cards = document.querySelectorAll('.cards__card card');
    const cardsFound = cards.length !== 0;
    if (cardsFound) {
      console.log('Cards found – calling Digitransit!');
      window.clearInterval(cardPoller);
      searchAndSetTripDurations();
    }
  }, 1000);
};

document.addEventListener('DOMContentLoaded', function(event) {
  pollForCards();
});

document.addEventListener(
  'click',
  function(event) {
    if (!event.target.matches('.pagination__page')) return;
    pollForCards();
  },
  false
);
