import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { v4 } from 'uuid'

import { DataType } from '../../interfaces/index'
import { getCategoryById } from '../../utils/categories'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { categoryId, name, contact, description } = req.body

  try {
    const category = getCategoryById(categoryId)

    console.log(category)

    const filePath = path.join('_data', `${category.name}.json`)

    const list = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }))

    const newData: DataType[] = list.data

    const newEntry: DataType = {
      uuid: v4(),
      name,
      contact,
      description,
      lastVerified: -1
    }
    newData.push(newEntry)

    const newList = { data: newData }

    fs.writeFileSync(filePath, JSON.stringify(newList))

    res.status(200).send('Ok')
  } catch (err) {
    console.error(err)
    res.status(500).json({ err })
  }
}
export default handler
