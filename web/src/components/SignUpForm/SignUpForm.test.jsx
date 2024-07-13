import { render } from '@redwoodjs/testing/web'

import SignUpForm from './SignUpForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SignUpForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignUpForm />)
    }).not.toThrow()
  })
})
