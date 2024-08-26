import { AxiosError } from "axios";

const ERROR_CODE_MESSAGE_MAPPINGS: Record<number, string> = {
    401: 'User not logged in',
    403: 'Unauthorized access',
}

export const getError = (error: AxiosError) => {
    if (!error.response) return "Something went wrong";
    return ERROR_CODE_MESSAGE_MAPPINGS[error.response.status];
}