import { addTripDurationToCard } from './cardModifier';

document.addEventListener('DOMContentLoaded', function(event) {
  const mutationObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (
        mutation.addedNodes &&
        mutation.addedNodes[0] &&
        mutation.addedNodes[0].classList &&
        mutation.addedNodes[0].classList[0] === 'cards__card'
      ) {
        addTripDurationToCard(mutation.addedNodes[0]);
      }
    });
  });

  mutationObserver.observe(document.querySelector('body'), {
    childList: true,
    subtree: true
  });
});
