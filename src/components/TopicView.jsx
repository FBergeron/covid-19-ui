import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import IndicatorLegends from './IndicatorLegends'
import Tabs from './Tabs'
import Row from 'react-bootstrap/Row'
import NewsCard from './NewsCard'
import Stats from './Stats'
import { StoreContext } from '../store'

export const TopicView = ({ selectedTopic, showEditButton, onClickTopic, onClickRegion }) => {
  const [state] = useContext(StoreContext)
  const { topics, countries } = state.meta
  return (
    <Container className="mt-3">
      <IndicatorLegends />
      <Tabs active={selectedTopic} choices={topics} onChange={(idx) => onClickTopic(topics[idx])} />
      <Container>
        <Row className="mt-2">
          {countries.map((c) => (
            <NewsCard
              key={c.country}
              title={c.name}
              countryId={c.country}
              topic={selectedTopic}
              onClickTitle={() => onClickRegion(c.country)}
              showEditButton={showEditButton}
            >
              <div className="text-muted small">
                <Stats stats={c.stats} />
              </div>
            </NewsCard>
          ))}
        </Row>
      </Container>
    </Container>
  )
}
