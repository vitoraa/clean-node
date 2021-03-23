import { AccountModel } from '../../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { AddAccountRepository } from '../../protocols/db/account/add-account-repository'
import { Hasher } from '../../protocols/criptography/hasher'
import { LoadAccountByEmailRepository } from '../../protocols/db/account/load-account-by-email-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const accountWithSameEmail = await this.loadAccountByEmailRepository.loadByEmail(account.email)
    if (!accountWithSameEmail) {
      const hashedPassword = await this.hasher.hash(account.password)
      const accountCreated = await this.addAccountRepository.add(Object.assign({}, account, { password: hashedPassword }))
      return accountCreated
    }
    return null
  }
}
