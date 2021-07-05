const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
  { logo: 'A', url: 'http://www.acfun.cn' },
  { logo: 'B', url: 'http://www.bilibili.com' }
]
const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '')
}
const render = () => {
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((node, index) => {
    const $site = $(`<li>
          <div class="site">
              <div class="logo">${node.logo[0]}</div>
              <div class="link">${simplifyUrl(node.url)}</div>
              <div class="close">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-close">'
              </use>
              </svg>
          </div>
          </div>
  </li>`).insertBefore($lastLi);

    $site.on('click', () => {
      window.open(node.url)
    })

    $site.on('click', '.close', (e) => {
      e.stopPropagation()   //阻止冒泡
      console.log('关闭页面')
      hashMap.splice(index, 1)
      render()
    })
  });
}

render()

$('.addButton')
  .on('click', () => {
    let url = window.prompt('请问你要添加的网址是什么？')
    if (url.indexOf('http') !== 0) {
      url = 'https://' + url
    }
    console.log(url)
    hashMap.push({
      logo: simplifyUrl(url)[0],
      url: url
    });
    render()
  })
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap)
  console.log('关闭页面')
  localStorage.setItem('x', string)
}

$(document)
  .on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
      if (hashMap[i].logo.toLowerCase() === key) {
        window.open(hashMap[i].url)
      }
    }

  })
