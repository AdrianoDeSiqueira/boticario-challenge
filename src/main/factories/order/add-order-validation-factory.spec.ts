import { makeAddOrderValidation } from './add-order-validation-factory'
import { ValidationComposite, RequiredFieldValidation } from '../../../validation/validators'
import { Validation } from '../../../presentation/protocols/validation'

jest.mock('../../../validation/validators/validation-composite')

describe('AddOrderValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddOrderValidation()
    const validations: Validation[] = []
    for (const field of ['code', 'value', 'date', 'socialSecurityNumber']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
