const apiUrl = process.env.VUE_APP_API_KEY;

export async function getBookingWithUser(accessToken: string, date: string) {
  const response = await fetch(
    `${apiUrl}/booking/booked-date-with-user?date=${date}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}

export async function getTimeSlot() {
  const response = await fetch(`${apiUrl}/time-slot`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}

export async function getBookedDateById(accessToken: string, id: number) {
  const response = await fetch(`${apiUrl}/booking/booked-date/${id}`, {
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
