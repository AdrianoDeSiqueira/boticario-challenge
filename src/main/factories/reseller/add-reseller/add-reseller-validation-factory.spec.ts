import { makeAddResellerValidation } from './add-reseller-validation-factory'
import { ValidationComposite, CompareFieldsValidation, EmailValidation, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { EmailValidator } from '@/validation/protocols/email-validator'

jest.mock('@/validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('AddResellerValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddResellerValidation()
    const validations: Validation[] = []
    for (const field of ['itr', 'name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
