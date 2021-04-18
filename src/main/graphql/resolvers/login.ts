import { adaptResolver } from '../../adapters/express/apollo-server-resolver-adapter'
import { makeLoginController } from '../../factories/controllers/login/login-controller-factory'
import { makeSignUpController } from '../../factories/controllers/signup/signup-controller-factory'

export default {
  Query: {
    async login (parent: any, args: any) {
      return await adaptResolver(makeLoginController(), args)
    }
  },

  Mutation: {
    async signUp (parent: any, args: any) {
      return await adaptResolver(makeSignUpController(), args)
    }
  }
}
