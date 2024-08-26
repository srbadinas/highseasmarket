import { UserTypes } from "../UserTypes"



export const USER_TYPE_MAPPING: Record<UserTypes, string> = {
    [UserTypes.Admin]: 'Admin',
    [UserTypes.Seller]: 'Seller',
    [UserTypes.Buyer]: 'Buyer',
}

export type UserDto = {
    id: string,
    email: string,
    firstname: string,
    lastname: string,
    address: string,
    city: string,
    state: string,
    zip_code: string,
    company: string,
    user_type_id: number,
    created_date: Date
}

export interface LoggedInUserDto extends UserDto {
    token: string
}