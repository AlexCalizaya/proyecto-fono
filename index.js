const express = require('express')
const app = express()
const port = 3000 //Num de puerto abierto

app.use(express.json());

//Lista de productos
const productos = [
    {
        id: 1,
        name: "name",
        price: 5500,
        image: "imgs/iphone-14-pro-max.jpg",
        description: "Decripcion sadafaf",
        stock: 5,
    },
    {
        id: 2,
        name: "name",
        price: 4500,
        image: "imgs/samsung-s23-ultra.jpg",
        description: "Decripcion sadafaf",
        stock: 5,
    },
    {
        id: 3,
        name: "name",
        price: 10000,
        image: "imgs/iphone-10.jpeg",
        description: "Decripcion sadafaf",
        stock: 5,
    },
    {
        id: 4,
        name: "name",
        price: 1,
        image: "imgs/j2-prime.jpg",
        description: "Decripcion sadafaf",
        stock: 5,
    },
    {
        id: 5,
        name: "name",
        price: 1500,
        image: "imgs/samsung-s21-fe.jpeg",
        description: "Decripcion sadafaf",
        stock: 5,
    }

]

//Se solicitan los productos y se envían a la dirección
app.get('/api/productos', (req, res) => {
  res.send(productos);
});

app.post('/api/pay', (req, res) => {
    //console.log(req.body);
    const ids = req.body;
    //const copiaProductos = productos.map((p) => ({ ...p }));
    ids.forEach(id => {
       const product = productos.find((p) => p.id === id); //Crea una variable en la que obtendrá cada producto que se lea y se compara el id para saber si ha sido añadido al carrito
       product.stock--;
    });
    res.send(productos);
  });

//Abre códigos estáticos como un html css
app.use("/", express.static("Frontend"))

//Función asíncrona que abre el puerto para la ejecución del código
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})