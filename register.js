//-Este punto no es algo "grave" pero estaría bueno agregar funcionalidad a los forms de login y register (se puede guardar el usuario en local storage, por ejemplo)
const nameReg= document.getElementById('nombrereg')
const formReg = document.getElementById('formReg')
const passReg = document.getElementById('contraseña')
const passConfReg = document.getElementById('contraseñaConfirm')



const checkPass = () => {
    let valido = false
  const min = 3
  const max = 25

  const pass = passReg.value.trim()

  if(!isBetween(pass.length,min,max)){
    showError(passReg,`La contraseña tiene que tener entre ${min} y ${max} caracteres`)
    } else{
  showSuccess(passReg)
  valido=true
    }
    return valido 
}

const checkPassConfirm = () => {
    let valido = false
  const min = 3
  const max = 25

  const pass = passConfReg.value.trim()

  if(!isBetween(pass.length,min,max)){
    showError(passConfReg,`La contraseña tiene que tener entre ${min} y ${max} caracteres`)
    } else{
  showSuccess(passConfReg)
  valido=true
    }

    if(passReg.value.trim()!==pass){
        alert('Las contraseñas no coinciden')
        valido = false
    } 
    return valido 
}


const checkUsername = () => {
  let valido = false
  const min = 3
  const max = 25

  const name = nameReg.value.trim()
 
  if(!isEmpty(name)){
    showError(nameReg, 'El nombre es obligatorio')
  } else if (!isBetween(name.length,min,max)){
    showError(nameReg,`El nombre tiene que tener entre ${min} y ${max} caracteres`)
  } else{
    showSuccess(nameReg)
    valido=true
  } 
 return valido
}

const isEmpty = valor => (valor === '' ? false : true)

let  usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

const agregarUsuario = e => {
    e.preventDefault()
      
    let isUserNameValid = checkUsername()
    let isPassValid = checkPass ()
    let isPassValidConfirm = checkPassConfirm ()
  
  let isFormValid = isUserNameValid && isPassValid && isPassValidConfirm
  const iguales = (e) => e.usuario===nameReg.value
  if (isFormValid){
    if(usuarios.some(iguales)){
        alert('Usuario existente')
    } else {
        usuarios = [... usuarios , {usuario: nameReg.value.trim() , id: usuarios.length + 1}]
        alert('Usuario creado correctamente')
        saveLocalStorage(usuarios)
        window.location.href = "login.html"

    }

  }
}


  const init = () => {
    formReg.addEventListener('submit', agregarUsuario)
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

  const isBetween = (length,min,max) =>
length < min || length > max ? false : true


const saveLocalStorage = listaUsuarios => {
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios))
}