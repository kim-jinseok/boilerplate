import axios from 'axios'


export const userService = {
  login,
  logout
};

function login(user_id, user_pw) {
 
  return axios.post(`/api/auth/login`, { user_id, user_pw })
    .then(handleResponse);
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('accessToken')

}

function handleResponse(result) {


  if (result.data === "") {
      // auto logout if 401 response returned from api
      return null;
  }
 
  localStorage.accessToken = result.data;

  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.accessToken}`;
  return result.data;
 
}
