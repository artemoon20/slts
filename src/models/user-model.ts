import {
  USER_STATUSES,
  USER_GENDERS,
  CLIENT_PRIORITY,
  CLIENT_SOURCE
} from '../shared/constants/app-constants';

// Manager Model Interface
export interface ManagerModel {
  id: string;
  organizationId: string | null;
  firstName: string;
  lastName: string | null;
  email: string;
  organizationCustomRoleId: string | null;
  roleId: number;
  status: USER_STATUSES;
  createdAt: Date;
  updatedAt: Date;
}

interface ClientModel {
  id: string;
  organizationId: string | null;
  managerId: string | null;
  firstName: string;
  lastName: string;
  birthday: Date | null;
  email: string;
  address: string | null;
  status: USER_STATUSES;
  phone: string | null;
  gender: USER_GENDERS | null;
  notes: string | null;
  source: CLIENT_SOURCE | null;
  priority: CLIENT_PRIORITY | null;
  createdAt: Date;
  updatedAt: Date;
}

export default ClientModel;
