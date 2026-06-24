import { AppError } from "./app-error";

export class ValidationError extends AppError {
  constructor(message = "Validation Error") {
    super(message, 400);
  }
}
