import { CustomError } from "./customError";

export class SessionEndError extends CustomError {
    statusCode = 406;
    
    constructor(public message: string) {
        super(message);
    }

    serializeErrors() {
        return [{message: this.message}];
    }
}