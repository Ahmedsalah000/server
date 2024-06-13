const asyncHandler = require('express-async-handler');
const Question = require('../models/Question');

// @desc    Create a new question
// @route   POST /api/questions
// @access  Private
const createQuestion = asyncHandler(async (req, res) => {
  const createdQuestion = await Question.create(req.body);
  res.status(201).json({data:createdQuestion});
});

// @desc    Get all questions
// @route   GET /api/questions
// @access  Public
const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find({});
  res.json(questions);
});

module.exports = {
  createQuestion,
  getQuestions,
};
