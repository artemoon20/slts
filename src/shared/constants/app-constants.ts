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
    CLIENT = 'client'
}

export enum USER_GENDERS {
    MALE = 'male',
    FEMALE = 'female'
}

export const genderOptions: SelectOption[] = [
    { value: USER_GENDERS.MALE, label: 'Male' },
    { value: USER_GENDERS.FEMALE, label: 'Female' },
];

export const BASE_API_URL = 'http://localhost:3001/api';