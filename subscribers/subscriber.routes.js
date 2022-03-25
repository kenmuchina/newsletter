const express = require('express');
const router = express.Router();
// const Joi = require('joi');
// const validateRequest = require('_middleware/validate-request');
const subscriberService = require('./subscriber.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id',update);
router.delete('/:id', _delete);

module.exports = router;

// ------------------------- ROUTE FUNCTIONS ---------------------

function getAll(req, res, next) {
    const promise = new Promise((resolve, reject) => {
        try {
            const subs = subscriberService.getAll()
            resolve(subs)
        } catch (error) {
            reject(error)
        }
    })

    promise.then((subs) => {
        const subsc = []
        subs.forEach(element => {
            subsc.push(element.dataValues)
        });
        res.json(subsc)
    })
}

function getById(req, res, next) {
    subscriberService.getById(req.params.id)
        .then(subscriber => res.json(subscriber))
        .catch(next);
}

function create(req, res, next) {

        const promise = new Promise((resolve, reject) => {
            try {
               const sub = subscriberService.create(req.body)
               resolve(sub) 
            } catch (error) {
               reject(error) 
            }
        })
        
        promise.then((sub) => {
            res.json(sub)
        })
    
}

function update(req, res, next) {
    subscriberService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'subscriber updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    subscriberService.delete(req.params.id)
        .then(() => res.json({ message: 'subscriber deleted' }))
        .catch(next);
}

// -------------------  SCHEMA FUNCTIONS ------------------

// function createSchema(req, res, next) {
//     const schema = Joi.object({
//         firstName: Joi.string().required(),
//         lastName: Joi.string().required(),
//         email: Joi.string().email().required(),
//     });
//     validateRequest(req, next, schema);
// }

// function updateSchema(req, res, next) {
//     const schema = Joi.object({
//         firstName: Joi.string().empty(''),
//         lastName: Joi.string().empty(''),
//         email: Joi.string().email().empty(''),
//     });
//     validateRequest(req, next, schema);
// }
