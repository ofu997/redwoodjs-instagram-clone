import { render } from '@redwoodjs/testing/web'

import Images from './Images'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Images', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Images />)
    }).not.toThrow()
  })
})
