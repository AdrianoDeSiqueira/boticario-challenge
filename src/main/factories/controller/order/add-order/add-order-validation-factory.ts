import { ValidationComposite, RequiredFieldValidation, ITRFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeAddOrderValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['code', 'value', 'date', 'itr']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new ITRFieldValidation('itr'))
  return new ValidationComposite(validations)
}
