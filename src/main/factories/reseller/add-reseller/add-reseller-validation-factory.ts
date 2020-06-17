import { ValidationComposite, CompareFieldsValidation, EmailValidation, RequiredFieldValidation, ITRFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'

export const makeAddResellerValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['itr', 'name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new ITRFieldValidation('itr'))
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
