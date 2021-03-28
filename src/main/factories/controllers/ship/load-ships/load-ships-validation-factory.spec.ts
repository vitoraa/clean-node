import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite } from '@/validation/validators'
import { makeLoadShipsValidation } from './load-ships-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('Load Ships Validation', () => {
  test('Should call ValidationComposite with all validation', () => {
    makeLoadShipsValidation()
    const validations: Validation[] = []
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
