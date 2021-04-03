import { AccountModel, AddAccountParams } from '@/presentation/controllers/signup/signup-controller-protocols'

export const mockAccountModel = (): AccountModel => ({
  id: 'valid_id',
  email: 'valid_email@com',
  name: 'valid_name',
  password: 'hashed_password'
})

export const mockAddAccountParams = (): AddAccountParams => ({
  email: 'valid_email@com',
  name: 'valid_name',
  password: 'valid_password'
})
