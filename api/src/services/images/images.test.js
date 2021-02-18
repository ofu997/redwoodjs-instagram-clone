import { images } from './images'

describe('images', () => {
  scenario('returns all images', async (scenario) => {
    const result = await images()

    expect(result.length).toEqual(Object.keys(scenario.image).length)
  })
})
