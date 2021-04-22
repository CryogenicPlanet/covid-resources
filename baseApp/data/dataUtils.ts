import { CityData, CityDictionary } from '@interfaces/index'

import { cityData } from './cityData'

const getCityDataByLetter = () => {
  const letters: CityDictionary = {}

  for (const city of cityData) {
    const { name } = city
    const letter = name.slice(0, 1).toUpperCase()

    if (letter in letters) {
      letters[letter].push(city)
    } else {
      letters[letter] = [city]
    }
  }
  return letters
}

const getCityDataAsDictionary = () => {
  const dict: { [name: string]: CityData } = {}

  const sortedCityData = cityData.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })

  for (const city of sortedCityData) {
    const name = city.name.toUpperCase()

    if (name in dict) {
      throw new Error('Duplicate city names')
    } else {
      dict[name] = city
    }
  }
  return dict
}

export { getCityDataAsDictionary, getCityDataByLetter }
