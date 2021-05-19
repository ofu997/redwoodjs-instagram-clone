import { render } from '@redwoodjs/testing'

import LogInForm from './LogInForm'

describe('LogInForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LogInForm />)
    }).not.toThrow()
  })
})
