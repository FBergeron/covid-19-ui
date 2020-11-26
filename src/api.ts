import axios from 'axios'

const baseUrl = process.env.API_URL

interface Region {
  country: string
  language: string
  name: string
  representativeSiteUrl: string
  sources: string[]
  stats: {
    confirmation_today: number
    confirmation_total: number
    death_today: number
    death_total: number
  }
}

export async function fetchNewsByClass(klass, limit, lang) {
  const path = `/classes/${klass}`
  const response = await axios.get(baseUrl + path, {
    params: {
      start: 0,
      limit: limit || 20,
      lang: lang
    }
  })
  return response.data
}

export async function searchNews(lang, query) {
  const path = '/classes/search'
  const response = await axios.get(baseUrl + path, {
    params: {
      start: 0,
      limit: 50,
      lang,
      query
    }
  })
  return response.data
}

export async function searchNewsByRegion(topic, region, lang, query, start) {
  const path = `/classes/search/${region}`
  const response = await axios.get(baseUrl + path, {
    params: {
      start,
      lang,
      query
    }
  })
  return response.data
}

export async function fetchNewsByClassAndCountry(klass, country, offset, limit, lang) {
  const path = `/classes/${klass}/${country}`
  const response = await axios.get(baseUrl + path, {
    params: {
      start: offset,
      limit: limit || 10,
      lang: lang
    }
  })
  return response.data
}

export async function fetchMeta(lang): Promise<{ countries: Region[], topics: string[] }> {
  const path = '/meta'
  const response = await axios.get(baseUrl + path, {
    params: {
      lang: lang
    }
  })
  return response.data
}

export async function modifyRegionCategory(
  url,
  { aboutCovid, useful, hidden, aboutRumor, country, topics },
  notes,
  password
) {
  const path = '/update'
  const data = {
    url: url,
    new_displayed_country: country,
    new_classes: topics,
    is_hidden: hidden,
    is_useful: useful,
    'is_about_COVID-19': aboutCovid,
    is_about_false_rumor: aboutRumor,
    notes: notes,
    password: password
  }
  return axios.post(baseUrl + path, data)
}

export async function fetchHistory(url) {
  const path = '/history'
  const response = await axios.get(baseUrl + path, {
    params: {
      url
    }
  })
  return response.data
}

export function postFeedback(content) {
  const path = '/feedback'
  const data = {
    content
  }
  return axios.post(baseUrl + path, data)
}
