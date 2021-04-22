export type CityData = {
  name: string
  url: string
  repo: string
  maintainer: {
    name: string
    url: string
  }
}

export type CityDictionary = { [name: string]: CityData[] }
