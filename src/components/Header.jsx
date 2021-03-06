import React from 'react'
import Container from 'react-bootstrap/Container'
import Link from 'next/link'

import { useTranslation } from '../context/LanguageContext'

const Header = () => {
  const { t, lang } = useTranslation()
  return (
    <div>
      <div className="bg-info pt-1 pb-1">
        <Container>
          <h3 className="mb-0">
            <Link href="/[lang]/" as={`/${lang}/`}>
              <a className="text-white">{t('title')}</a>
            </Link>
          </h3>
          <div className="small mt-0 text-white">
            <a href="http://nlp.ist.i.kyoto-u.ac.jp/" className="text-white">
              {t('lab_kurohashi')}
            </a>
            ,{' '}
            <a href="http://nlp-waseda.jp/" className="text-white">
              {t('lab_kawahara')}
            </a>
            ,{' '}
            <a href="http://www.tkl.iis.u-tokyo.ac.jp/new/" className="text-white">
              {t('lab_kitsuregawa')}
            </a>
            ,{' '}
            <a href="https://mynlp.is.s.u-tokyo.ac.jp/ja/index" className="text-white">
              {t('lab_miyao')}
            </a>
            ,{' '}
            <a href="http://www-al.nii.ac.jp/ja/" className="text-white">
              {t('lab_aizawa')}
            </a>
            ,{' '}
            <a href="https://www.nlp.ecei.tohoku.ac.jp/" className="text-white">
              {t('lab_inui')}
            </a>
            ,{' '}
            <a href="http://fusioncomplab.org/" className="text-white">
              {t('lab_morishima')}
            </a>
            .{' '}
            <a href="https://mt-auto-minhon-mlt.ucri.jgn-x.jp" className="text-white">
              Powered by みんなの自動翻訳 (NICT).
            </a>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Header
