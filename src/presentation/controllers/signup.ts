import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http-helper";
import { iController } from "../protocols/controller";
import { iHttpRequest, iHttpResponse } from "../protocols/http";

export class SignUpController implements iController {
  handle(httpRequest: iHttpRequest): iHttpResponse {
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
  }
}
