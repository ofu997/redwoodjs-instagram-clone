import {
  Form,
  FormError,
  Label,
  TextField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { QUERY } from 'src/components/ImagesCell'
import { useState } from 'react'

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      body
    }
  }
`

const CommentForm = ({ imageId, userId }) => {
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT_MUTATION, {
    onCompleted: () =>
    {},
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onSubmit = () => {
    setBody('')
    createComment({ variables: { input: { imageId, posterId: userId, body } } })
  }

  const [body, setBody] = useState('')

  const handleChange = e => {
    setBody(e.target.value)
  }

  return (
    <div>
      <Form className="mt-4 w-full" onSubmit={onSubmit}>
        <FormError
          error={error}
          titleClassName="font-semibold"
          wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
        />

        {/* <TextField
          name="body"
          validation={{ required: true }}
          placeholder="Comment"
        /> */}

        <input name='body' value={body} onChange={handleChange} />
        <Submit
          disabled={loading}
        >
          <p style={{ backgroundColor: 'gray', color: 'white', padding: 5, fontSize: '0.9rem' }}>
            Comment
          </p>
        </Submit>


      </Form>
    </div>
  )
}

export default CommentForm
