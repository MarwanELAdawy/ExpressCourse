const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
const Promotions = require('../models/promotions');


promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .get((req,res,next)=>{
        Promotions.find({})
        .then((promotion) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(promotion);
        },(err)=>next(err))
        .catch((err)=>next(err));
    })
    .post((req,res,next)=>{
        Promotions.create(req.body)
        .then((promotion)=>{
            console.log('Promo Created Succsess',promotion);
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(promotion);
        },(err)=>next(err))
        .catch((err)=>next(err));
    })
    .put((req,res,next)=>{
        res.statusCode = 403;
        res.end('Put operation not supported on /promotions');
    })
    .delete((req,res,next)=>{
        Promotions.remove({})
        .then((resp)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        })
        .catch((err)=>next(err));
    });


promoRouter.route('/:promoId')
    .get((req, res, next)=>{
        Promotions.findById(req.params.promoId)
        .then((promotion)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(promotion);
        },(err)=>next(err))
        .catch((err)=>next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /Promotions/'+ req.params.promoId);
    })
    .put((req, res, next)=>{
        Promotions.findByIdAndUpdate(req.params.promoId,{
            $set: req.body
        },{new:true})
        .then((promotion)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(promotion);
        },(err)=>next(err))
        .catch((err)=>next(err));
    })
    .delete((req, res, next)=>{
        Promotions.findByIdAndRemove(req.params.promoId)
        .then((resp)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        })
        .catch((err)=>next(err));
    });


module.exports = promoRouter;