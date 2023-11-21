import { ApplicationError } from "protocols";

export function notFoundError(customMessage?: string): ApplicationError {
    return {
        name: 'NotFoundError',
        message: customMessage || 'No result for this search!',
    };
}

export function unauthorizedError(customMessage?: string): ApplicationError {
    return {
        name: 'UnauthorizedError',
        message: customMessage || 'Unauthorized access!',
    };
}

export function validationError(customMessage?: string): ApplicationError {
    return {
        name: 'ValidationError',
        message: customMessage || 'Validation failed',
    };
}
