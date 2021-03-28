import { Validation } from '../../../../../presentation/protocols/validation'
import { ValidationComposite } from '../../../../../validation/validators'

export const makeLoadShipsValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  return new ValidationComposite(validations)
}
