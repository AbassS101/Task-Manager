// server/middleware/taskValidation.js
const { body, param, validationResult } = require('express-validator');

exports.validateTask = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title must be at most 100 characters long'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description must be at most 500 characters long'),
  body('status')
    .isIn(['To Do', 'In Progress', 'Done']).withMessage('Invalid status'),
  body('dueDate')
    .optional()
    .isISO8601().toDate().withMessage('Invalid due date'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateTaskId = [
  param('id').isMongoId().withMessage('Invalid task ID'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];