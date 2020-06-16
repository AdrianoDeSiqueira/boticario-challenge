import { StatusHelper } from './status-helper'

const itr: string = 'specific_individual_taxpayer_registration'

const makeSut = (): StatusHelper => {
  return new StatusHelper(itr)
}

describe('Status Helper', () => {
  test('Should return "Em validação" for itr', async () => {
    const sut = makeSut()
    const status = await sut.get('any_individual_taxpayer_registration')
    expect(status).toBe('Em validação')
  })

  test('Should return "Aprovado" for specific itr', async () => {
    const sut = makeSut()
    const status = await sut.get(itr)
    expect(status).toBe('Aprovado')
  })
})
