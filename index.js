// src/index.js
const express = require('express');
const sequelize = require('./src/config/db');
require('dotenv').config();

// Importar rutas
const usuariosRoutes = require('./src/routes/usuarios.routes.js');
const rolesRoutes = require('./src/routes/roles.routes.js');
const bajasRoutes = require('./src/routes/bajasUsuarios.routes.js');
const programasRoutes = require('./src/routes/programas.routes.js');
const competenciasRoutes = require('./src/routes/competenciasProgramas.routes.js');
const ResultadosRoutes = require('./src/routes/resultadosCompetencias.routes.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.listen(PORT, async () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);

// Montar rutas
app.use('/usuarios', usuariosRoutes);
app.use('/roles', rolesRoutes);
app.use('/bajas-usuarios', bajasRoutes);
app.use('/programas', programasRoutes);
app.use('/competencias', competenciasRoutes);
app.use('/resultados', ResultadosRoutes);

// Conexión a la base de datos
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión con la base de datos exitosa.');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
});
 // Arrancar servidor
app.get('/', (req, res) => {
  res.send('API SENA COMITES SISTEM está en línea.');
}); 
