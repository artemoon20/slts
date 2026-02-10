import { SelectOption } from '../components/select';

export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

export enum USER_STATUSES {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export enum USER_ROLES {
  ADMIN = 'admin',
  ORGANIZATION_OWNER = 'organization_owner',
  ORGANIZATION_MANAGER = 'organization_manager',
  ORGANIZATION_CLIENT = 'organization_client'
}

export const ROLES_IDS = {
  ADMIN: 1,
  ORGANIZATION_OWNER: 2,
  ORGANIZATION_MANAGER: 3,
  ORGANIZATION_CLIENT: 4
};

export enum USER_GENDERS {
  MALE = 'male',
  FEMALE = 'female'
}

export enum CLIENT_SOURCE {
  SITE = 'site',
  AD = 'ad',
  REFERRAL = 'referral',
  COLD_CALL = 'cold_call'
}

export enum CLIENT_PRIORITY {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  HIGHEST = 'highest'
}

export const genderOptions: SelectOption[] = [
  { value: USER_GENDERS.MALE, label: 'Male' },
  { value: USER_GENDERS.FEMALE, label: 'Female' }
];

export const statusOptions: SelectOption[] = [
  { value: USER_STATUSES.ACTIVE, label: 'Active' },
  { value: USER_STATUSES.INACTIVE, label: 'Inactive' }
];

export const sourceOptions: SelectOption[] = [
  { value: CLIENT_SOURCE.SITE, label: 'Website' },
  { value: CLIENT_SOURCE.AD, label: 'Advertisement' },
  { value: CLIENT_SOURCE.REFERRAL, label: 'Referral' },
  { value: CLIENT_SOURCE.COLD_CALL, label: 'Cold Call' }
];

export const priorityOptions: SelectOption[] = [
  { value: CLIENT_PRIORITY.LOW, label: 'Low' },
  { value: CLIENT_PRIORITY.MEDIUM, label: 'Medium' },
  { value: CLIENT_PRIORITY.HIGH, label: 'High' },
  { value: CLIENT_PRIORITY.HIGHEST, label: 'Highest' }
];

export type UserStatusType = USER_STATUSES.ACTIVE | USER_STATUSES.INACTIVE;
export type UserGenderType = USER_GENDERS.MALE | USER_GENDERS.FEMALE;
export type ClientSourceType =
  | CLIENT_SOURCE.SITE
  | CLIENT_SOURCE.AD
  | CLIENT_SOURCE.REFERRAL
  | CLIENT_SOURCE.COLD_CALL;
export type ClientPriorityType =
  | CLIENT_PRIORITY.LOW
  | CLIENT_PRIORITY.MEDIUM
  | CLIENT_PRIORITY.HIGH
  | CLIENT_PRIORITY.HIGHEST;

export const BASE_API_URL = 'http://localhost:3001/api';
