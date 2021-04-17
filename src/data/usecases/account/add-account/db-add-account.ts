import { AddAccount } from '@/domain/usecases/account/add-account'
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { Hasher } from '@/data/protocols/criptography/hasher'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { AccountModel } from '../../../../domain/models/account'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    const accountWithSameEmail = await this.loadAccountByEmailRepository.loadByEmail(account.email)
    let accountCreated: AccountModel = null
    if (!accountWithSameEmail) {
      const hashedPassword = await this.hasher.hash(account.password)
      accountCreated = await this.addAccountRepository.add({ ...account, password: hashedPassword })
    }
    return accountCreated !== null
  }
}
