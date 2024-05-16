import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'
import Groq from 'groq-sdk'

import { $provider, $allApiKeys, $model } from '../store'

const message = async (action: string, data?: object) => {
  const queryOptions = { active: true, lastFocusedWindow: true }
  const [tab] = await chrome.tabs?.query(queryOptions)

  if (tab.id) {
    return await chrome.tabs?.sendMessage(tab.id, { action, data })
  } else {
    return null
  }
}

export const injectCode = async (code: string) => {
  const queryOptions = { active: true, lastFocusedWindow: true }
  const [tab] = await chrome.tabs.query(queryOptions)

  const post = (msg: any) => window.postMessage(msg)
  
  if (tab.id) {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      func: post,
      args: [{ action: 'injectCode', code }],
    })
  }
}

export const speachToText = async (url: string) => {
  const openai = new OpenAI({
    apiKey: $allApiKeys.get().openai,
    dangerouslyAllowBrowser: true,
  })

  const audio = await fetch(url)

  const file = new File([await audio.blob()], 'audio.mp3', {
    lastModified: Date.now(),
    type: 'audio/mp3',
  })

  return await openai.audio.transcriptions.create({
    file,
    model: 'whisper-1',
    response_format: 'text',
  })
}

export const solveCaptcha = async () => {
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  await message('startCaptcha')

  await delay(2000 + Math.floor(Math.random() * 1001))

  await message('startCaptchaAudio')

  await delay(1000 + Math.floor(Math.random() * 1001))

  const url = await message('getCaptchaAudioUrl')

  await delay(1000 + Math.floor(Math.random() * 1001))

  if (url) {
    const text = await speachToText(url)
  
    await message('setCaptchaText', text)
  }
}

export const request = async (prompt: string) => {
  const dom = JSON.parse(await message('getDom'))

  const content = `
    You will receive two inputs. The first one is a task (starting with "Task: "), and the second is a JSON object, with the list of all the inputs, clickable elements, and the content in the DOM (starting with "DOM: ").
    Your ultimate goal is to solve the task. The task either requires you to output something or perform some actions on the webpage.

    If you think an output is requested, for instance, the summary of the page, or for answering some questions, you should return a JSON in this format:
    {
      "type": "output",
      "content": <content>
    }
    If you think you need to perform an action, for instance, filling out an input field, or clicking on a button or link, you should return a JSON in this format:
    {
      "type": "action",
      "content: [
        {
          "type": "click",
          "llmIndex": <The 'llm-index' attribute of the clickable element that should be clicked in the page>
        },
        {
          "type": "input",
          "text": <Text to be put inside the input>,
          "llmIndex": <The 'llm-index' attribute of the input element that should be filled with the text in the page>
        },
        ...
      ]
    }
    You have as many actions is one step as you want, as long as you can be sure it's the correct action. Actions are either "click" or "input", are will be run in order you provide.
    Make sure you return the result in the required format. You should only return a JSON object, nothing else.

    Task: ${prompt}

    DOM: ${JSON.stringify(dom)}
  `

  switch ($provider.get()) {
    case 'groq':
      const groq = new Groq({
        apiKey: $allApiKeys.get().groq,
        dangerouslyAllowBrowser: true,
      })

      return (await groq.chat.completions.create({
        messages: [{ role: 'user', content }],
        model: $model.get(),
      })).choices[0].message.content
    
    case 'anthropic':
      const anthropic = new Anthropic({
        apiKey: $allApiKeys.get().anthropic,
      })

      return (await anthropic.messages.create({
        max_tokens: 500,
        messages: [{ role: 'user', content }],
        model: $model.get(),
      })).content[0].text


    case 'openai':
      const openai = new OpenAI({
        apiKey: $allApiKeys.get().openai,
        dangerouslyAllowBrowser: true,
      })

      return (await openai.chat.completions.create({
        messages: [{ role: 'user', content }],
        model: $model.get(),
      })).choices[0].message.content

    default:
      throw new Error('Provider does not exist.')
  }
}
