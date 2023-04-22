import type { scenarioDto } from '@/dto/scenario.dto'
const API_URl = `${import.meta.env.VITE_APP_API_KEY}`

export async function getAllScenarios(): Promise<scenarioDto[]> {
  console.log('apiUrl', API_URl)
  const response = await fetch(`${API_URl}/scenarios`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) return []
  return await response.json()
}

export default { getAllScenarios }
