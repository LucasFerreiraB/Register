'use strict';

var express = require('express');
var router = express.Router();
var data = [{
  image: 'https://www.socarrao.com.br/img/home/category1.jpg',
  brandModel: 'abcd',
  year: '1995',
  plate: 'abds',
  color: 'preto'
}];

router.get('/', function(req, res) {
  console.log('[GET] /car:', data)
  res.json(data);
});

router.post('/', function(req, res) {
  data.push({
    image: req.body.image,
    brandModel: req.body.brandModel,
    year: req.body.year,
    plate: req.body.plate,
    color: req.body.color
  });
  console.log('[POST] /car:', JSON.stringify({
    body: req.body,
    data
  }, null, 2))
  res.json({ message: 'success' });
});

router.get('/', function(req, res){
  req.send(data);
});

module.exports = router;
