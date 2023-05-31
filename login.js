//mi idea aca es usar el localstorage para corroborar que la cuenta haya sido creada y por lo tanto el usuario exista

const nameLog = document.getElementById('nombrelog')
const passLog = document.getElementById('passlog')
const formLog = document.getElementById('formLog')

const checkPass = () => {
  let valido = false
  const min = 3
  const max = 25

  const pass = passLog.value.trim()

  if(!isBetween(pass.length,min,max)){
    showError(passLog,`La contraseña tiene que tener entre ${min} y ${max} caracteres`)
    } else{
  showSuccess(passLog)
  valido=true
    }
    return valido 
}

const checkUsername = () => {
    let valido = false
    const min = 3
    const max = 25
  
    const name = nameLog.value.trim()
    const iguales = (e) => e.usuario===nameLog.value

    if(!isEmpty(name)){
        showError(nameLog, 'El nombre es obligatorio')
      } else if (!isBetween(name.length,min,max)){
        showError(nameLog,`El nombre tiene que tener entre ${min} y ${max} caracteres`)
      } else if(!usuarios.some(iguales)){
          alert('El nombre de usuario no existe')
      }else{ 
        showSuccess(nameLog)
        valido=true
      } 
     return valido
}

const isEmpty = valor => (valor === '' ? false : true)

let  usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

const logueado = e => {
    e.preventDefault()
      
    let isUserNameValid = checkUsername()
    let isPassValid = checkPass ()
    
    let isFormValid = isUserNameValid && isPassValid

    if(isFormValid){
        alert('Bienvenido', nameLog)
        window.location.href = "index.html"
    }
    }

const init = () => {
    formLog.addEventListener('submit', logueado)
  }

  init()

  const showError = (input, message) =>{
    const formField = input.parentElement
    formField.classList.remove('success')
    formField.classList.add('error')
    const error = formField.querySelector('small')
    error.textContent = message
  }

  const showSuccess = input => {
    const formField = input.parentElement
    formField.classList.remove('error')
    formField.classList.add('success')
    const error = formField.querySelector('small')
    error.textContent=''
  }

  const isBetween = (length,min,max) => length < min || length > max ? false : true

