import { type Component, createSignal, Show, onMount } from 'solid-js'
import { useStore } from '@nanostores/solid'

import { $provider, $allApiKeys, $model } from '../store'

type Provider = 'openai' | 'anthropic' | 'groq'

const Settings: Component = () => {
  const [dialog, setDialog] = createSignal(false)
  const [apiKey, setApiKey] = createSignal('')
  const provider = useStore($provider)
  const allApiKeys = useStore($allApiKeys)
  const model = useStore($model)

  const models = {
    'groq': [
      'llama3-70b-8192',
      'llama3-8b-8192',
      'mixtral-8x7b-32768',
      'gemma-7b-it',
    ],
    'together': [],
    'openai': [
      'gpt-3.5-turbo',
      'gpt-4-turbo',
      'gpt-4o'
    ],
    'anthropic': [
      'claude-3-haiku-20240307',
      'claude-3-sonnet-20240229',
      'claude-3-opus-20240229',
    ],
  }

  const save = async () => {
    const keys = { ...allApiKeys() }
    keys[provider() as Provider] = apiKey()
    $allApiKeys.set(keys)

    await chrome.storage?.local.set({
      provider: provider(),
      apiKey: allApiKeys(),
      model: model(),
    })

    setDialog(false)
  }

  const changeProvider = (prv: Provider) => {
    $provider.set(prv)
    $model.set(models[prv][0])
    setApiKey(allApiKeys()[prv])
  }

  const changeApiKey = (key: string) => {
    setApiKey(key)
  }

  onMount(async () => {
    const res = await chrome.storage?.local.get(['provider', 'apiKey', 'model'])
    const prv = res?.provider || provider()
    const keys = res?.apiKey || allApiKeys()
    const mdl = res?.model || model()
    $provider.set(prv)
    $allApiKeys.set(keys)
    $model.set(mdl)
    setApiKey(keys[prv])
  })

  return <div>
    <Show when={dialog()}>
      <div class="bg fixed left-0 right-0 bottom-0 top-0 animate-slide-in-up animate-ease-in-out animate-duration-500 p-8">
        <div class="flex justify-between pb-4">
          <div class="flex">
            <button onClick={[setDialog, false]} class="btn-icon">
              <div class="i-mdi:arrow-left w-6 h-6" />
            </button>
            <div class="text-xl my-a mx-2">
              Settings
            </div>
          </div>
          <button onClick={save} class="btn">
            Save
          </button>
        </div>
        <div class="py-4">
          <label class="text-lg">
            Provider
          </label>
          <select value={provider()} onChange={e => changeProvider(e.target.value as Provider)} class="select my-2">
            <option value="groq">
              Groq
            </option>
            <option disabled hidden value="together">
              Together
            </option>
            <option value="openai">
              OpenAI
            </option>
            <option value="anthropic">
              Anthropic
            </option>
          </select>
        </div>
        <Show when={provider() !== ''}>
          <div class="py-4">
            <label class="text-lg">
              API Key
            </label>
            <input value={apiKey()} onInput={e => changeApiKey(e.target.value)} class="input my-2" />
          </div>
          <div class="py-4">
            <label class="text-lg">
              Model
            </label>
            <select value={model()} onChange={e => $model.set(e.target.value)} class="input my-2">
              {models[provider() as Provider].map(m => <option value={m}>
                {m}
              </option>)}
            </select>
          </div>
        </Show>
      </div>
    </Show>
    <input onClick={[setDialog, true]} readonly id="model" class="input hover:cursor-pointer" value={model()} />
  </div>
}

export default Settings
