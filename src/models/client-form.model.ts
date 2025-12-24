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
