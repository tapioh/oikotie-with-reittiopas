import { removeApartmentLettersFromStreetAddress } from './address';

describe('helpers/address', () => {
  describe('removeApartmentLettersFromStreetAddress', () => {
    it('should remove correct letters', () => {
      expect(removeApartmentLettersFromStreetAddress('Kyntäjäntie As. A')).toEqual('Kyntäjäntie As. A'); // prettier-ignore
      expect(removeApartmentLettersFromStreetAddress('Kyntäjäntie 3 As. A')).toEqual('Kyntäjäntie 3'); // prettier-ignore
      expect(removeApartmentLettersFromStreetAddress('Kyntäjäntie 33 As. A')).toEqual('Kyntäjäntie 33'); // prettier-ignore
      expect(removeApartmentLettersFromStreetAddress('Kyntäjäntie 33 As. A 5')).toEqual('Kyntäjäntie 33'); // prettier-ignore
      expect(removeApartmentLettersFromStreetAddress('Kyntäjäntie 33')).toEqual('Kyntäjäntie 33'); // prettier-ignore

      expect(removeApartmentLettersFromStreetAddress('As. A')).toEqual('As. A'); // prettier-ignore
      expect(removeApartmentLettersFromStreetAddress('1 As. A')).toEqual('1 As. A'); // prettier-ignore
      expect(removeApartmentLettersFromStreetAddress('13 As. A')).toEqual('13 As. A'); // prettier-ignore
      expect(removeApartmentLettersFromStreetAddress('133 As. A')).toEqual('133 As. A'); // prettier-ignore
      expect(removeApartmentLettersFromStreetAddress('1337 As. A')).toEqual('1337 As. A'); // prettier-ignore

      expect(removeApartmentLettersFromStreetAddress('Ahotie 10')).toEqual('Ahotie 10'); // prettier-ignore
      expect(removeApartmentLettersFromStreetAddress('Ahotie 10 ')).toEqual('Ahotie 10'); // prettier-ignore
      expect(removeApartmentLettersFromStreetAddress('Ahotie 10 A')).toEqual('Ahotie 10'); // prettier-ignore
      expect(removeApartmentLettersFromStreetAddress('Ahotie 10 A1')).toEqual('Ahotie 10'); // prettier-ignore
      expect(removeApartmentLettersFromStreetAddress('Ahotie 10 A2')).toEqual('Ahotie 10'); // prettier-ignore
      expect(removeApartmentLettersFromStreetAddress('Ahotie 10 A 1')).toEqual('Ahotie 10'); // prettier-ignore
      expect(removeApartmentLettersFromStreetAddress('Ahotie 10 A 2')).toEqual('Ahotie 10'); // prettier-ignore

      expect(removeApartmentLettersFromStreetAddress('Samoilijantie 12 B')).toEqual('Samoilijantie 12'); // prettier-ignore
      expect(removeApartmentLettersFromStreetAddress('Samoilijantie 12 B 5')).toEqual('Samoilijantie 12'); // prettier-ignore

      expect(removeApartmentLettersFromStreetAddress('Runoilijan polku 2 A')).toEqual('Runoilijan polku 2'); // prettier-ignore
      expect(removeApartmentLettersFromStreetAddress('Runoilijan polku 2A')).toEqual('Runoilijan polku 2'); // prettier-ignore
    });
  });
});
