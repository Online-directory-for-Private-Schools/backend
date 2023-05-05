import { ResponseError } from "../interfaces/responseError.interface";

// TODO: [SEG310-85] [Backend] refactor all constollers to use this function

interface errorResponse {
    error: ResponseError
}

export default function(message: string): errorResponse {
    return {
        error: {
            message
        }
    }
}