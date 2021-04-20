import { store } from '@risingstack/react-easy-state'

const selectedStore = store({
  id: 0
})

const newResource = store({
  name: '',
  description: '',
  contact: ''
})

export { newResource, selectedStore }
