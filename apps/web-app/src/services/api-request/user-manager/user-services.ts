const API_URl = `${import.meta.env.VITE_APP_API_KEY}`

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URl}/auth/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  console.log(response)
  return response.status === 201 ? await response.json() : null
}

export async function register(email: string, password: string, name: string) {
  const response = await fetch(`${API_URl}/users`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name
    })
  })
  return response.status === 201 ? await response.json() : null
}
