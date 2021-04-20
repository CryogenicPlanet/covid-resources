import Layout from '@components/Layout'
import Link from 'next/link'
import React from 'react'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <p className="text-3xl">Hello Next.js 👋</p>
    <p>
      <Link passHref href="/about">
        <a className="text-[13px] font-bold">About</a>
      </Link>
    </p>
  </Layout>
)

export default IndexPage
