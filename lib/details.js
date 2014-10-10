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
  el.style.right = 0;
  var o = document.querySelector('.list-overlay')
  o.style.display = 'block'
  o.style.zIndex = 11
  o.onclick = function() {
    o.style.display = 'none'
    o.style.zIndex = '-1'
    el.style.right = '-40%'
  }
}
