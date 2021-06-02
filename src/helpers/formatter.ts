export const formatCurrencyWithPlaces = (number = 0, place = 2): string => {
  if (number === 0) return '-- --'
  const val = number.toFixed(place)
  // val = val.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  const arr = val.split('.')
  arr[0] = arr[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  return '$' + arr.join('.')
}
