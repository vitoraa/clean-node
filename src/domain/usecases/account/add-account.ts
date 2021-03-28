import { AccountModel } from '@/domain/models/account'

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel>
}

export interface AddAccountModel {
  email: string
  name: string
  password: string
}
