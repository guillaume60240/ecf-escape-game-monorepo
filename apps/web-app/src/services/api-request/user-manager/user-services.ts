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
  return response.status === 201 ? response.json() : null
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
  return response.status === 201 ? response.json() : null
}

export async function getMe(token: string, id: number, email: string, name: string) {
  const response = await fetch(`${API_URl}/users/me`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      id: +id,
      name: name,
      email: email
    })
  })
  return response.status === 201 ? true : false
}
