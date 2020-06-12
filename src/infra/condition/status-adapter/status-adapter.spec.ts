import { StatusAdapter } from './status-adapter'

const makeSut = (): StatusAdapter => {
  return new StatusAdapter()
}

describe('Status Adapter', () => {
  test('Should return "Em validação" for social security number', async () => {
    const sut = makeSut()
    const status = await sut.get('any_social_security_number')
    expect(status).toBe('Em validação')
  })
})
