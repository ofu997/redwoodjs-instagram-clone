import { createStore, combineReducers } from 'redux'
import { logReducer } from './reducers/logReducer'

const reducer = combineReducers({
  logReducer
})

let store = createStore(reducer)

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },

}

export default store

// const login = () => {
//   return {
//     type: 'LOGIN'
//   }
// }

// const logInOrOut = (state = {}, action) => {
//   switch (action.type) {
//     case 'LOG_IN':
//       return {};
//     case 'LOG_OUT':
//       return {};
//   }
// }

