const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate')

const UsersController = require('./controllers/UsersController');
const CasesController = require('./controllers/CasesController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();


routes.post('/sessions',celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    })
}), SessionController.create);

routes.get('/users', UsersController.index);

routes.post('/users', celebrate({
    [Segments.BODY]: Joi.object().keys({
        nameU: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
        whatsapp: Joi.string().required().min(10).max(11),
        type: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), UsersController.create);


routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}),ProfileController.index);

routes.get('/cases',  celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),CasesController.index);

routes.post('/cases', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        nameC: Joi.string().required(),
        type: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
        
    }),

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), CasesController.create);

routes.delete('/cases/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),CasesController.delete)

module.exports = routes;