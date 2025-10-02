import { AppError } from "./AppError";

export class BadRequestError extends AppError {
    constructor(message: string, details: any[] = []) {
        super(message, 400, details);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string, details: any[] = []) {
        super(message, 401, details);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string, details: any[] = []) {
        super(message, 404, details);
    }
}

export class InternalServerError extends AppError {
    constructor(message: string, details: any[] = []) {
        super(message, 500, details);
    }
}
