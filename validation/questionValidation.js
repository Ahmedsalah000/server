const { body, validationResult } = require('express-validator');

const questionValidationRules = () => [
  body('question').not().isEmpty().withMessage('Question is required'),
  body('answer').not().isEmpty().withMessage('Answer is required'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  questionValidationRules,
  validate,
};
