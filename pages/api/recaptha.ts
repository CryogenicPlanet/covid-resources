import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.query.token

  console.log(token, process.env.CAPTCHA_SECRET)

  try {
    const params = {
      secret: process.env.CAPTCHA_SECRET,
      response: token
    }
    const inputData = Object.keys(params)
      // @ts-ignore
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .join('&')

    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      inputData,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    )
    const { data } = response
    console.log(data)

    res.status(200).json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ err })
  }
}

export default handler
