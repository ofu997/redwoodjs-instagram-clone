import { render } from '@redwoodjs/testing/web'

import NewImage from './NewImage'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NewImage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewImage />)
    }).not.toThrow()
  })
})
