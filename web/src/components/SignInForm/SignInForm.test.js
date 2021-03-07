import { render } from '@redwoodjs/testing'

import SignInForm from './SignInForm'

describe('SignInForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignInForm />)
    }).not.toThrow()
  })
})
