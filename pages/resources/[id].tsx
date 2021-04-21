/* This example requires Tailwind CSS v2.0+ */
import fs from 'fs'
import { GetServerSideProps } from 'next'
import path from 'path'
import React from 'react'

import Layout from '../../components/Layout'
import { DataType } from '../../interfaces/index'
import handleVerify from '../../utils/handleVerify'

export default function Resources({
  id,
  list
}: {
  id: string
  list: { data: DataType[] }
}) {
  const { data } = list
  return (
    <Layout title={`${id} Resources`}>
      <div className="flex flex-col items-center h-screen">
        <div className="max-w-7xl w-full -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Verified
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.length > 0 &&
                    data.map(elm => {
                      const date = new Date(elm.lastVerified)

                      const lastVerified =
                        elm.lastVerified === -1
                          ? 'Unverfied'
                          : date.toDateString()

                      return (
                        <tr key={elm.name}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {elm.name}
                          </td>
                          <td className="px-6 py-4 max-w-3xl leading-relaxed break-words text-sm text-gray-500">
                            {elm.description}
                          </td>
                          <td className="px-6 py-4 max-w-3xl leading-relaxed break-words text-sm text-gray-500">
                            {elm.contact}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {lastVerified}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => {
                                handleVerify(elm.uuid, id)
                              }}
                              className="text-indigo-600 flex items-center justify-center hover:text-indigo-900">
                              <span className="text-green-500 px-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </span>
                              Verify
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { params } = ctx
  const id = params?.id
  try {
    if (typeof id === 'string') {
      const filePath = path.join('_data', `${id}.json`)

      const list = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }))

      return { props: { id: id, list: list } }
    } else {
      throw new Error('Invalid Resource')
    }
  } catch (err) {
    return { redirect: '/404', props: {} }
  }
}
