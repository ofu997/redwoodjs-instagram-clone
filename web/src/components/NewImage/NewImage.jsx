import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import NewImageForm from 'src/components/NewImageForm/NewImageForm'
import { getLoggedInUser } from 'src/functions/WebFunctions'

const CREATE_IMAGE_MUTATION = gql`
  mutation CreateImageMutation($input: CreateImageInput!) {
    createImage(input: $input) {
      id
    }
  }
`

const NewImage = () => {
  const user = getLoggedInUser()
  const userId = user.id

  const [createImage, { loading, error }] = useMutation(CREATE_IMAGE_MUTATION, {
    onCompleted: () => {
      navigate(routes.images())
      toast.success('Memo created.', { classes: 'rw-flash-success' })
    },
  })

  const onSave = (input) => {
    createImage({ variables: { input: { ...input, userId } } })
  }

  return (
    <div className="rw-segment margin-new-or-edit-image-component">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Memo</h2>
      </header>
      <div className="rw-segment-main">
        <NewImageForm
          onSave={onSave}
          loading={loading}
          error={error}
          userId={userId}
        />
      </div>
    </div>
  )
}

export default NewImage
