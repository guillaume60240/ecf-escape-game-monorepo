const API_URl = `${import.meta.env.VITE_APP_API_KEY}`

export async function getBookedDateForPeriodByScenarioId(scenarioId: string, periodStart: Date) {
  const response = await fetch(
    `${API_URl}/booking?scenarioId=${scenarioId}&date=${periodStart.toISOString()}`,
    {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return response.ok ? await response.json() : null
}
