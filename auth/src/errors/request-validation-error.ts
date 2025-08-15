import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    const uniqueErrors: Record<string, { message: string; field?: string }> =
      {};

    for (const err of this.errors) {
      if (err.type === "field") {
        if (!uniqueErrors[err.path]) {
          uniqueErrors[err.path] = { message: err.msg, field: err.path };
        }
      }
    }

    return Object.values(uniqueErrors);
  }
}
