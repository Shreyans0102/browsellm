import { atom } from 'nanostores'

export const $provider = atom('groq')
export const $allApiKeys = atom({
  groq: '',
  together: '',
  openai: '',
  anthropic: '',
})
export const $model = atom('llama3-70b-8192')
