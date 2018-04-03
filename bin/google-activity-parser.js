#! /usr/bin/env node

const fs = require('fs')
const path = require('path')
const promisify = require('util.promisify')
const Parser = require('../lib/parser')
const argv = require('minimist')(process.argv.slice(2), {
  string: ['input', 'output', 'help'],
  boolean: ['help'],
  alias: { input: 'i', output: 'o', help: 'h' }
})

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

if (!argv.input || argv.help) {
  console.log(
    'Usage: google-activity-parser [options]\n\n' +
    'Options:\n' +
    '-i, --input <file>    input html file to parse\n' +
    '-o, --output <file>   save as a file. If not provided results will be printed in the console\n' +
    '-h, --help            show usage'
  )
  process.exit(1)
}

const inputFile = path.resolve(argv.input)

readFile(inputFile)
  .then(data => data.toString())
  .then(html => Parser.parseActivities(html))
  .then(data => {
    const filename = argv.output && path.resolve(argv.output)
    if (filename) {
      // save as file
      return writeFile(filename, JSON.stringify(data))
        .then(() => {
          console.log(`saved ${data.length} activities in ${filename}`)
        })
    }
    // print in console
    console.log(data)
    console.log(`found ${data.length} activities`)
  })
  .catch(err => {
    console.error('Oups an error occured: ', err)
  })
