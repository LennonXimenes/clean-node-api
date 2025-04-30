import { InvalidParamError } from "../errors/invalid-param-error";
import { MissingParamError } from "../errors/missing-param-error";
import { ServerError } from "../errors/server-error";
import { badRequest } from "../helpers/http-helper";
import { iController } from "../protocols/controller";
import { iEmailValidator } from "../protocols/email-validator";
import { iHttpRequest, iHttpResponse } from "../protocols/http";

export class SignUpController implements iController {
  private readonly emailValidator: iEmailValidator;

  constructor(emailValidator: iEmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: iHttpRequest): iHttpResponse {
    try {
      const requiredFields = [
        "name",
        "email",
        "password",
        "passwordConfirmation",
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError(),
      };
    }
  }
}
