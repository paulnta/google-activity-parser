#! /usr/bin/env node
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const Parser = require('..')
const argv = require('minimist')(process.argv.slice(2), {
  string: ['input', 'output'],
  alias: { input: 'i', output: 'o' }
})

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

// Check program arguments
if (!argv['i'] || !argv['o']) {
  console.log(`You need to provide both arguments: --input file, --output file`)
  process.exit(1)
}

const inputFile = path.resolve(argv['i'])
const outputFile = path.resolve(argv['o'])

readFile(inputFile)
  .then(data => data.toString())
  .then(html => Parser.parseActivities(html))
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
