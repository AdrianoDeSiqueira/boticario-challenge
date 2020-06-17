import faker from 'faker'
import { ITRFieldValidation } from './index'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'

const field = faker.random.word()

const makeSut = (): ITRFieldValidation => {
  return new ITRFieldValidation(field)
}

describe('ITRField Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: '123.45' })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: '341.273.118-86' })
    expect(error).toBeFalsy()
  })
})
