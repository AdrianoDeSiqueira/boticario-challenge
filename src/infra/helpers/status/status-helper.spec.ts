import { StatusHelper } from './status-helper'

const specificSocialSecurityNumber: string = 'specific_social_security_number'

const makeSut = (): StatusHelper => {
  return new StatusHelper(specificSocialSecurityNumber)
}

describe('Status Helper', () => {
  test('Should return "Em validação" for social security number', async () => {
    const sut = makeSut()
    const status = await sut.get('any_social_security_number')
    expect(status).toBe('Em validação')
  })

  test('Should return "Aprovado" for specific social security number', async () => {
    const sut = makeSut()
    const status = await sut.get(specificSocialSecurityNumber)
    expect(status).toBe('Aprovado')
  })
})
