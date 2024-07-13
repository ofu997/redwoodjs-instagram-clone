import { render } from '@redwoodjs/testing/web'

import ImageForm from './ImageForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ImageForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ImageForm />)
    }).not.toThrow()
  })
})
