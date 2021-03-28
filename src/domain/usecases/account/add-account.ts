import { AccountModel } from '@/domain/models/account'

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel>
}

export type AddAccountModel = {
  email: string
  name: string
  password: string
}
