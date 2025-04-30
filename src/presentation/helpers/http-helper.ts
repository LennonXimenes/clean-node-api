import { ServerError } from "../errors/server-error";
import { iHttpResponse } from "../protocols/http";

export const badRequest = (error: Error): iHttpResponse => {
  return {
    statusCode: 400,
    body: error,
  };
};

export const serverError = (): iHttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(),
  };
};
