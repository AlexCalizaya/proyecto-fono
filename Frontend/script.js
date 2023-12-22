let carritoCompras = [];
let productos = [];
let precioTotal = 0;

//Añade los productos y precio y suma el total
function add(productID, presio){
    const product = productos.find(p => p.id === productID); //Crea una variable en la que obtendrá cada producto que se lea y se compara el id para saber si ha sido añadido al carrito
    product.stock--;

    console.log(productID, presio);
    carritoCompras.push(productID);
    precioTotal=precioTotal+presio;
    document.getElementById("checkout").innerHTML=`Pagar S/. ${precioTotal}`;
    mostrarProductos();
}

async function pay(){
    //window.alert(productos.join(", \n")); Generaba una ventana de alerta del navegador  listando los productos
    const productList = await (await fetch("/api/pay",{
        method: "post",
        body: JSON.stringify(carritoCompras),
        headers: {
            "Content-Type": "application/json"
        }
    })).json();
}

//----------
function mostrarProductos(){
    let productsHTML = '';
    productos.forEach(p => {
        let buttonHTML = `<button class="button-add" onclick="add(${p.id}, ${p.price})">Agregar</button>`//Click invoca a la funcion add y se tiene el mnsj Agregar en

        if(p.stock <= 0){

            buttonHTML=`<button disabled class="button-add" onclick="add(${p.id}, ${p.price})">Sin stock</button>`
        }

        productsHTML +=
        `<div class="product-container">
            <h3>${p.name}</h3>
            <img src="${p.image}">
            <h3>${p.price}</h3>
            <h4>${p.description}</h4>
            ${buttonHTML}
        </div>`
    });
    document.getElementById('page-content').innerHTML=productsHTML;
}

//Función asíncrona callback para el llamado de la lista de productos para mostrarlos posteriormente en la tienda
window.onload = async() =>{
    productos = await (await fetch("/api/productos")).json();
    console.log(productos);
    mostrarProductos();
}