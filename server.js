
require('dotenv').config({ path: './pagos.env' });
//import { osmRouter } from './routes/osm.router';

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const eventosRouter = require('./routes/eventos.router');
const pagosRouter = require('./routes/pagos.router');
const evaluacionesRouter = require('./routes/evaluaciones.router');

const perfilesDeportivosRouter = require('./routes/perfilesdeportivos.router');



// DB: Importa todos los modelos y relaciones
const db = require('./models');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [
    'http://localhost',
    'http://localhost:4200',
    'capacitor://localhost',
    'http://localhost:3000',
    'http://localhost:3000',
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());

app.use('/uploads', express.static('uploads'));


// Rutas
app.use('/pagos', pagosRouter);
app.use('/eventos', eventosRouter);
app.use('/patinadores', require('./routes/patinadores.router'));
app.use('/eventos', require('./routes/eventos.router'));
app.use('/elementos', require('./routes/elementos.router'));
app.use('/componentes', require('./routes/componentes.router'));
app.use('/padron', require('./routes/padron.router'));
app.use('/roles', require('./routes/rol.router'));
app.use('/documentacion', require('./routes/documentacion.router'));
app.use('/usuarios', require('./routes/usuarios.router'));
app.use('/auth', require('./routes/auth.router'));
app.use('/asistencias', require('./routes/asistencias.router'));
app.use('/perfiles-deportivos', perfilesDeportivosRouter);
app.use('/evaluaciones', evaluacionesRouter);
//app.use('/api/osm', osmRouter);


// Ruta base
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Patinadores Artísticos');
});

// Iniciar servidor y sincronizar base de datos
 app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
  });
db.sequelize.sync().then(() => {
  console.log('✅ Base de datos sincronizada correctamente.');
 
}).catch(err => {
  console.error('❌ Error al sincronizar base de datos:', err);
});
