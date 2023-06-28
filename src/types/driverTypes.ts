export interface DriverType {
  _id: string;
  companyId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  birthday: Date;
  birthPlace: string;
  licenceNumber: string;
  licenceTyp: string;
  licenceTypExpire: Date;
  codeNumber: string;
  codeNumberExpire: Date;
  driverCardNumber: string;
  driverCardNumberExpire: Date;
  createdAt: Date;
}
