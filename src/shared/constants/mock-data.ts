import UserModel from "../../models/user-model";
import { USER_GENDERS, USER_STATUSES } from "./app-constants";
import { USER_ROLES } from "./app-constants";

export const mockUsers: UserModel[] = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
        birthDate: null,
        status: USER_STATUSES.ACTIVE,
        role: USER_ROLES.CLIENT,
        phone: '1234567890',
        gender: USER_GENDERS.MALE,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '2',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'password',
        birthDate: null,
        status: USER_STATUSES.ACTIVE,
        role: USER_ROLES.CLIENT,
        phone: '1234567890',
        gender: USER_GENDERS.FEMALE,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
]