export const getLoggedInUser = () => localStorage.getItem('user')?
  JSON.parse(localStorage.getItem('user'))
  : []

export const dummyObject = { error: null, data: null };

export const currentUser = getLoggedInUser(); 

export const currentUserId = getLoggedInUser().id; 