import React, { useState, useEffect, useMemo, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import NewsCard from './NewsCard';
import Tabs from './Tabs';
import Loading from './Loading';
import IndicatorLegends from './IndicatorLegends';
import { StoreContext } from '../store';
import Stats from './Stats';
import meta from '../meta'

const NewsView = () => {
  const [state] = useContext(StoreContext);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  function handleClickTopic(topic) {
    location.hash = `#t/${topic}`
  }

  function handleClickCountry(country) {
    location.hash = `#r/${country}`
  }

  function handleHashChange() {
    if (!state.metaLoaded) {
      return
    }
    const { topics, countries } = state.meta
    const slugs = decodeURIComponent(location.hash).slice(1).split('/')
    switch (slugs[0]) {
      case 'r': {
        if (!countries.find(c => c.country === slugs[1])) {
          break
        }
        setSelectedTopic(null)
        setSelectedCountry(slugs[1])
        break
      }
      case 't': {
        if (!topics.includes(slugs[1])) {
          break
        }
        setSelectedCountry(null)
        setSelectedTopic(slugs[1])
        break
      }
    }
  }

  // set initial selected topic
  useEffect(() => {
    if (state.metaLoaded) {
      setSelectedTopic(state.meta.topics[0])
      handleHashChange()
    }
  }, [state.metaLoaded])

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (!state.metaLoaded || (!selectedTopic && !selectedCountry)) {
    return (
      <Container className="mt-3 text-center">
        <Loading />
      </Container>
    )
  };

  const { topics, countries } = state.meta

  if (selectedCountry) {
    const selectedCountryData = countries.find(c => c.country === selectedCountry)
    const selectedCountryName = selectedCountryData.name.ja
    const countryNames = countries.map(c => c.name.ja)
    const sources = meta.regions[selectedCountry]
    return (
      <Container className="mt-3" id="news-view">
        <IndicatorLegends />
        <Tabs active={selectedCountryName} choices={countryNames} onChange={(idx) => handleClickCountry(countries[idx].country)} />
        <Container>
          <Row className="mt-2">
            <div className="country-names">
              <div className="stats text-muted">{selectedCountryName}: <Stats stats={selectedCountryData.stats} /></div>
              <div className="public-link small">
                <a href={selectedCountryData.representativeSiteUrl} target="_blank" rel="noopener">公的機関のウェブサイトを確認する</a>
              </div>
            </div>
          </Row>
          <Row className="mt-2">
            {topics.map((t) => (
              <NewsCard
                key={t}
                title={t}
                countryId={selectedCountry}
                topic={t}
                onClickTitle={() => handleClickTopic(t)}
              />
            ))}
          </Row>
          <Row className="mt-2">
            <h4>情報源のサイト</h4>
          </Row>
          <Row>
            <div>
              {sources.map((url, i) => (
                <div key={i}><a href={url} target="_blank" rel="noopener">{url}</a></div>
              ))}
            </div>
          </Row>
        </Container>
        <style jsx>{`
          .country-names {
            display: flex;
            align-items: flex-end;
          }
          h2 {
            margin: 0;
          }
          .stats, .public-link {
            margin: 0 10px;
          }
        `}</style>
      </Container>
    )
  }

  return (
    <Container className="mt-3" id="news-view">
      <IndicatorLegends />
      <Tabs active={selectedTopic} choices={topics} onChange={(idx) => handleClickTopic(topics[idx])} />
      <Container>
        <Row className="mt-2">
          {countries.map((c) => (
            <NewsCard
              key={c.country}
              title={c.name.ja}
              countryId={c.country}
              topic={selectedTopic}
              onClickTitle={() => handleClickCountry(c.country)}
            >
              <div className="text-muted small"><Stats stats={c.stats} /></div>
            </NewsCard>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default NewsView;
