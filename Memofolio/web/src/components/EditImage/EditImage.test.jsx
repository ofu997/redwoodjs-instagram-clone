import { render } from '@redwoodjs/testing/web'

import EditImage from './EditImage'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EditImage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditImage />)
    }).not.toThrow()
  })
})
