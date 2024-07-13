import { images, image, createImage, updateImage, deleteImage } from './images'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('images', () => {
  scenario('returns all images', async (scenario) => {
    const result = await images()

    expect(result.length).toEqual(Object.keys(scenario.image).length)
  })

  scenario('returns a single image', async (scenario) => {
    const result = await image({ id: scenario.image.one.id })

    expect(result).toEqual(scenario.image.one)
  })

  scenario('creates a image', async (scenario) => {
    const result = await createImage({
      input: {
        title: 'String',
        url: 'String',
        createdAt: 'String',
        userId: scenario.image.two.userId,
      },
    })

    expect(result.title).toEqual('String')
    expect(result.url).toEqual('String')
    expect(result.createdAt).toEqual('String')
    expect(result.userId).toEqual(scenario.image.two.userId)
  })

  scenario('updates a image', async (scenario) => {
    const original = await image({ id: scenario.image.one.id })
    const result = await updateImage({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a image', async (scenario) => {
    const original = await deleteImage({ id: scenario.image.one.id })
    const result = await image({ id: original.id })

    expect(result).toEqual(null)
  })
})
