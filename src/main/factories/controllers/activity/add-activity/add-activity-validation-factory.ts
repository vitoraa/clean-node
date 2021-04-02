import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite } from '@/validation/validators'

export const makeAddActivityValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  return new ValidationComposite(validations)
}
