import { Validation } from '@/presentation/protocols/validation'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'

export class ITRFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    return new InvalidParamError(this.fieldName)
  }
}
