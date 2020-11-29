import { localeList } from './translations'

export function makeTranslatedUrl(url, lang) {
  return `https://translate.google.com/translate?tl=${lang}&u=${escape(url)}`
}

export const languagePaths = localeList.map((lang) => ({ params: { lang } }))
