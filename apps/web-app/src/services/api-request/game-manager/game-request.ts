const API_URl = `${import.meta.env.VITE_APP_API_KEY}`

export async function getRecordByscenarioId(id: string) {
  const response = await fetch(`${API_URl}/games/record/${id}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.ok ? await response.json() : null
}
