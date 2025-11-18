import { SelectOption } from "../components/select";

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
    FREE_CLIENT = 'free_client',
    PREMIUM_CLIENT = 'premium_client',
}

export enum USER_GENDERS {
    MALE = 'male',
    FEMALE = 'female'
}

export const genderOptions: SelectOption[] = [
    { value: USER_GENDERS.MALE, label: 'Male' },
    { value: USER_GENDERS.FEMALE, label: 'Female' },
];

export const roleOptions: SelectOption[] = [
    { value: USER_ROLES.ADMIN, label: 'Admin' },
    { value: USER_ROLES.FREE_CLIENT, label: 'Free Client' },
    { value: USER_ROLES.PREMIUM_CLIENT, label: 'Premium Client' },
];

export type UserStatusType = USER_STATUSES.ACTIVE | USER_STATUSES.INACTIVE;
export type UserRoleType = USER_ROLES.ADMIN | USER_ROLES.FREE_CLIENT | USER_ROLES.PREMIUM_CLIENT;
export type ClientRoleType = Exclude<UserRoleType, USER_ROLES.ADMIN>;
export type UserGenderType = USER_GENDERS.MALE | USER_GENDERS.FEMALE;

export const BASE_API_URL = 'http://localhost:3001/api';