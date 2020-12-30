//Routes for create projects
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');
//Create projects
//post to api/projects
router.post('/', 
    auth,
    [
        check('name', 'the name of project is required').not().isEmpty() 
    ],
    projectController.createProject
    );
//get all projects
router.get('/', 
    auth, // only beacuse you need to see yours projects
    projectController.getProjects
);
//Update project by id
router.put('/:id', 
    auth, // only beacuse you need to see yours projects
    [
        check('name', 'the name of project is required').not().isEmpty() 
    ],
    projectController.updateProject
);

//Delete project by id
router.delete('/:id', 
    auth, // only beacuse you need access to yours projects
    projectController.deleteProject
);

module.exports = router;