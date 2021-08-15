import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'
import EditImage from 'src/components/EditImage'
import { getLoggedInUser } from 'src/functions/WebFunctions'

export const QUERY = gql`
  query FindImageByIdEditImageCell($id: Int!) {
    image: image(id: $id) {
      id
      title
      user {
        localStoragePassword
      }
    }
  }
`
const UPDATE_IMAGE_MUTATION = gql`
  mutation UpdateImageMutation($id: Int!, $input: UpdateImageInput!) {
    updateImage(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ image }) => {
  const LSuser = getLoggedInUser();
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
  (LSuser.localStoragePassword === image.user.localStoragePassword) ? 
    <EditImage
      image={image}
      onSave={onSave}
      error={error}
      loading={loading}
    />
    : 
    <h3 className='branding-font'>Womp womp...invalid credentials</h3>
  )
}
