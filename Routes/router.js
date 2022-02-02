import contentController from '../controllers/contentController.js';
import usersController from '../controllers/usersController.js';
import categoriesController from '../controllers/categoriesController.js';


const setupRoutes = (app) => {
    app.use('/content', contentController);
    app.use('/users', usersController);
    app.use('/categories', categoriesController);
}

export default setupRoutes;