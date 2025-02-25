const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

//CourseController.index
router.get('/create', courseController.create)
router.get('/:id/edit', courseController.edit)
router.post('/form-trash-actions', courseController.formTrashActions)
router.post('/form-stored-actions', courseController.formStoredActions)
router.put('/:id', courseController.update)
router.delete('/:id', courseController.delete)
router.delete('/:id/force', courseController.forceDelete)
router.patch('/:id/restore', courseController.restore)
router.post('/store', courseController.store)
router.get('/:slug', courseController.show)

module.exports = router;