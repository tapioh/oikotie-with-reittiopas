export const sendMessageToBackground = async message => {
  return new Promise(resolve => {
    chrome.runtime.sendMessage(message, response => {
      resolve(response);
    });
  });
};
