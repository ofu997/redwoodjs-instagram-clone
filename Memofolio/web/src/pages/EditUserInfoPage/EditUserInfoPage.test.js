import { render } from '@redwoodjs/testing'

import EditUserInfoPage from './EditUserInfoPage'

describe('EditUserInfoPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditUserInfoPage />)
    }).not.toThrow()
  })
})
