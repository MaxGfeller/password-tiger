var el = document.querySelector('.detail-view')

module.exports = function(r) {
  el.querySelector('#title').textContent = r.getTitle()
  setFieldValue('password', r.getPassword())
  addPasswordFieldHandler()

  showDetails()
}

function setFieldValue(f, v) {
  el.querySelector('#' + f).value = v
}

function addPasswordFieldHandler() {
  el.querySelector('#show-password').onclick = function(evt) {
    // TBH, i have no idea why i have to do this
    evt.preventDefault()
    evt.stopPropagation()

    var p = el.querySelector('#password')
    if(p.type === 'text') p.type = 'password'
    else if(p.type === 'password') p.type = 'text'
  }
}

function resetFields() {

}

function showDetails() {
  removeDetailsOverlay()
  el.style.right = 0;
  var o = document.querySelector('.list-overlay')
  o.style.display = 'block'
  o.style.zIndex = 11
  o.style.opacity = 1
  o.onclick = hideDetails
}

function hideDetails() {
  this.style.display = 'none'
  this.style.zIndex = '-1'
  el.style.right = '-40%'
  this.style.opacity = 0
  document.querySelector('#password').type = 'password'
  addOverlayToHiddenDetails()
}

function addOverlayToHiddenDetails() {
  var o = document.createElement('div')
  o.id = 'detail-overview'
  o.style.position = 'absolute'
  o.style.right = 0
  o.style.top = 0
  o.style.width = '20%'
  o.style.height = '100%'
  o.style.zIndex = 13
  o.onclick = showDetails
  document.body.appendChild(o)
}

function removeDetailsOverlay() {
  var e = document.querySelector('#detail-overview')
  if(e) document.body.removeChild(e)
}
