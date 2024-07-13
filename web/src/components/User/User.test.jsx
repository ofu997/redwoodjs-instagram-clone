import { render } from '@redwoodjs/testing/web'

import User from './User'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('User', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<User />)
    }).not.toThrow()
  })
})
