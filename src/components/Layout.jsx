import React from 'react'
import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'
import { useTranslation } from '../context/LanguageContext'

const Layout = ({ title, children }) => {
  const { t } = useTranslation()
  return (
    <div className="wrap">
      <Head>
        <title>{title || t('title')}</title>
        <meta name="description" content={t('description')} />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Noto+Sans+JP" rel="stylesheet" />
      </Head>
      <Header />
      <div className="children">{children}</div>
      <Footer />
      <style jsx>{`
        .wrap {
          min-height: 100vh;
          display: flex;
          flex-flow: column nowrap;
        }
        .children {
          flex: 1 1 auto;
        }
      `}</style>
    </div>
  )
}
export default Layout
