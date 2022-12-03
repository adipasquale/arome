const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const jsdom = require("jsdom");

exports.handler = async function (event, context) {
  const url = 'https://www.meteociel.fr/previsions-arome-1h/3520/marseille.htm'
  const res = await fetch(url)
  const html = await res.text()
  const dom = new jsdom.JSDOM(html);
  const doc = dom.window.document
  const tableElt = Array.from(doc.querySelectorAll('table[bordercolor="#a0a0b0"]')).filter(e => e.innerHTML.indexOf("Temp.") >= 0)[0]
  return {
    statusCode: 200,
    body: tableElt.outerHTML
  };
}
