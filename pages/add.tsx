import { view } from '@risingstack/react-easy-state'
import axios from 'axios'
import Router from 'next/router'
import React, { FormEvent } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import toast from 'react-hot-toast'

import Layout from '../components/Layout'
import Select from '../components/Select'
import { categories } from '../utils/categories'
import { newResource, selectedStore } from '../utils/store'

function NewResource() {
  const recaptchaRef = React.createRef()

  const formRef = React.createRef<HTMLFormElement>()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // @ts-ignore
    const recaptchaValue = recaptchaRef.current.getValue()

    try {
      const { data } = await axios.get(`/api/recaptha?token=${recaptchaValue}`)

      const { success } = data

      console.log(data)

      if (success) {
        toast.promise(
          axios.post('/api/addResource', {
            ...newResource,
            categoryId: selectedStore.id
          }),
          {
            loading: ' Adding resource',
            success: () => {
              formRef.current?.reset()
              return 'Added resource'
            },
            error: () => {
              // @ts-ignore
              recaptchaRef.current.reset()

              return 'Failed to add resource'
            }
          }
        )
        Router.reload()
      } else {
        throw new Error('Invalid captcha')
      }
    } catch (err) {
      // @ts-ignore
      recaptchaRef.current.reset()
      toast.error('Invalid captcha')
    }
  }

  return (
    <Layout title="Add Resource">
      <div className="flex justify-center">
        <div className="max-w-7xl py-10">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Add resources
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  This is a simple way to add resources. if you want to mass add
                  resources reach out to{' '}
                  <a
                    className="text-indigo-800"
                    href="https://twitter.com/CryogenicPlanet">
                    @CyrogenicPlanet
                  </a>{' '}
                  on Twitter
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Name"
                            value={newResource.name}
                            onChange={e => {
                              newResource.name = e.target.value
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="about"
                          name="about"
                          rows={3}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Resource description"
                          value={newResource.description}
                          onChange={e => {
                            newResource.description = e.target.value
                          }}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description of the added resource
                      </p>
                    </div>
                    <div>
                      <div className="mt-1 flex items-center w-full">
                        <Select
                          label={'Category'}
                          // @ts-ignore
                          data={categories}></Select>
                      </div>
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="contact"
                        className="block text-sm font-medium text-gray-700">
                        Contact
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="contact"
                          id="contact"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Contact Info"
                          value={newResource.contact}
                          onChange={e => {
                            newResource.contact = e.target.value
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <ReCAPTCHA
                        // @ts-ignore
                        ref={recaptchaRef}
                        sitekey={
                          process.env.NEXT_PUBLIC_CAPTHA_SITE_KEY || ''
                        }></ReCAPTCHA>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default view(NewResource)
