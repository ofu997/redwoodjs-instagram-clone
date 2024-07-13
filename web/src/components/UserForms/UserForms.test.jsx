import { render } from '@redwoodjs/testing/web'

import UserForms from './UserForms'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserForms', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserForms />)
    }).not.toThrow()
  })
})
