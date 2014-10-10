var details = require('./details')

module.exports = function(tree) {
  var u = document.createElement('ul')
  u.classList.add('nav')
  u.classList.add('nav-list')

  Object.keys(tree.children).map(function(key) {
    var c = tree.children[key]
    var uc = ul(c)
    uc.classList.remove('li-subgroup')
    u.appendChild(uc)
  })

  tree.records.map(function(r) {
    u.appendChild(li(r))
  })

  document.querySelector('.container').appendChild(u)
}

function li(r) {
  var li = document.createElement('li')
  var a = document.createElement('a')

  a.href = '#'

  a.textContent = r.getTitle()
  a.addEventListener('click', details.bind(null, r))

  li.appendChild(a)
  return li
}

function ul(c) {
  var l = document.createElement('li')
  l.classList.add('li-subgroup')
  var label = document.createElement('label')
  label.classList.add('tree-toggler')
  label.classList.add('navbar-header')
  label.textContent = c.name
  label.addEventListener('click', toggleChildren)
  l.appendChild(label)
  var u = document.createElement('ul')
  u.classList.add('nav')
  u.classList.add('nav-list')
  u.classList.add('tree')
  l.appendChild(u)

  Object.keys(c.children).map(function(key) {
    var ch = c.children[key]
    var uch = ul(ch)
    uch.classList.add('hide')
    u.appendChild(uch)
  })

  c.records.map(function(r) {
    var lir = li(r)
    lir.classList.add('hide')
    u.appendChild(lir)
  })

  return l
}

function toggleChildren() {
  if([].indexOf.call(this.parentElement.querySelector('li').classList, 'hide') > -1) {
    [].map.call(this.parentElement.children[1].children, function(e) {
      e.classList.remove('hide')
    })
    return
  }

  [].map.call(this.parentElement.querySelectorAll('li'), function(e) {
    e.classList.add('hide')
  })
}
