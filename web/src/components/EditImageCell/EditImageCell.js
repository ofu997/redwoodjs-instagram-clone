import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import ImageForm from 'src/components/ImageForm'

export const QUERY = gql`
  query FIND_IMAGE_BY_ID($id: Int!) {
    image: image(id: $id) {
      id
      title
      url
    }
  }
`
const UPDATE_IMAGE_MUTATION = gql`
  mutation UpdateImageMutation($id: Int!, $input: UpdateImageInput!) {
    updateImage(id: $id, input: $input) {
      id
      title
      url
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ image }) => {
  const { addMessage } = useFlash()
  const [updateImage, { loading, error }] = useMutation(UPDATE_IMAGE_MUTATION, {
    onCompleted: () => {
      navigate(routes.images())
      addMessage('Image updated.', { classes: 'rw-flash-success' })
    },
  })

  const onSave = (input, id) => {
    updateImage({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Image {image.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ImageForm
          image={image}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
