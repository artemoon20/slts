import {
  UserStatusType,
  UserGenderType,
  ClientSourceType,
  ClientPriorityType
} from '../shared/constants/app-constants';

export interface ClientFormModel {
  // Basic client info
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthday: string;
  address: string;
  status: UserStatusType;
  gender: UserGenderType;
  source: ClientSourceType;
  priority: ClientPriorityType;
  notes: string;
  managerId: string;
}

export interface CreateClientRequest {
  first_name: string;
  last_name: string | null;
  phone: string | null;
  email: string | null;
  birthday: string | null;
  address: string | null;
  status: UserStatusType;
  gender: UserGenderType | null;
  source: ClientSourceType | null;
  priority: ClientPriorityType;
  notes: string | null;
  manager_id: string | null;
}
