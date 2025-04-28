import { iHttpRequest, iHttpResponse } from "./http";

export interface iController {
  handle(httpRequest: iHttpRequest): iHttpResponse;
}
