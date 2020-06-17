import { Validation } from '@/presentation/protocols/validation'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'

export class ITRFieldValidation implements Validation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): Error {
    // eslint-disable-next-line no-useless-escape
    if (!/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(input[this.fieldName])) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
