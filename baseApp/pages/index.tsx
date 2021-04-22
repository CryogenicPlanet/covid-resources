/* This example requires Tailwind CSS v2.0+ */
import Footer from '@components/Footer'
import { getCityDataAsDictionary, getCityDataByLetter } from '@data/dataUtils'
import { CityDictionary } from '@interfaces/index'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React from 'react'

export default function Index({ dictionary }: { dictionary: CityDictionary }) {
  return (
    <>
      <Head>
        <title>Covid Resources | Home</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col  w-full justify-center items-center py-5 space-y-5">
        <div className="flex flex-col">
          <p className="text-3xl font-bold text-center">
            List of all current cities
          </p>
          <p className="text-lg text-center">
            Learn how to add other cities at the bottom
          </p>
        </div>
        <div className="max-w-3xl w-full">
          <nav className="h-full w-full overflow-y-auto" aria-label="Directory">
            {Object.keys(dictionary).map(letter => (
              <div key={letter} className="relative">
                <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                  <h3>{letter}</h3>
                </div>
                <ul className="relative z-0 divide-y divide-gray-200">
                  {/* @ts-ignore */}
                  {dictionary[letter].map(city => (
                    <li key={city.name} className="bg-white">
                      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                        <div className="flex-1 min-w-0">
                          <a href={city.url} className="focus:outline-none">
                            <p className="text-sm font-medium text-gray-900">
                              {city.name}
                            </p>
                          </a>
                          <p className="text-sm text-gray-500 truncate ">
                            Maintained By{' '}
                            <a
                              href={city.maintainer.url}
                              className="text-indigo-500 z-40">
                              {city.maintainer.name}
                            </a>
                          </p>
                        </div>
                        <a href={city.repo}>
                          <div className="flex-shrink-0">
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 128 128">
                              <g fill="#181616">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"></path>
                                <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm-.743-.55M28.93 94.535c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zm-.575-.618M31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm0 0M34.573 101.373c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm0 0M39.073 103.324c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm0 0M44.016 103.685c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm0 0M48.614 102.903c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path>
                              </g>
                            </svg>
                          </div>
                        </a>

                        <a href={city.url}>
                          <div className="flex-shrink-0">
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
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </div>
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const host = ctx.req.headers.host

  const subdomain = host?.split('.').shift()?.toUpperCase()

  const cityDict = getCityDataAsDictionary()

  if (subdomain && subdomain in cityDict) {
    console.log('REDIRECT!')
    return {
      redirect: {
        destination: cityDict[subdomain].url,
        permanent: true
      }
    }
  }

  const dictionary = getCityDataByLetter()

  return {
    props: {
      dictionary
    }
  }
}
