const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const { promisify } = require('util')
const { trim, parseDate } = require('./utils')
const argv = require('minimist')(process.argv.slice(2), {
  string: ['input', 'output'],
  alias: { input: 'i', output: 'o' }
})

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

/**
 * Extract all activities from an html file
 * @param {string} filename the file to parse
 * @param {function} cb callback
 */
function parseFile (filename, cb) {
  return readFile(filename)
    .then((data) => {
      const html = data.toString()
      const $ = cheerio.load(html)

      // select and map over each link
      return $('.header-cell + .content-cell a').map((index, element) => {
        // the link node (a)
        const link = $(element)
        // the parent node (div)
        const parent = $(element).parent()
        // the date is the last text node
        const date = trim(parent.contents().last().text())

        return {
          query: trim(link.text()),
          time: parseDate(date),
          url: trim(link.attr('href'))
        }
      }).get()
    })
}

// Check program arguments
if (!argv['i'] || !argv['o']) {
  console.log(`You need to provide both arguments: --input file, --output file`)
  process.exit(1)
}

const inputFile = path.resolve(argv['i'])
const outputFile = path.resolve(argv['o'])

// Start processing
parseFile(inputFile)
  .then(result => {
    console.log('result', result)
    return JSON.stringify(result)
  })
  .then(data => writeFile(outputFile, data))
  .then(() => {
    console.log('Results written to', outputFile)
  })
  .catch(err => {
    console.error('Oups an error occured: ', err)
  })
