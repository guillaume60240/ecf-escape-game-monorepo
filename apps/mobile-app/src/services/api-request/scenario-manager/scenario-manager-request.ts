const apiUrl = process.env.VUE_APP_API_KEY;

export async function getScenarioById(id: number) {
  const response = await fetch(`${apiUrl}/scenarios/${id}`);
  const scenario = await response.json();
  return scenario;
}
