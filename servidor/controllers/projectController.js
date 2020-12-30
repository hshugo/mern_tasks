const Project= require('../models/Projects');
const {validationResult} = require ('express-validator');

exports.createProject = async (req, res) => {
    //See the errors the validate in route
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array() });
    } 

    //async always need try catch
    try {
        //create new project
        const project= new  Project(req.body); // this is ok because only have name
        project.creator= req.user.id;
        project.save();
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

//get all projects of user current
exports.getProjects = async (req,res) => {
    try {
        console.log(req.user);
        const projects = await Project.find({ creator: req.user.id });
        res.json({projects});
    } catch (error) {
        console.log(error);
        res.status(500).send('there is one error');
    }
}

//Update projects
exports.updateProject = async (req,res) => {
    //req the name of project
    const name = req.body;
    const newProject = {};
    
    if(name){
        console.log('NAME:',name);
        newProject.name=name;
    }
    try {
        //review the id
        let project = await Project.findById(req.params.id);

        //validate if the project exist
        if(!project) {
            res.status(404).json({msg: 'project not found'});
        }

        //verify the creator of project
        if(project.creator.toString()!== req.user.id) {
            res.status(401).json({mge: 'No auth this user'});
        }
        
        //update
        /*
        project = await Project.findOneAndUpdate({ _id: req.params.id }, { name: newProject.name }, 
            function(err, result) {
            if (err) {
              res.send(err);
            } else {
              res.send(result);
            }
          }
          );
          */
        res.json({project});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in the server');
    }
}

//Update projects
exports.deleteProject = async (req,res) => {
    //req the name of project
    const name = req.body;
    const newProject = {};
    
    if(name){
        newProject.name=name;
    }
    try {
        //review the id
        let project = await Project.findById(req.params.id);

        //validate if the project exist
        if(!project) {
            res.status(404).json({msg: 'project not found'});
        }

        //verify the creator of project
        if(project.creator.toString()!== req.user.id) {
            res.status(401).json({mge: 'No auth this user'});
        }
        
        //update
        project = await Project.findOneAndRemove({ _id: req.params.id });
        res.json({msg:'Project deleted'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in the server');
    }
}