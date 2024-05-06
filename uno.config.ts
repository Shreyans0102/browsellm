// uno.config.ts
import { defineConfig } from 'unocss'

import presetUno from '@unocss/preset-uno'
import presetWebFonts from '@unocss/preset-web-fonts'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'none',
      fonts: {
        sans: 'Lexend Exa',
      }
    }),
    presetIcons(),
  ],
})
