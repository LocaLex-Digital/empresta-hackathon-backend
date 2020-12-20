import { Router } from 'express';
import UserController from './app/controllers/userController';
import ProposalsController from './app/controllers/proposalController';
import AgreementsController from './app/controllers/agreementController';
import SessionController from './app/controllers/sessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);
routes.get('/users', UserController.index);
routes.get('/user', authMiddleware, UserController.show);

routes.post('/sessions', SessionController.store);

routes.post('/proposals', ProposalsController.store);
routes.get('/proposals', ProposalsController.index);
routes.get('/proposals/:id', ProposalsController.show);
routes.put('/proposals/:id', ProposalsController.update);

routes.post('/agreements', authMiddleware, AgreementsController.store);
routes.get('/agreements', authMiddleware, AgreementsController.index);
routes.get('/agreements/:id', authMiddleware, AgreementsController.show);
routes.put('/agreements/:id', AgreementsController.update);
export default routes;
