var el = document.querySelector('.detail-view')

module.exports = function(r) {
  el.querySelector('#title').textContent = r.getTitle()
  setFieldValue('password', r.getPassword())
  addPasswordFieldHandler()
}

function setFieldValue(f, v) {
  el.querySelector('#' + f).value = v
}

function addPasswordFieldHandler() {
  el.querySelector('#show-password').addEventListener('click', function(evt) {
    // TBH, i have no idea why i have to do this
    evt.preventDefault()
    evt.stopPropagation()

    var p = el.querySelector('#password')
    if(p.type === 'text') p.type = 'password'
    else if(p.type === 'password') p.type = 'text'
  })
}
