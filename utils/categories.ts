const categories = [
  { id: 0, name: 'remdesivir' },
  { id: 1, name: 'beds' },
  { id: 2, name: 'plasma' },
  { id: 3, name: 'ventilator' },
  { id: 4, name: 'oxygen' },
  { id: 5, name: 'other' }
]

const getCategoryById = (id: number) => {
  const arr = categories.filter(elm => elm.id === id)
  return arr[0]
}

export { categories, getCategoryById }
