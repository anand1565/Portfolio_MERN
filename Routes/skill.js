const express = require('express');
const router = express.Router();
const skillModel = require('../Models/skillsRouter');

router.post("/add", async (req, res) => {
    try {
        const skills = await skillModel.findOne({ skill: req.body.skill })
        if (skills) {
            return res.status(404).send({ msg: "Skill already exists" });
        }
        else {
            const newSkill = await skillModel.create({
                skill: req.body.skill
            })
            return res.status(201).json({ msg: "Skill created", newSkill });
        }

    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
});

router.get("/allskill", async (req, res) => {
    try {
        const skills = await skillModel.find();
        if (skills.length === 0) {
            return res.status(404).send("No skills found");
        }
        else {
            return res.status(200).json(skills);
        }
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

router.get("/skill/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const skill = await skillModel.findById(id);
        if (!skill) {
            return res.status(404).send("Skill not found");
        }
        else {
            return res.status(200).json({ msg: "user found", skill });
        }

    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const skill = await skillModel.findById(id);
        if (!skill) {
            return res.status(404).send("Skill not found");
        }
        else {
            const updateSkill = await skillModel.findByIdAndUpdate(id, req.body, { new: true });
            return res.status(201).json({ msg: "Successfully updated", updateSkill });
        }

    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const skill = await skillModel.findById(id);
        if (!skill) {
            return res.status(404).send("Skill not found");
        }
        else {
            const deletedSkill = await skillModel.findByIdAndDelete(id);
            return res.status(201).json({ msg: "Successfully deleted", deletedSkill });
        }

    } catch (error) {
        res.status(500).send("Internal server error");
    }
});



module.exports = router;