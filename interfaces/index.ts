// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type DataType = {
  uuid: string
  name: string
  description: string
  contact: string
  lastVerified: number
}

export type SearchType = DataType & {
  category: string
}
