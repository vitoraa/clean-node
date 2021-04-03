import { Pool } from 'pg'

export const PostgresHelper = {
  client: null,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await new Pool({ connectionString: uri }).connect()
  },

  async disconnect (): Promise<void> {
    await this.client.end()
    this.client = null
  }
}
