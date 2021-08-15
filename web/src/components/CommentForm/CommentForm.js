import {
  Form,
  FormError,
  TextField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { QUERY } from 'src/components/ImagesCell'
import { useState } from 'react'
import { currentUserId } from 'src/functions/WebFunctions'
import { toast } from '@redwoodjs/web/toast'
import jwt from 'jsonwebtoken'

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      body
    }
  }
`

const CommentForm = ({ imageId, userId, user }) => {
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT_MUTATION, {
    onCompleted: () =>
    {},
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onSubmit = () => {
    setContent('');
    currentUserId
      ? (
        jwt.verify(user.jwt, `${process.env.MY_SECRET}`, function(err) {
          if (err) {
            toast.error('Please log in again')
          }
          else {
            createComment({ variables: { input: { imageId, posterId: userId, body: content } } })
          }
        })
      )
      : toast.error('Must be logged in to comment')
  }

  const [content, setContent] = useState('')

  const handleChange = e => {
    setContent(e.target.value)
  }

  return (
    <div>
      <Form className="w-full" onSubmit={onSubmit}>
        <FormError
          error={error}
          titleClassName="font-semibold"
          wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
        />
        <div id='commentform-input-and-button'>
          <TextField
            name='content'
            value={content}
            onChange={handleChange}
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
            id="comment-input"
          />
          <FieldError name="content" className="rw-field-error" />

          <Submit
            disabled={loading}
          >
            <p id='commentButtonText' style={{ color: '#0095f6', padding: 5, border: '1px solid gray', borderRadius: '5%', margin: '5px' }}>
              Comment
            </p>
          </Submit>
        </div>


      </Form>
    </div>
  )
}

export default CommentForm
