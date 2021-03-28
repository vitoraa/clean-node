import { AccountModel } from '@/domain/models/account'

export interface LoadAccountByToken {
  loadByToken: (token: string, role?: string) => Promise<AccountModel>
}
