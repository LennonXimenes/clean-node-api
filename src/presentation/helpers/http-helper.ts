import { iHttpResponse } from "../protocols/http";

export const badRequest = (error: Error): iHttpResponse => {
  return {
    statusCode: 400,
    body: error,
  };
};
