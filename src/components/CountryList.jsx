import React, { useState, useEffect, useMemo, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { fetchNewsByClass, fetchNewsByClassAndCountry, fetchMeta } from '../api';
import Country from './Country';
import TopicList from './TopicList';
import Loading from './Loading';
import IndicatorLegends from './IndicatorLegends';
import { MetaContext } from '../store/meta';

const CountryList = () => {
  const [meta] = useContext(MetaContext);
  const [news, setNews] = useState({});
  const [selectedTopic, setSelectedTopic] = useState('');
  
  // { [country]: { loading: boolean, noMore: { [topic]: boolean } } }
  const [countriesFetchState, setCountriesFetchedState] = useState({});

  // computed value: filter news by currently selected class.
  const filteredNews = useMemo(() => {
    return news[selectedTopic] || {};
  }, [news, selectedTopic]);

  function setLoading(country, bool) {
    setCountriesFetchedState(prev => ({
      ...prev,
      [country]: {
        ...prev[country],
        loading: bool
      }
    }))
  }

  function setNewsByTopic(newNews, topic) {
    setNews(prevNews => {
      return {
        ...prevNews,
        [topic]: newNews
      }
    })
  }

  function addNewsByTopicAndCountry(newEntries, topic, country) {
    setNews(prevNews => {
      const prevEntries = prevNews[topic]?.[country] || [];
      return {
        ...prevNews,
        [topic]: {
          ...prevNews[topic],
          [country]: [...prevEntries, ...newEntries]
        }
      }
    })
  }

  function setNoMoreNews(country, topic) {
    setCountriesFetchedState(prev => {
      let newCountryState = {
        loading: false,
        noMore: {}
      }
      if (prev[country]) {
        newCountryState = {...prev[country]}
      }
      newCountryState.noMore = {
        ...newCountryState.noMore,
        [topic]: true
      }
      return {
        ...prev,
        [country]: newCountryState
      }
    })
  }

  function setAllCountriesLoading(bool) {
    setCountriesFetchedState(prev => {
      let newState = {...prev};
      for (const country of Object.keys(prev)) {
        newState[country] = {
          ...newState[country],
          loading: bool
        }
      }
      return newState;
    })
  }

  async function initialLoad() {
    if (!meta.loaded) {
      return
    }
    const { topics, countries } = meta.data
    const firstTopic = topics[0];
    setSelectedTopic(firstTopic);
    const firstTopicNews = await fetchNewsByClass(firstTopic, 20);
    for (const c of countries) {
      const country = c.country
      if (!firstTopicNews[country] || firstTopicNews[country].length < 20) {
        setNoMoreNews(country, firstTopic);
      }
    }
    setNews({[firstTopic]: firstTopicNews});
    const topicsNum = topics.length;
    // fetch other topic news
    const otherClassNews = await Promise.all(topics.slice(1, topicsNum).map(c => fetchNewsByClass(c, 20)));
    otherClassNews.forEach((e, i) => {
      const topic = topics[i + 1];
      for (const c of countries) {
        const country = c.country;
        if (!e[country] || e[country].length < 20) {
          setNoMoreNews(country, topic);
        }
      }
      setNewsByTopic(e, topic);
    })
    setAllCountriesLoading(false);
  }

  async function loadMore(c) {
    const topic = selectedTopic;
    if (countriesFetchState[c]?.loading || countriesFetchState[c]?.noMore?.[topic]) {
      return;
    }
    setLoading(c, true);
    const offset = filteredNews[c] ? filteredNews[c].length : 0;
    const limit = 20;
    const newEntries = await fetchNewsByClassAndCountry(topic, c, offset, limit);
    if (newEntries.length < limit) {
      setNoMoreNews(c, topic)
    }
    addNewsByTopicAndCountry(newEntries, topic, c);
    setLoading(c, false);
  }

    // Run only ones
    useEffect(() => {
      initialLoad();
    }, [meta.loaded]);  

  if (!meta.loaded) {
    return (
      <Container className="mt-3 text-center">
        <Loading />
      </Container>
    )
  };

  return (
    <Container className="mt-3">
      <TopicList selectedTopic={selectedTopic} topics={meta.data.topics} changeTopic={setSelectedTopic} />
      <IndicatorLegends />
      <Container>
        <Row>
          {meta.data.countries.map((c) => (
            <Country
              key={c.country}
              stats={c.stats}
              title={c.name.ja}
              url={c.representativeSiteUrl}
              loading={countriesFetchState[c.country]?.loading}
              entries={filteredNews[c.country] || []}
              topic={selectedTopic}
              loadMore={() => loadMore(c.country)}
            />
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default CountryList;
