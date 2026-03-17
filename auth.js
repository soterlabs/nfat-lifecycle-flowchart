(function () {
  var PASSWORD_HASH = '25043a1847ecdbc8b4c48b883230bab9eb813298e904b8504fbcfa0cec1165fc';
  var gate = document.getElementById('password-gate');
  var input = document.getElementById('pw-input');
  var btn = document.getElementById('pw-btn');
  var error = document.getElementById('pw-error');

  if (sessionStorage.getItem('nfat-auth') === 'true') {
    gate.style.display = 'none';
  }

  async function sha256(message) {
    var encoded = new TextEncoder().encode(message);
    var buffer = await crypto.subtle.digest('SHA-256', encoded);
    return Array.from(new Uint8Array(buffer)).map(function (b) {
      return b.toString(16).padStart(2, '0');
    }).join('');
  }

  async function tryUnlock() {
    var hash = await sha256(input.value);
    if (hash === PASSWORD_HASH) {
      sessionStorage.setItem('nfat-auth', 'true');
      gate.style.display = 'none';
    } else {
      error.style.display = 'block';
      input.value = '';
      input.focus();
    }
  }

  btn.addEventListener('click', tryUnlock);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') tryUnlock();
  });
})();
