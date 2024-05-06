import { logout } from './logout'
import * as storage from '../../storage/index'

jest.mock('../../storage/index') // Mock the storage module

describe('logout function', () => {
  it('clears the token and profile from storage', () => {
    logout()

    // Check if the remove function was called correctly
    expect(storage.remove).toHaveBeenCalledWith('token')
    expect(storage.remove).toHaveBeenCalledWith('profile')
  })
})
