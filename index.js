// Esto es de la Navbar
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");
const categorias = document.querySelector('.productos-div')
const listaCategorias = document.querySelectorAll('.categoria')
abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

//array de objetos productos
const productos = [
  {
      id:1,
      descripcion: 'Anillo de Plata',
      tags: 'anillo',
      img: 'https://cdn-media.glamira.com/media/product/newgeneration/view/1/sku/joy-n/diamond/diamond-Brillant_AAA/alloycolour/white.jpg?width=800&height=800',
      precio: 'USD 51.99'
  },
    {
      id:2,
      descripcion: 'Cadena de Plata',
      tags: 'cadena',
      img: 'https://http2.mlstatic.com/D_NQ_NP_779640-MLA45644380241_042021-O.webp',
      precio: 'USD 99.99'
  },
    {
      id:3,
      descripcion: 'Reloj Tommy',
      tags: 'reloj',
      img: 'https://stylewatch.vtexassets.com/arquivos/ids/224750/Reloj_Tommy_Hilfiger_TH1792026_01.jpg?v=638107739508100000',
      precio: 'USD 150.00'
  },
    {
      id:4,
      descripcion: 'Anillo de Plata',
      tags: 'anillo',
      img: 'https://cdn-media.glamira.com/media/product/newgeneration/view/1/sku/layer-empire/diamond/diamond-Brillant_AAA/stone2/diamond-Brillant_AAA/alloycolour/white.jpg?width=516&height=516',
      precio: 'USD 23.00'
  },
  {
    id:5,
    descripcion: 'Reloj Casio',
    tags: 'reloj',
    img: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/844/620/products/a-500wa-1d1-55a7d7afb8e86e660815933020131153-640-0.jpg',
    precio: 'USD 44.99'
  },
    {
      id:6,
      descripcion: 'Cadena Oro 18k',
      tags: 'cadena',
      img: 'https://cdn.shopify.com/s/files/1/1084/6782/products/169970464-1_600x.jpg?v=1660940221',
      precio: 'USD 46.99'
  },
  {
    id:7,
    descripcion: 'Anillo de Plata con Piedra',
    tags: 'anillo',
    img: 'https://www.doseisdosjoyas.com/assets/fotos/5F1F5866037E0.jpg',
    precio: 'USD 65.00'
  },
  {
    id:8,
    descripcion: 'Alianza de Oro',
    tags: 'anillo',
    img: 'https://d2r9epyceweg5n.cloudfront.net/stores/848/323/products/alianza-boda-media-cana1-afeb64d264eadcf08b15323694375543-640-0.jpg',
    precio: 'USD 87.99'
  }
]


//renderizo cards de productos en el index
const cards = document.querySelector('.container-productos');
const renderProducto = producto =>{ 
    const {id, descripcion, tags,img,precio} = producto;
    return `
    <div class="card3">
    <img src="${img}" alt="" class="card__img3">  
    <div class="card__info3">
      <div class="card__user3">
        <div class="bici__text3">
            <p class="id__producto"></p>
            <p name="news" class="nombre__producto3">${descripcion}</p>
            <h3 class="card__title3">${precio}</h3>
        </div> 
        <button class="btn btn--primary botonAñadir">Añadir al carrito</button>
      </div>
    </div>
    </div>
    `;
};

//renderizo los filtros de las categorias 
const renderizarFiltros = categorias => {
  const listaFiltrada = productos.filter(
    (producto) => producto.tags === categorias)

  cards.innerHTML = listaFiltrada.map(renderProducto).join('')
}

const renderProductos = (index=0, categorias = undefined) =>{
  if(!categorias){
    cards.innerHTML = productos.map(renderProducto).join('');
    return
  }
  renderizarFiltros(categorias)
}

const aplicarFiltros = (e) =>{
if(!e.target.classList.contains('categoria')) return
cambiarEstadoFiltro(e)
if(!e.target.dataset.category){
  cards.innerHTML= ''
  renderProductos()
  const botonesAñadirCarrito = document.querySelectorAll('.botonAñadir')
  botonesAñadirCarrito.forEach(añadirCarrito => {
  añadirCarrito.addEventListener('click', añadirCarritoClickeado);
})
} else {
  renderProductos(0, e.target.dataset.category)
  const botonesAñadirCarrito = document.querySelectorAll('.botonAñadir')
  botonesAñadirCarrito.forEach(añadirCarrito => {
  añadirCarrito.addEventListener('click', añadirCarritoClickeado);
})
 }
 
}

renderProductos(productos);

categorias.addEventListener("click", aplicarFiltros)

const cambiarActive = categoriaSeleccionada =>{
  const categorias = [... listaCategorias]
  categorias.forEach(btn =>{
    if(btn.dataset.category !== categoriaSeleccionada){
      btn.classList.remove('active')
      return
    }
    btn.classList.add('active')
  })
}

const cambiarEstadoFiltro = (e) =>{
  const categoriaSeleccionada = e.target.dataset.category
  cambiarActive(categoriaSeleccionada)
}

// añadir al carrito

const botonesAñadirCarrito = document.querySelectorAll('.botonAñadir')
botonesAñadirCarrito.forEach(añadirCarrito => {
  añadirCarrito.addEventListener('click', añadirCarritoClickeado);
})

const divCarro = document.querySelector(
  '.container3'
);


