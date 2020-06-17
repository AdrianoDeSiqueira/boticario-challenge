import { Validation } from '@/presentation/protocols/validation'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'

export class ITRFieldValidation implements Validation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): Error {
    // eslint-disable-next-line no-useless-escape
    if (!/([0-9]{11})$/.test(input[this.fieldName])) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
