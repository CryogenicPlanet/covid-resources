import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

import { DataType } from '../../interfaces/index'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, category } = req.body

  try {
    const filePath = path.join('_data', `${category}.json`)

    const list = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }))

    const newData: DataType[] = list.data

    const index = newData.findIndex(elm => elm.uuid === id)

    const object: DataType = { ...newData[index], lastVerified: Date.now() }

    newData[index] = object

    const newList = { data: newData }

    fs.writeFileSync(filePath, JSON.stringify(newList))

    res.status(200).send('Ok')
  } catch (err) {
    console.error(err)
    res.status(500).json({ err })
  }
}

export default handler
