export class FieldInUseError extends Error {
  constructor (field: string) {
    super(`${field} is already in use`)
    this.name = 'FieldInUseError'
  }
}
