import type { PricesDto } from '@/dto/prices.dto'

const API_URl = `${import.meta.env.VITE_APP_API_KEY}`

export async function getPrices(): Promise<PricesDto[]> {
  const response = await fetch(`${API_URl}/prices`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache'
  })
  return response.ok ? response.json() : []
}
