import { render } from '@redwoodjs/testing'

import Comment from './Comment'

describe('Comment', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Comment />)
    }).not.toThrow()
  })
})
