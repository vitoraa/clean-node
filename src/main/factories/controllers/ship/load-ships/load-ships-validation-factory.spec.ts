import { Validation } from '../../../../../presentation/protocols/validation'
import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'
import { makeLoadShipsValidation } from './load-ships-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('Load Ships Validation', () => {
  test('Should call ValidationComposite with all validation', () => {
    makeLoadShipsValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'imo', 'ab']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
