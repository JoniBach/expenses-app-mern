const router = require('express').Router();
let Content = require('../models/Content');

router.route('/').get((req, res) => {
  Content.find()
    .then(userContent => res.json(userContent))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const storeName = req.body.storeName;
  const totalAmount = req.body.totalAmount;
  const processedText = req.body.processedText;
  // const date = Date.parse(req.body.date);

  const newContent = new Content({
    storeName,
    totalAmount,
    processedText,
    // date,
  });

  newContent.save()
  .then(() => res.json('Content added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Content.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Content.findByIdAndDelete(req.params.id)
    .then(() => res.json('Content deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Content.findById(req.params.id)
    .then(exercise => {
      exercise.storeName = req.body.storeName;
      exercise.totalAmount = req.body.totalAmount;
      exercise.processedText = processedText;
      // exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Content updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;