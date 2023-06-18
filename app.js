const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const puerto = process.env.PORT || 3000;
const cors = require('cors');
const app = express();

const rutaCategorias = require('./src/routes/categorias-routes-api');
const rutaClientes =require('./src/routes/clientes-routes-api');
const rutaProveedores = require('./src/routes/proveedores-routes-api');

app.set('view engine', 'hbs');
hbs. registerPartials(__dirname + '/views/partials',()=>{});


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(rutaCategorias);
app.use(rutaClientes);
app.use(rutaProveedores);

app.get('/',(req,res)=>{
    res.render('login');
})

app.get('/login',(req,res)=>{
    res.render('login');
})

app.get('/clientes',(req,res)=>{
    res.render('clientes');
})

app.get('/categorias',(req,res)=>{
    res.render('categorias');
})

app.get('/ventas',(req,res)=>{
    res.render('ventas');
})

app.get('/facturas',(req,res)=>{
    res.render('facturas');
})

app.get('/proveedores',(req,res)=>{
    res.render('proveedores');
})

app.get('/productos',(req,res)=>{
    res.render('productos');
})

app.get('*',(req,res)=>{
    res.render('404');
})

app.listen(puerto,() =>{
    console.log('El servidor esta corriendo en el puerto : ', puerto);
})

