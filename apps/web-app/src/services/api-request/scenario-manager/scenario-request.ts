import type { scenarioDto } from '@/dto/scenario.dto'
const API_URl = `${import.meta.env.VITE_APP_API_KEY}`

export async function getAllScenarios(): Promise<scenarioDto[]> {
  const response = await fetch(`${API_URl}/scenarios`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) return []
  return response.json()
}

export async function getOneScenarioById(id: number): Promise<scenarioDto> {
  const response = await fetch(`${API_URl}/scenarios/${id}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) throw new Error('Scenario not found')
  return response.json()
}

export default { getAllScenarios, getOneScenarioById }
