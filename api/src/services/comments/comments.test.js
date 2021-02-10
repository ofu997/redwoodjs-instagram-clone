import { comments } from './comments'

describe('comments', () => {
  scenario('returns all comments', async (scenario) => {
    const result = await comments()

    expect(result.length).toEqual(Object.keys(scenario.comment).length)
  })
})
