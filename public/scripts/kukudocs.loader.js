;(function() {
  // 因非同步載入無法告知import的地方什麼時候執行callback，因此在import的地方將callback function塞入window物件

  // DocxJS.bundle.min.js 為官方試用版的破解版（不會過期的試用版）
  // const trialFiles = [
  //   '/scripts/_lib/jquery.1.12.3.min.js',
  //   '/scripts/docxjs/DocxJS.bundle.min.js',
  //   '/scripts/celljs/CellJS.bundle.min.js',
  //   '/scripts/slidejs/SlideJS.bundle.min.js',
  //   '/scripts/pdfjs/PdfJS.bundle.min.js',
  // ]

  // DocxJS.bundle.min.license.js 為官方正式版（僅 production 環境及 localhost 可以使用）
  const licenseFiles = [
    '/scripts/_lib/jquery.1.12.3.min.js',
    '/scripts/docxjs/DocxJS.bundle.min.license.js',
    '/scripts/celljs/CellJS.bundle.min.license.js',
    '/scripts/slidejs/SlideJS.bundle.min.license.js',
    '/scripts/pdfjs/PdfJS.bundle.min.license.js',
  ]

  // DocxJS.bundle.min.license.crack.js（官方正式版的破解版，包含 DEV, SIT, UAT 所有 domain 都可以使用）
  const crackedLicenseFiles = [
    '/scripts/_lib/jquery.1.12.3.min.js',
    '/scripts/docxjs/DocxJS.bundle.min.license.crack.js',
    '/scripts/celljs/CellJS.bundle.min.license.crack.js',
    '/scripts/slidejs/SlideJS.bundle.min.license.crack.js',
    '/scripts/pdfjs/PdfJS.bundle.min.license.crack.js',
  ]

  const domainUsingLicenseFiles = ['www.atom.international']

  const finalFiles = domainUsingLicenseFiles.includes(window.location.hostname) ? licenseFiles : crackedLicenseFiles

  const promises = finalFiles.map(function(file) {
    return new Promise(function(resolve) {
      const script = document.createElement('script')
      script.setAttribute('src', file)
      document.head.appendChild(script)
      script.onload = function() {
        resolve()
      }
    })
  })

  const kukudocsObject = {
    docxAfterRender: {
      parser: 'docxParser',
      type: 'docxJS',
    },
    cellAfterRender: {
      parser: 'cellParser',
      type: 'cellJS',
    },
    pdfAfterRender: {
      parser: 'pdfParser',
      type: 'pdfJS',
    },
    slideAfterRender: {
      parser: 'slideParser',
      type: 'slideJS',
    },
  }

  Promise.all(promises)
    .then(function() {
      Object.entries(kukudocsObject).forEach(function(item) {
        const key = item[0]
        const val = item[1]

        // eslint-disable-next-line no-prototype-builtins
        if (!window.hasOwnProperty(key)) {
          // ex. window.docxParser
          window[val.parser] = function(file, successFn, errorFn) {
            window[val.type].parse(file, successFn, errorFn)
          }

          // ex. window.docxAfterRender
          window[key] = function(element, callBackFn, sheetId) {
            window[val.type].render(element, callBackFn, sheetId)
          }
        }
      })
    })
    .then(function() {
      window.callback()
      delete window.callback
    })
})()
