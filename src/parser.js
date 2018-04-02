const cheerio = require('cheerio')
const { trim, parseDate } = require('./utils')

/**
 * Extract all activities from an html string
 * @param {string} html the html markup
 * @returns {Promise<Array<Object>>} A list of activities
 */
exports.parseActivities = function (html) {
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
}
