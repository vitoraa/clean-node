import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeAddShipValidation } from './add-ship-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('Add Ship Validation', () => {
  test('Should call ValidationComposite with all validation', () => {
    makeAddShipValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'imo', 'ab']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
