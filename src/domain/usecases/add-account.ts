import { AccountModel } from '../models/account'

export interface AddAccount {
  add: (account: AddAccountModel) => AccountModel
}

export interface AddAccountModel {
  email: string
  name: string
  password: string
}
