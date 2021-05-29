import { useDispatch, useSelector } from 'react-redux'

export const login = (data) => {
  const dispatch = useDispatch()

  const mydata = {user: 'i am redux', email: data.email, password: data.password}

  dispatch({
    type: 'LOG_IN',
    payload: my
  })

  localStorage.setItem('userInfo', JSON.stringify(data))
}