import Person from '../Person';

test('Valid Person json passes validation', () => {
  const jsonNoAddressOrPhoneNumber = {
    address: null,
    createdAt: new Date().getTime(),
    email: null,
    firstName: 'Brendan',
    id: '123',
    lastName: 'McNamara',
    modelType: 'Person',
    phoneNumber: null,
    type: 'MODEL',
    updatedAt: new Date().getTime(),
  };

  expect(() => Person.fromJSON(jsonNoAddressOrPhoneNumber)).not.toThrow();

  const jsonWithAddressNoPhoneNumber = {
    address: {descriptor: '18720 Sylvan St Tarzana CA 91416'},
    createdAt: new Date().getTime(),
    email: null,
    firstName: 'Brendan',
    id: '123',
    lastName: 'McNamara',
    modelType: 'Person',
    phoneNumber: null,
    type: 'MODEL',
    updatedAt: new Date().getTime(),
  };

  expect(() => Person.fromJSON(jsonWithAddressNoPhoneNumber)).not.toThrow();

  const jsonWithPhoneNumberNoAddress = {
    address: null,
    createdAt: new Date().getTime(),
    email: null,
    firstName: 'Brendan',
    id: '123',
    lastName: 'McNamara',
    modelType: 'Person',
    phoneNumber: '+1 (310) 112-4322',
    type: 'MODEL',
    updatedAt: new Date().getTime(),
  };

  expect(() => Person.fromJSON(jsonWithPhoneNumberNoAddress)).not.toThrow();
});

test('Invalid Person json throws error', () => {
  const jsonMissingFirstName = {
    address: null,
    createdAt: new Date().getTime(),
    email: null,
    id: '123',
    lastName: 'McNamara',
    modelType: 'Person',
    phoneNumber: '+1 (310) 112-4322',
    type: 'MODEL',
    updatedAt: new Date().getTime(),
  };

  expect(() => Person.fromJSON(jsonMissingFirstName)).toThrow();
});