function añadirCarritoClickeado(evento){
  const boton = evento.target;
  const item = boton.closest('.card3');

  const productoDescripcion = item.querySelector('.nombre__producto3').textContent;
  const productoPrecio = item.querySelector('.card__title3').textContent;
  const productoImg = item.querySelector('.card__img3').src
  const productoId = item.querySelector('.id__producto').textContent

  agregarItemAlCarrito(productoDescripcion,productoId,productoImg,productoPrecio)
}



// agregar un elemento al carro
function agregarItemAlCarrito(productoDescripcion,productoId,productoImg,productoPrecio){
  // funcion por si añadimos 2 items iguales para que nos sume el contador en vez de mostrarnos
  // 2 divs
  
  const elementosIguales = divCarro.getElementsByClassName('nombre__producto2')
  for (let i = 0; i < elementosIguales.length; i++) {
    if (elementosIguales[i].innerText === productoDescripcion) {
      let cantidad = elementosIguales[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.cantidad__items'
      );
      cantidad.value++;
      calcularTotal();
      return;
    }
  }

  const elementoCarrito = document.createElement('div')
  const elementoAgregado = `
  <div class="card2">
  <img src="${productoImg}" alt="" class="card__img2">  
  <div class="card__info2">
    <div class="card__user2">
      <div class="bici__text2">
          <div
          class="carro__cantidad align-items-center">
          <input class="cantidad__items" type="number"
              value="1">
          <button class="btn btn__eliminar" type="button"><i class="fa-solid fa-trash"></i></button>
          </div>
          <p name="news" class="nombre__producto2">${productoDescripcion}</p>
          <h3 class="card__title3">${productoPrecio}</h3>
      </div> 
    </div>
  </div>
  </div>

  `
  elementoCarrito.innerHTML = elementoAgregado
  divCarro.append(elementoCarrito)

  elementoCarrito.querySelector('.btn__eliminar').addEventListener('click', removerItem)

  elementoCarrito.querySelector('.cantidad__items').addEventListener('change', cambiarCantidad)
  
  calcularTotal();
 
}

// calcular total de los elementos del carrito
function calcularTotal(){
  let total=0;
  const totalCarrito = document.querySelector('.precio')

  const elementosDelCarrito = document.querySelectorAll('.card2')

  elementosDelCarrito.forEach(elementosDelCarrito =>{
    const precioElemento = elementosDelCarrito.querySelector('.card__title3')
    const precioDelItem = Number(precioElemento.textContent.replace('USD',''))
    const cantidadElementosCarro = elementosDelCarrito.querySelector('.cantidad__items')
    const cantidadElementos = Number(cantidadElementosCarro.value)

    total= total + precioDelItem * cantidadElementos;
  })

  totalCarrito.innerHTML = `${total.toFixed(2)} USD`
  return total
}

  // borrar item del carrito
  function removerItem(evento){
  const boton = evento.target
  boton.closest('.card2').remove();
  calcularTotal();
}

// cambiar cantidad de items del carrito
function cambiarCantidad(evento){
  const cantidad = evento.target;
  if(cantidad.value <= 0) {
    cantidad.value = 1;
  }
  calcularTotal();
}

const comprarBoton = document.querySelector('.btn-carrito')
comprarBoton.addEventListener('click', botonComprado)

function botonComprado(){
  if(calcularTotal()>0){
    alert('Su pedido ha sido procesado, Gracias por su compra')
    divCarro.innerHTML = ''
    calcularTotal()
  } else {
    alert('Agregue productos al carrito antes de continuar')
  }
}



//form contacto y vali

const form = document.getElementById('form')
const nameInput= document.getElementById('nombre')
const nameReg= document.getElementById('nombrereg')
const emailInput = document.getElementById('email')
const msjInput = document.getElementById('mensaje')



const checkUsername = () => {
  let valido = false
  const min = 3
  const max = 25

  const name = nameInput.value.trim()

  if(!isEmpty(name)){
    showError(nameInput, 'El nombre es obligatorio')
  } else if (!isBetween(name.length,min,max)){
    showError(nameInput,`El nombre tiene que tener entre ${min} y ${max} caracteres`)
  } else{
    showSuccess(nameInput)
    valido=true
  } 
 return valido
}

const checkmsj = () =>{
  let valido = false
  const msj = msjInput.value.trim()
  if(!isEmpty(msj)){
    showError(msjInput, 'El mensaje es obligatorio')
  }else {
      showSuccess(msjInput)
      valido = true
    }
    return valido
}


const checkemail = () => {
  let valido = false
  const email = emailInput.value.trim()
  if(!isEmpty(email)){
    showError(emailInput, 'El mail es obligatorio')
  }else if (!esValido(email)){
    showError(email,'El email no es valido')
  }else {
      showSuccess(emailInput)
      valido = true
    }
    return valido
  }

const isEmpty = valor => (valor === '' ? false : true)

//verficamos si la longitud del campo esta entre minimo y maximo

const isBetween = (length,min,max) =>
length < min || length > max ? false : true


//email valido
const esValido = email =>{
  const re = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
  return re.test(email)
}
//mostrar error
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

form.addEventListener('submit', e => {
  e.preventDefault()

  let isUserNameValid = checkUsername()
  let isEmailValid = checkemail()
  let isMsjValid = checkmsj()

let isFormValid = isUserNameValid && isEmailValid && isMsjValid

if (isFormValid){
  alert('Mensaje Enviado')
  form.submit()
}
})





























