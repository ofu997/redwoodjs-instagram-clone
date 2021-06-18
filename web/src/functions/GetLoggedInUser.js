export const getLoggedInUser = () => localStorage.getItem('user')?
  JSON.parse(localStorage.getItem('user'))
  : []
