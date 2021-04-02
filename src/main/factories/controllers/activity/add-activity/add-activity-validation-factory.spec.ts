import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite } from '@/validation/validators'
import { makeAddActivityValidation } from './add-activity-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('Add Activity Validation', () => {
  test('Should call ValidationComposite with all validation', () => {
    makeAddActivityValidation()
    const validations: Validation[] = []
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
