export const removeApartmentLettersFromStreetAddress = address => {
  if (!address) {
    return '';
  }

  const numbers = address.match(/\d+/g);
  if (!numbers || numbers.length === 0) {
    return address;
  }

  const startsWithNumber = address.startsWith(numbers[0]);
  if (startsWithNumber) {
    return address;
  }

  const firstNumberString = numbers[0];
  const firstIndex = address.indexOf(firstNumberString);
  return address.slice(0, firstIndex + firstNumberString.length);
};
