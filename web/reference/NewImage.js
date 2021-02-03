import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
// import ImageForm from 'src/components/ImageForm'
import FirebaseImageForm from 'src/components/ImageForm/FirebaseImageForm'

import { QUERY } from 'src/components/ImagesCell'

const CREATE_IMAGE_MUTATION = gql`
  mutation CreateImageMutation($input: CreateImageInput!) {
    createImage(input: $input) {
      id
    }
  }
`

const NewImage = () => {
  const { addMessage } = useFlash()
  const [createImage, { loading, error }] = useMutation(CREATE_IMAGE_MUTATION, {
    onCompleted: () => {
      navigate(routes.images())
      addMessage('Image created.', { classes: 'rw-flash-success' })
    },
  })

  const onSave = (input) => {
    createImage({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Image</h2>
      </header>
      <div className="rw-segment-main">
        <FirebaseImageForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewImage