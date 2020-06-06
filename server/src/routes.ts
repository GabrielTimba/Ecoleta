import express from 'express';
import multer from 'multer';
import {celebrate,Joi} from 'celebrate';
import multerConfig from './config/multer'

import PoitsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
const routes=express.Router();
const upload=multer(multerConfig);

const poitsController=new PoitsController();
const itemsController=new ItemsController();
routes.get('/items',itemsController.index);

routes.post('/points'
        ,upload.single('image')
        ,celebrate({
            body:Joi.object().keys({
                name:Joi.string().required(),
                email:Joi.string().required().email(),
                whatsapp:Joi.number().required(),
                latitude:Joi.number().required(),
                longitude:Joi.number().required(),
                city:Joi.string().required(),
                uf:Joi.string().required().max(2),
                items:Joi.string().required()
            })
        },{
            abortEarly:false
        })
        , poitsController.create);

routes.get('/points/:id', poitsController.show);
routes.get('/points', poitsController.index)
export default routes;