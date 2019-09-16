import { DIGITRANSIT_API_URL, OIKOTIE_ASUNNOT_HOST } from './constants';
import { getDigitransitQueryString } from './digitransit';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { contentScriptQuery, fromCoords } = request;
  if (contentScriptQuery === 'getTripDurations') {
    const digitransitQuery = getDigitransitQueryString(fromCoords);

    fetch(`${DIGITRANSIT_API_URL}/routing/v1/routers/hsl/index/graphql`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: digitransitQuery })
    })
      .then(response => response.json())
      .then(responseJSON => sendResponse(responseJSON))
      .catch(error => console.error('Error:', error));
    return true;
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: OIKOTIE_ASUNNOT_HOST }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});
