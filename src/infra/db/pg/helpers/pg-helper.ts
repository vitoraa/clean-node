import { Client } from 'pg'

export const PostgresHelper = {
  client: null as Client,

  async connect (uri: string): Promise<void> {
    this.client = new Client(uri)
    this.client.connect()
  },

  async disconnect (): Promise<void> {
    await this.client.end()
    this.client = null
  }
}
