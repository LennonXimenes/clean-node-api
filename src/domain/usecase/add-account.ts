import { iAccountModel } from "../models/account";

export interface iAddAccountModel {
  name: string;
  email: string;
  password: string;
}

export interface iAddAccount {
  add(account: iAddAccountModel): iAccountModel;
}
