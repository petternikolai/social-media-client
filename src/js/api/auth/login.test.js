import { login } from './login'
import * as storage from '../../storage/index'

jest.mock('../../storage/index')

const token = '12345'

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ accessToken: token, name: 'John Doe' }),
  }),
)

describe('login function', () => {
  beforeEach(() => {
    jest.clearAllMocks() // Clear mock call information between tests
  })

  it('should successfully store the access token and profile in localStorage', async () => {
    const profile = await login('test@fake-email.com', 'password')

    expect(storage.save).toHaveBeenCalledWith('token', token)
    expect(storage.save).toHaveBeenCalledWith('profile', { name: 'John Doe' })
    expect(profile).toEqual({ name: 'John Doe' }) // Ensure the returned profile is as expected
  })

  it('should throw an error when the response is not ok', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Unauthorized',
      }),
    )

    await expect(login('test@wrong-email.com', 'password')).rejects.toThrow(
      'Unauthorized',
    )
  })
})
