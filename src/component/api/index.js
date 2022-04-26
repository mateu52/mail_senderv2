

const API_URL='https://api.airtable.com/v0/appNxuSuA6IZuPplU';

function request( endpoint, method = 'GET', data = null) {
  const config = {
    method,
    headers:{
      'Content-type': 'application/json',
      'Authorization': 'Bearer keyJxKtkjhdCwnP17'
    }
  };
  if (method==='POST'|| method==='PATH'){
    config.body = JSON.stringify(data);
  }
  const url = `${API_URL}${endpoint}`;

  return fetch(url, config)
          .then(response => {
            return response.json();
          })
          .catch(error => console.log(error))
}

function get(endpoint)  {
  return request(endpoint);
}
function post(endpoint, data) {
  return request(endpoint, 'POST', data);
}
function patch(endpoint, data) {
  return request(endpoint, 'PATCH', data);
}
function _delete(endpoint) {
  return request(endpoint, 'DELETE');
}

export default {
  get,
  post,
  patch,
  delete: _delete
};