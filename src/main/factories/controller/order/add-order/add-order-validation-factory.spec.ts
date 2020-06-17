import { makeAddOrderValidation } from './add-order-validation-factory'
import { ValidationComposite, RequiredFieldValidation, ITRFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

jest.mock('@/validation/validators/validation-composite')

describe('AddOrderValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddOrderValidation()
    const validations: Validation[] = []
    for (const field of ['code', 'value', 'date', 'itr']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new ITRFieldValidation('itr'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
