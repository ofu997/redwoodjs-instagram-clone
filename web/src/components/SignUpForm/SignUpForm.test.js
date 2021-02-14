import { render } from '@redwoodjs/testing'

import SignUpForm from './SignUpForm'

describe('SignUpForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignUpForm />)
    }).not.toThrow()
  })
})
