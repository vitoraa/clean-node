import { Validation } from '../../../../../presentation/protocols/validation'
import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'

export const makeAddShipValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'imo', 'ab']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
