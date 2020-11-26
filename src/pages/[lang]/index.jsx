import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Layout from '@src/components/Layout'
import Description from '@src/components/Description'
import Map from '@src/components/Map'
import NewsView from '@src/components/NewsView'
import { useTranslation } from '@src/context/LanguageContext'
import { fetchMeta, loadAllTopicsNews, StoreContext } from '@src/store'
import { FeedbackToast } from '@src/components/FeedbackToast'

import { languagePaths } from '../../utils'

const Index = () => {
  const { t, lang } = useTranslation()
  const [state, dispatch] = useContext(StoreContext)
  const [showToast, setShowToast] = useState(false)
  useEffect(() => {
    if (!state.metaLoaded) {
      dispatch(fetchMeta(lang))
    }
    if (state.metaLoaded) {
      dispatch(loadAllTopicsNews(lang))
    }
  }, [state.metaLoaded])
  useEffect(() => {
    const threshold = 0.2
    if (state.metaLoaded && Math.random() < threshold) {
      setTimeout(() => {
        setShowToast(true)
      }, 10000)
    }
  }, [state.metaLoaded])
  return (
    <Layout>
      <FeedbackToast show={showToast} onClose={() => setShowToast(false)} />
      <Description />
      <Map />
      <NewsView />
      <Container>
        <div className="small text-right">
          <a className="text-muted" href="./../edit/">
            {t('編集')}
          </a>
        </div>
      </Container>
    </Layout>
  )
}

export async function getStaticProps(ctx) {
  const { lang } = ctx.params
  return {
    props: {
      lang
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: languagePaths,
    fallback: false
  }
}

export default Index
