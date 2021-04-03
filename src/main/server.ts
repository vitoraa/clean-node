import 'module-alias/register'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'
import { PostgresHelper } from '@/infra/db/pg/helpers/pg-helper'

PostgresHelper.connect(env.pgUrl).then(async () => {
  console.log(`POSTRGES conectado: ${env.pgUrl}`)
  await MongoHelper.connect(env.mongoUrl)
    .then(async () => {
      console.log(`MONGO conectado: ${env.mongoUrl}`)
      const app = (await import('./config/app')).default
      app.listen(env.port, () => console.log(`Running at http:localhost:${env.port}`))
    })
    .catch(console.error)
}).catch(console.error)
