const togglerNav = document.querySelector('.boton__logo--toggler');
const menuNav = document.querySelector('.contenedor__navbar');
const fondoNegro = document.querySelector('.fondo__negro');
const menuCarrito = document.querySelector('.boton__logo--carrito');
const contCarrito = document.querySelector('.contenedor__carrito');
const cerrarCarrito = document.querySelector('.boton__cerrar__carrito');
const menuCarritoXL = document.querySelector('.boton__logo--carritoXL');

togglerNav.addEventListener('click', () =>{
    menuNav.classList.toggle('activo');
    fondoNegro.classList.toggle('activo');
    document.body.classList.toggle('activo');
});

menuCarrito.addEventListener('click', () =>{

    contCarrito.classList.toggle('activo');
    fondoNegro.classList.toggle('activo2');
    document.body.classList.toggle('activo');
});

menuCarritoXL.addEventListener('click', () =>{

    contCarrito.classList.toggle('activo');
    fondoNegro.classList.toggle('activo2');
    document.body.classList.toggle('activo');

});

cerrarCarrito.addEventListener('click', () =>{

    contCarrito.classList.remove('activo');
    fondoNegro.classList.remove('activo2');
    document.body.classList.remove('activo')
});