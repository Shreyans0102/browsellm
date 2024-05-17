import { Show, createSignal, type Component } from 'solid-js'

import Settings from './Settings'
import { injectCode, request, solveCaptcha } from '../helpers'

const MainPage: Component = () => {
  const [prompt, setPrompt] = createSignal('')
  const [isLoading, setIsLoading] = createSignal(false)
  const [isCaptchaLoading, setIsCaptchaLoading] = createSignal(false)
  const [response, setResponse] = createSignal('')
  
  const go = async () => {
    try {
      setIsLoading(true)
      
      const str = await request(prompt()) as string
      
      console.log(str)

      const firstCurlyIndex = str.indexOf('{')
      const lastCurlyIndex = str.lastIndexOf('}')

      if (firstCurlyIndex === -1 || lastCurlyIndex === -1) {
        throw new Error('LLM did not send proper JSON response.')
      }

      const res = JSON.parse(str.slice(firstCurlyIndex, lastCurlyIndex + 1))
      
      if (res.type === 'output') {
        setResponse(res.content as string)
      } else if (res.type === 'action') {
        setResponse(res.content.map((action: any, index: number) => {
          const llmIndex = action.llmIndex ?? action['llm-index']

          if (action.type === 'click') {
            return `${index + 1}. Click on <${llmIndex}>`
          } else if (action.type === 'input') {
            return `${index + 1}. Type "${action.text}" inside <${llmIndex}>`
          }
        }).join(' | '))

        for (const action of res.content) {
          const llmIndex = action.llmIndex ?? action['llm-index']

          const selector = `[llm-index="${llmIndex}"]`
          
          if (action.type === 'click') {
            const code = `
              const el = document.querySelector('${selector}')
              el.click()
            `
            
            await injectCode(code)
          } else if (action.type === 'input') {
            const code = `
              const el = document.querySelector('${selector}')

              if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
                el.value = '${action.text}'
              } else {
                el.innerHTML = '${action.text}'
              }
            `

            await injectCode(code)
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setResponse(v => v + '\n\n' + error.message)
      } else {
        setResponse(v => v + '\n\n' + JSON.stringify(error))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const solve = async () => {
    try {
      setIsCaptchaLoading(true)
      
      await solveCaptcha()
    } catch (error) {
      if (error instanceof Error) {
        setResponse(v => v + '\n\n' + error.message)
      } else {
        setResponse(v => v + '\n\n' + JSON.stringify(error))
      }
    } finally {
      setIsCaptchaLoading(false)
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
      <div class="fixed bottom-24 left-4 right-4">
        <button onClick={solve} class="btn h-14 w-full">
          Solve CAPTCHA
        </button>
      </div>
      <div class="fixed bottom-4 left-4 right-4">
        <Settings />
      </div>
    </div>
}

export default MainPage
