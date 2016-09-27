
import ReactDOMServer from 'react-dom/server'
import pdf from 'html-pdf'
import fs from 'fs'

let module

const getBase64String = (path) => {}

const generatePDF = (html, fileName) => {}

const handler = ({ component, props, fileName }, promise) => {
  module = promise
  const html = getComponentAsHTML(component, props)
  if (html && fileName) generatePDF(html, fileName)
}

export const generateComponentAsPDF = (options) => {
  return new Promise((resolve, reject) => {
    return handler(options, { resolve, reject })
  })
}
