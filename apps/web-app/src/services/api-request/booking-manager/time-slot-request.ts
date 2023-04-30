const API_URl = `${import.meta.env.VITE_APP_API_KEY}`

export async function getAllTimeSlot() {
  const response = await fetch(`${API_URl}/time-slot`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.ok ? await response.json() : []
}

export default { getAllTimeSlot }
