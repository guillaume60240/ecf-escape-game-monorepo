const apiUrl = process.env.VUE_APP_API_KEY;

export async function getMe(accessToken: string) {
  const response = await fetch(`${apiUrl}/game-master/me`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 201) {
    const data = await response.json();
    return data;
  } else {
    return false;
  }
}

export async function gameMasterLogin(name: string, password: string) {
  const response = await fetch(`${apiUrl}/game-master-manager/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      password,
    }),
  });
  if (response.status === 201) {
    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data));
    return true;
  } else {
    return false;
  }
}
