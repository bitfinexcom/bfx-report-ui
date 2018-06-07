export function postJsonfetch(url, bodyJson) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyJson)
  })
  .then(response => response.json())
  .catch(error => error)
  .then(data => data);
}

export default {
  postJsonfetch,
}
