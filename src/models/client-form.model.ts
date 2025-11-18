import { ClientRoleType } from "../shared/constants/app-constants";

export interface ClientFormModel {
  // client info
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  role: ClientRoleType;
  phone: string;
  gender: string;
  // address info
  country: string;
  city: string;
  zip: string;
  address: string;
  state: string;
  // bank info
  cardNumber: string;
  expiryDate: string;
  currency: string;
  // company info
  companyName: string;
  department: string;
  position: string;
}

export interface CreateClientRequest {
  first_name: string;
  last_name: string | null;
  birth_date: Date | null;
  email: string;
  role: ClientRoleType;
  phone: string | null;
  gender: string | null;
  // address info
  country: string | null;
  city: string | null;
  zip: string | null;
  address: string | null;
  state: string | null;
  // bank info
  card_number: string | null;
  expiry_date: string | null;
  currency: string | null;
  // company info
  company_name: string | null;
  department: string | null;
  position: string | null;
}
