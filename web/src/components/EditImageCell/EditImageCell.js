import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import ImageForm from 'src/components/ImageForm'
import { toast } from '@redwoodjs/web/toast'
import EditImage from 'src/components/EditImage'

export const QUERY = gql`
  query FindImageByIdEditImageCell($id: Int!) {
    image: image(id: $id) {
      id
      title
      url
      likes
    }
  }
`
const UPDATE_IMAGE_MUTATION = gql`
  mutation UpdateImageMutation($id: Int!, $input: UpdateImageInput!) {
    updateImage(id: $id, input: $input) {
      id
      title
      url
      likes
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ image }) => {
  const [updateImage, { loading, error }] = useMutation(UPDATE_IMAGE_MUTATION, {
    onCompleted: () => {
      navigate(routes.images())
      toast.success('Image updated.', { classes: 'rw-flash-success' })
    },
  })

  const onSave = (input, id) => {
    updateImage({ variables: { id, input } })
  }

  return (
    <EditImage
      image={image}
      onSave={onSave}
      error={error}
      loading={loading}
    />
  )
}
