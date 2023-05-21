const apiUrl = process.env.VUE_APP_API_KEY;

export async function createGame(
  accessToken: string,
  bookingId: number,
  scenarioId: number
) {
  const response = await fetch(`${apiUrl}/games/new-game`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ bookingId, scenarioId }),
  });
  if (response.status === 201) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}

export async function closeGame(acces_token: string, bookingId: number) {
  const response = await fetch(`${apiUrl}/games/close-game`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${acces_token}`,
    },
    body: JSON.stringify({ bookingId }),
  });
  if (response.status === 201) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}

export async function getGameByBookedDateId(accessToken: string, id: number) {
  const response = await fetch(`${apiUrl}/games/game/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}
