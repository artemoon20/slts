import { USER_STATUSES, USER_ROLES, USER_GENDERS } from '../shared/constants/app-constants';

interface UserModel {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: Date | null;
    email: string;
    password: string;
    status: USER_STATUSES;
    role: USER_ROLES;
    phone: string | null;
    gender: USER_GENDERS | null;
    createdAt: Date;
    updatedAt: Date;
}

export default UserModel;