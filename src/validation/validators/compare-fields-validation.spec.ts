import faker from 'faker'
import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidParamError } from '../../presentation/errors/invalid-param-error'

describe('CompareFieldsValidation', () => {
  const field = faker.random.word()
  const fieldToCompare = faker.random.word()

  const makeSut = (): CompareFieldsValidation => {
    return new CompareFieldsValidation(field, fieldToCompare)
  }

  test('Should return an InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: faker.random.word(),
      [fieldToCompare]: faker.random.word()
    })
    expect(error).toEqual(new InvalidParamError(fieldToCompare))
  })
})
