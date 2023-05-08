const API_URl = `${import.meta.env.VITE_APP_API_KEY}`

export async function getAllFaq() {
  const response = await fetch(`${API_URl}/faq`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.ok ? response.json() : null
}
