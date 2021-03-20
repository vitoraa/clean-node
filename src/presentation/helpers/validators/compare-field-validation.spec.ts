import { InvalidParamError } from '../../errors'
import { CompareFieldValidation } from './compare-field-validation'

describe('Compare Field Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = new CompareFieldValidation('field', 'fieldToCompare')
    const error = sut.validate({ field: 'any', fieldToCompare: 'another' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })
})
