import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account'
import { AddAccount } from '@/domain/usecases/account/add-account'
import { BCryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'

export const makeDbAddAccount = (): AddAccount => {
  const hasher = new BCryptAdapter(12)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(hasher, accountMongoRepository, accountMongoRepository)
}
