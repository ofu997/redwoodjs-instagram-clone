export const logReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOG_IN':
      console.log('in reducer')
      return {userInfo: action.payload};
    case 'LOG_OUT':
      return {};
    default:
      return state
  }
}