import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, serverError, ok } from "../../helpers/http-helper";
import {
  iController,
  iEmailValidator,
  iHttpRequest,
  iHttpResponse,
  iAddAccount,
} from "./signup-protocols";

export class SignUpController implements iController {
  private readonly emailValidator: iEmailValidator;
  private readonly addAccount: iAddAccount;

  constructor(emailValidator: iEmailValidator, addAccount: iAddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  async handle(httpRequest: iHttpRequest): Promise<iHttpResponse> {
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

      const { name, email, password, passwordConfirmation } = httpRequest.body;

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError("passwordConfirmation"));
      }
      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }
      const account = await this.addAccount.add({
        name,
        email,
        password,
      });
      return ok(account);
    } catch (error) {
      return serverError();
    }
  }
}
