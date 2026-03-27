var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Nguyễn Quang Dũng',
    headline: 'Inventory API Dashboard',
    description: 'Dich vu quan ly kho duoc dong goi san de build, deploy va giam sat tren GitHub Actions.',
    primaryAction: '/api/v1/inventory',
    secondaryAction: '/health',
    containerPort: '80',
    deploySlot: 'S3'
  });
});

module.exports = router;
