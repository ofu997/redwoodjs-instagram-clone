import { render } from '@redwoodjs/testing/web'

import ImageModal from './ImageModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ImageModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ImageModal />)
    }).not.toThrow()
  })
})
