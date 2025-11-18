import { USER_STATUSES, USER_GENDERS, ClientRoleType } from '../shared/constants/app-constants';

type BankInfo = {
    cardNumber: string;
    expiryDate: string;
    currency: string;
}

type CompanyInfo = {
    companyName: string;
    department: string;
    position: string;
}

type AddressInfo = {
    country: string;
    city: string;
    zip: string;
    address: string;
    state: string;
}

interface UserModel {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: Date | null;
    email: string;
    password: string;
    status: USER_STATUSES;
    role: ClientRoleType;
    phone: string | null;
    gender: USER_GENDERS | null;
    bankInfo: BankInfo;
    companyInfo: CompanyInfo;
    addressInfo: AddressInfo;
    createdAt: Date;
    updatedAt: Date;
}

export default UserModel;