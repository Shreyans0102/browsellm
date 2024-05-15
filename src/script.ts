import * as cheerio from 'cheerio'

const script = async () => {
  const indexHtmlContent = await Bun.file('./dist/index.html').text()
  const manifest = await Bun.file('./src/manifest.json').json()

  const $ = cheerio.load(indexHtmlContent)

  const scriptTags = $('script')

  scriptTags.each(async (index, element) => {
    const scriptContent = $(element).html() || ''
    const fileName = `./dist/assets/start${index + 1}.js`
    await Bun.write(fileName, scriptContent)

    $(element).empty()
    const src = `./assets/start${index + 1}.js`
    $(element).attr('src', src)

    // manifest.content_scripts[0].js.push(src)
  })

  // for await (const file of new Bun.Glob('*.js').scan("./dist/assets")) {
  //   manifest.content_scripts[0].js.push(`./assets/${file}`)
  // }
  // for await (const file of new Bun.Glob('*.css').scan("./dist/assets")) {
  //   manifest.content_scripts[0].css.push(`./assets/${file}`)
  // }

  await Bun.write('./dist/manifest.json', JSON.stringify(manifest))
  await Bun.write('./dist/index.html', $.html())
}

script()
