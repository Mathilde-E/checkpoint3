
import setupRoutes from './Routes/router.js';
import cors from 'cors';
import express from 'express';

const app = express();
const port = 5000;

app.use(cors('*')); // autorise toutes les origines client
app.use(express.json()); // parse les requêtes en json
app.use(express.urlencoded({extended: true})); // parse les request.body en urlencoded

// Serveur est routée grâce à cette ligne
setupRoutes(app);

// Serveur is running
app.listen(port, () => console.log('Server is running on port ' + port));

