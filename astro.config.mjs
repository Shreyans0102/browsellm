import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

import solidJs from "@astrojs/solid-js"

// https://astro.build/config
export default defineConfig({
  output: 'static',
  build: {
    assets: 'assets',
    // inlineStylesheets: 'always',
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/[name].js',
          entryFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]',
        }
      }
    }
  },
  integrations: [UnoCSS({
    injectReset: true,
    shortcuts: {
      'bg': 'bg-stone-900 text-white',
      'input': 'text-white w-full rounded-t bg-stone-800 hover:bg-stone-700 focus:bg-stone-700 transition-colors outline-none resize-none appearance-none p-4',
      'select': 'input hover:cursor-pointer',
      'btn': 'bg-white hover:bg-opacity-85 active:bg-opacity-60 text-black text-lg rounded outline-none w-36 h-12',
      'btn-icon': 'bg-white bg-op-0 hover:bg-op-10 hover:cursor-pointer text-white b-rd-50% items-center flex justify-center w-12 h-12 aspect-ratio-1',
    }
  }), solidJs()]
})
