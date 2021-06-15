import { render } from '@redwoodjs/testing'

import NewImageLayout from './NewImageLayout'

describe('NewImageLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewImageLayout />)
    }).not.toThrow()
  })
})
