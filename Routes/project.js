const express = require('express')
const router = express.Router();
const projectModel = require('../Models/projectModel');

router.get("/", (req, res) => {
    res.send("Project details");
})

router.post('/create', async (req, res) => {
    try {
        const projects = await projectModel.create({
            title: req.body.title,
            description: req.body.description,
            skills: req.body.skills,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            githubLink: req.body.githubLink,
            deploymentLink: req.body.deploymentLink
        })
        res.status(201).json(projects);

    } catch (error) {
        res.status(404).send("Projects not found");
    }
})

router.get("/allprojects", async (req, res) => {
    try {
        const allprojects = await projectModel.find();
        res.status(200).send(allprojects)
    } catch (error) {
        res.status(404).send("Projects not found");
    }
})

router.get("/singleproject/:id", async (req, res) => {
    try {
        const project = await projectModel.findById(req.params.id);
        if (!project) {
            return res.status(404).send("Project with this id not found");
        }
        else {
            return res.status(200).json(project);
        }
        res.status(200).send(allprojects)
    } catch (error) {
        res.status(404).send("Projects not found");
    }
})

router.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const project = await projectModel.findById(id);
        if (!project) {
            return res.status(404).send("Project not found");
        }
        else {
            const updateProject = await projectModel.findByIdAndUpdate(id, req.body, { new: true });
            if (req.body.skills) {
                projectModel.skills = req.body.skills
            }
            updateProject.save();
            return res.status(200).send("Project details updated successfully");
        }

    } catch (error) {
        res.status(404).send("Project not found");
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const project = await projectModel.findById(id);
        if (!project) {
            return res.status(404).send("Project not found");
        }
        else {
            const deletedProject = await projectModel.findByIdAndDelete(id);
            return res.status(200).json({ deletedProject: deletedProject, msg: "Project deleted successfully" });

        }

    } catch (error) {
        res.send(404).send("Project not found");
    }
})


module.exports = router;