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
      url
      user {
        localStoragePassword
        handle
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

export const Loading = () => <h2 className='branding-font'>Loading...</h2>

export const Success = ({ image }) => {
  const LSuser = getLoggedInUser();
  const [updateImage, { loading, error }] = useMutation(UPDATE_IMAGE_MUTATION, {
    onCompleted: ({ updateImage }) => {
      navigate(routes.image({ id: updateImage.id }))
      toast.success('Memo updated.', { classes: 'rw-flash-success' })
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
