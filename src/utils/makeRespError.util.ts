import { IResponseError } from "../interfaces/responseError.interface";

// TODO: [SEG310-85] [Backend] refactor all constollers to use this function

interface errorResponse {
    error: IResponseError
}

export default function(message?: string, errors?: string[]): errorResponse {
    return {
        error: {
            message,
            errors
        }
    }
}