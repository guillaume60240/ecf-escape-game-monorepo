const API_URl = `${import.meta.env.VITE_APP_API_KEY}`

export async function getBookedDateForPeriodByScenarioId(scenarioId: number, periodStart: Date) {
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
  return response.ok ? response.json() : null
}

export async function bookNewDate(
  date: Date,
  timeSlot: string,
  players: number,
  price: number,
  userId: number,
  scenarioId: number,
  jwt: string
) {
  const response = await fetch(`${API_URl}/booking/new-booking`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`
    },
    body: JSON.stringify({
      startDate: date.toISOString(),
      timeSlot,
      players,
      price,
      scenarioId,
      userId
    })
  })
  return response.status
}

export async function getBookedDateByUserId(userId: number, jwt: string) {
  const response = await fetch(`${API_URl}/booking/booked-date/user/${userId}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`
    }
  })
  return response.ok ? response.json() : null
}

export async function deleteBookedDateByUserId(bookingId: number, jwt: string) {
  /* const response = await fetch(`${API_URl}/booking/${bookingId}`, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`
    }
  })
  return response.status */
  console.log('deleteBookedDateByUserId', bookingId, jwt)
}
