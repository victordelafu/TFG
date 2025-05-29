const API_BASE_URL = 'http://localhost:8080/api'function redirigirPorRol(rol) {
  if (rol === 'CLIENTE') {
    window.location.href = '/Cliente/Index'
  } else if (rol === 'PATRON') {
    window.location.href = '/Patron/Index'
  } else {
    window.location.href = '/'
  }
}

function guardarUsuario(data) {
  localStorage.setItem('rol', data.role)
  localStorage.setItem('usuario', JSON.stringify(data))
}

export function setupAuthForms() {
  // Registro
  const registerForm = document.getElementById('register-form')
  if (registerForm) {
    registerForm.addEventListener('submit', async e => {
      e.preventDefault()
      const name = document.getElementById('name').value
      const email = document.getElementById('email-registro').value
      const password = document.getElementById('password-registro').value
      const role = document.getElementById('rol').value
      const message = document.getElementById('registro-mensaje')

      try {
        const response = await fetch(`${API_BASE_URL}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, role }),
        })

        const text = await response.text()
        let data
        try {
          data = JSON.parse(text)
        } catch {
          console.warn('Respuesta no JSON:', text)
          data = {}
        }

        if (response.ok) {
          guardarUsuario(data)
          message.textContent = 'Registro completado'
          message.classList.remove('text-red-600')
          message.classList.add('text-green-600')

          setTimeout(() => {
            document.getElementById('modal-registro')?.classList.add('hidden')
            registerForm.reset()
            redirigirPorRol(data.role)
          }, 1500)
        } else {
          message.textContent = `Error al registrar: ${response.status}`
          message.classList.remove('text-green-600')
          message.classList.add('text-red-600')
        }
      } catch (err) {
        console.error('Error de red:', err)
        message.textContent = 'No se pudo conectar al servidor'
        message.classList.add('text-red-600')
      }
    })
  }

  // Login
  const loginForm = document.getElementById('login-form')
  if (loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault()
      const email = document.getElementById('email').value
      const password = document.getElementById('password').value
      const message = document.getElementById('login-mensaje')

      try {
        const response = await fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })

        if (response.ok) {
          const data = await response.json()
          guardarUsuario(data)

          message.textContent = 'Inicio de sesión exitoso'
          message.classList.remove('text-red-600')
          message.classList.add('text-green-600')

          setTimeout(() => {
            document.getElementById('modal-login')?.classList.add('hidden')
            loginForm.reset()
            redirigirPorRol(data.role)
          }, 1500)
        } else {
          message.textContent = 'Credenciales inválidas'
          message.classList.remove('text-green-600')
          message.classList.add('text-red-600')
        }
      } catch (err) {
        console.error('Error de red:', err)
        message.textContent = 'No se pudo conectar al servidor'
        message.classList.add('text-red-600')
      }
    })
  }
}
