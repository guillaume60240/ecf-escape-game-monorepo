export function formatRecord(duration: any) {
  const array = duration.duration.split(':')
  const hours = parseInt(array[0])
  const minutes = parseInt(array[1])
  const seconds = parseInt(array[2])
  return {
    duration: `${hours}h ${minutes}m ${seconds}s`
  }
}

export default { formatRecord }
