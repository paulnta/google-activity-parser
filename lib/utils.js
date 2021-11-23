const moment = require('moment')

// Common french month abbrev.
// https://fr.wikipedia.org/wiki/Mois#Abr.C3.A9viations
const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juill.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']

/**
 * Convert google's date format to ISOString
 * Ex: 30 janv. 2018 à 15:19:17 => 2018-01-30T14:19:17.000Z
 * @param {String} dateString date to parse
 */
function parseDate (dateString) {
  const momentDate =  moment(dateString,'DD MMM YYYY, HH:mm:ss ')	
	//console.log(dateString, momentDate)
  return momentDate.toISOString()
  /*const regex = /^(\d+)\s(\D*\.?)\s(\d{4}) à (\d{2}:\d{2}:\d{2})/
  const match = dateString.match(regex)
  if (!match) {
    throw new Error('Invalid date ' + JSON.stringify(dateString))
  }

  const date = moment({
    day: match[1],
    month: months.findIndex(v => v === match[2]),
    year: match[3],
    hours: match[4],
    minutes: match[5],
    seconds: match[6]
  })
  return date.toISOString()*/
}

/**
 * Replace multiple whitespace by a single one
 * Ex: "  hello   world  " => "hello world"
 * @param {String} value
 */
function trim (value) {
  return value.replace(/\s\s+/gm, ' ')
}

module.exports = {
  trim: trim,
  parseDate: parseDate
}
