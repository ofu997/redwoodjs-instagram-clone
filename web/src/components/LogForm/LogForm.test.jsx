import { render } from '@redwoodjs/testing/web'

import LogForm from './LogForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LogForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LogForm />)
    }).not.toThrow()
  })
})
