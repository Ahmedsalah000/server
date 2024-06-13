const express = require('express');
const router = express.Router();
const { createQuestion, getQuestions } = require('../controllers/questionController');
// const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(createQuestion)
  .get(getQuestions);

module.exports = router;
