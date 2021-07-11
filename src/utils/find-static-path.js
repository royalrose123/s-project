/**
 * Find static path from string or array of string
 * 取得 match.path 中冒號前面的字串
 * @param {string || string[]} value
 * @returns {string} - staticPath
 */
function findStaticPath(value) {
  return Array.isArray(value) ? value.find(path => !/\/:\w*/gi.test(path)) || '' : value.replace(/\/:\w*/gi, '')
}

export default findStaticPath
