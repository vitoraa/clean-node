import { AccountModel } from '@/domain/models/account'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) { }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    let tokenDecrypted: string
    try {
      tokenDecrypted = await this.decrypter.decrypt(token)
    } catch (error) {
      return null
    }
    if (tokenDecrypted) {
      const account = await this.loadAccountByTokenRepository.loadByToken(token, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
