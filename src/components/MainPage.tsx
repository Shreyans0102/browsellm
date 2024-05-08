import { Show, createSignal, type Component } from 'solid-js'

import Settings from './Settings'
import { injectCode, request } from '../helpers'

const MainPage: Component = () => {
  const [prompt, setPrompt] = createSignal('')
  const [isLoading, setIsLoading] = createSignal(false)
  const [response, setReponse] = createSignal('')

  const go = async () => {
    try {
      setIsLoading(true)
      
      const res = await request(prompt()) as string
      setReponse(res as string)

      const code = res.split('--------------------')[1]
      await injectCode(code)
    } catch (error) {
      if (error instanceof Error) {
        setReponse(error.message)
      } else {
        setReponse(JSON.stringify(error))
      }
    } finally {
      setIsLoading(false)
    }
  }
  
  return <div>
    <div>
      <div class="text-center text-4xl">BrowseLLM</div>
      <div class="text-center py-4">
        <div class="py-2">
          Welcome!
        </div>
        <div>
          How can I help you today?
        </div>
      </div>
      <div class="flex text-center py-4">
        <input onInput={e => setPrompt(e.target.value)} value={prompt()} disabled={isLoading()} type="text" class="input w-[calc(100%-4rem)]" placeholder="Write your initial prompt here..." />
        <button disabled={isLoading()} onClick={go} class="w-14 h-14 ml-2 btn">
          <Show when={!isLoading()} fallback={<div class="i-mdi:loading animate-spin ma text-2xl" />}>
            <div class="i-mdi:arrow-down ma text-2xl" />
          </Show>
        </button>
      </div>
    </div>
      <div class="py-4">
        <hr />
      </div>
      <div class="py-4">
        <code id="code">
          {response()}
        </code>
      </div>
      <div class="fixed bottom-4 left-4 right-4">
        <Settings />
      </div>
    </div>
}

export default MainPage
