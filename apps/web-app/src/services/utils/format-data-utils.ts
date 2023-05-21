export function formatRecord(duration: number) {
  const hours = Math.floor(duration / 3600)
  const minutes = Math.floor((duration - hours * 3600) / 60)
  const seconds = duration - hours * 3600 - minutes * 60

  return {
    duration: `${hours}h ${minutes}m ${seconds}s`
  }
}

export default { formatRecord }
