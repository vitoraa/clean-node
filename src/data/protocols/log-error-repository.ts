export interface LogErrorRepository {
  log: (stakc: string) => Promise<void>
}
