/* This example requires Tailwind CSS v2.0+ */
import Fuse from 'fuse.js'
import { GetServerSideProps } from 'next'
import React from 'react'

import beds from '../../_data/beds.json'
import other from '../../_data/other.json'
import oxygen from '../../_data/oxygen.json'
import plasma from '../../_data/plasma.json'
import remdesivir from '../../_data/remdesivir.json'
import ventilators from '../../_data/ventilator.json'
import Layout from '../../components/Layout'
import { SearchType } from '../../interfaces/index'
import handleVerify from '../../utils/handleVerify'

export default function Resources({
  id,
  query
}: {
  id: string
  query: Fuse.FuseResult<SearchType>[]
}) {
  return (
    <Layout title={`Search results for ${id}`}>
      <div className="flex flex-col items-center h-screen">
        {query.length > 0 ? (
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
                        Category
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
                    {query.map(elm => {
                      const { item } = elm

                      const date = new Date(item.lastVerified)

                      const lastVerified =
                        item.lastVerified === -1
                          ? 'Unverfied'
                          : date.toDateString()

                      return (
                        <tr key={item.name}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-6  py-4 whitespace-nowrap text-sm text-gray-500 capitalize font-semibold">
                            {item.category}
                          </td>
                          <td className="px-6 py-4 max-w-3xl leading-relaxed break-words text-sm text-gray-500">
                            {item.description}
                          </td>
                          <td className="px-6 py-4 max-w-3xl leading-relaxed break-words text-sm text-gray-500">
                            {item.contact}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {lastVerified}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => {
                                handleVerify(item.uuid, item.category)
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
        ) : (
          <div className="flex flex-col items-center space-y-5 overflow-hidden h-full">
            <div className="max-w-3xl">
              <img
                width="100%"
                height="auto"
                src="/images/undraw_page_not_found_su7k.svg"
                alt="not found"></img>
            </div>
            <p className="text-7xl">No results found for {id}</p>
          </div>
        )}
      </div>
    </Layout>
  )
}

const addCategory = (list: any[], category: string) => {
  if (list.length > 0) {
    return list.map((elm: any) => {
      return { ...elm, category }
    })
  } else {
    return []
  }
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { params } = ctx
  const id = params?.id

  if (typeof id !== 'string') throw new Error('Invalid search param')

  const fullList = [
    ...addCategory(other.data, 'other'),
    ...addCategory(oxygen.data, 'oxygen'),
    ...addCategory(beds.data, 'beds'),
    ...addCategory(remdesivir.data, 'remdesivir'),
    ...addCategory(plasma.data, 'plasma'),
    ...addCategory(ventilators.data, 'ventilators')
  ]
  const fuse = new Fuse(fullList, {
    includeScore: true,
    shouldSort: true,
    isCaseSensitive: true,
    threshold: 0.4,
    ignoreLocation: true,
    keys: ['name', 'description', 'contact', 'category']
  })

  const query = fuse.search(id)
  console.log(query)

  return { props: { id: id, query: query } }
}
