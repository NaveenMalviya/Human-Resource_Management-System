const Skills = require('../models/skillModel');
const status = require('../config/status');

// Create a new skill
exports.createSkill = async (req, res) => {
    try {
        const skillData = {
            skills: req.body.skills,
            profile_id: req.body.profile_id,
            profile: req.body.profile,
            description: req.body.description
        };

        const newSkill = new Skills(skillData);
        await newSkill.save();
        res.json({ success: true, status: status.OK, msg: 'Skill created successfully.', data: newSkill });
    } catch (err) {
        console.error("Error:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Skill creation failed.' });
    }
};

// Get all skills
exports.getAllSkills = async (req, res) => {
    try {
        const skills = await Skills.find({}).lean().exec();
        return res.json({ success: true, status: status.OK, data: skills });
    } catch (err) {
        console.error("Error:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get skills failed.' });
    }
};

// Get a skill by ID
exports.getSkillById = async (req, res) => {
    try {
        const skillId = req.query.id;
        if (!skillId) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'ID parameter not available' });
        }

        const skill = await Skills.findById(skillId).lean().exec();
        if (!skill) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Skill not found' });
        }
        res.json({ success: true, status: status.OK, data: skill });
    } catch (err) {
        console.error("Error:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get skill failed.' });
    }
};

// Update a skill by ID
exports.updateSkill = async (req, res) => {
    const skillId = req.body._id;
    if (!skillId) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'ID parameter not available' });
    }

    try {
        const updatedSkill = await Skills.findByIdAndUpdate(skillId, { $set: req.body }, { new: true }).lean().exec();
        if (!updatedSkill) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Skill not found' });
        }
        res.json({ success: true, status: status.OK, msg: 'Skill updated successfully.', data: updatedSkill });
    } catch (err) {
        console.error("Error:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update skill failed.' });
    }
};

// Delete a skill by ID
exports.deleteSkill = async (req, res) => {
    const skillId = req.query.id;
    if (!skillId) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'ID parameter not available' });
    }

    try {
        const deletedSkill = await Skills.findByIdAndDelete(skillId).lean().exec();
        if (!deletedSkill) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Skill not found' });
        }
        res.json({ success: true, status: status.OK, msg: 'Skill deleted successfully.' });
    } catch (err) {
        console.error("Error:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete skill failed.' });
    }
};

// Multi-delete skills by array of IDs
exports.multiDeleteSkills = async (req, res) => {
    try {
        const ids = req.body.ids;
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'IDs parameter not available or invalid' });
        }

        const result = await Skills.deleteMany({ _id: { $in: ids } }).lean().exec();
        if (result.deletedCount > 0) {
            res.json({ success: true, status: status.OK, msg: 'Skills deleted successfully.' });
        } else {
            res.json({ success: false, status: status.NOTFOUND, msg: 'No skills found with the given IDs.' });
        }
    } catch (error) {
        console.error("Error in multi-delete:", error);
        res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, msg: 'Failed to delete skills', error: error.message });
    }
};

// Search skills by query
exports.searchSkills = async (req, res) => {
    try {
        const query = req.query.search;
        if (!query) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'No search query provided' });
        }

        const searchQuery = {
            $or: [
                { skills: { $regex: new RegExp(query, 'i') } },
                { description: { $regex: new RegExp(query, 'i') } }
            ]
        };

        const results = await Skills.find(searchQuery).lean().exec();
        if (results.length === 0) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'No skills found' });
        }

        res.json({ success: true, status: status.OK, data: results });
    } catch (err) {
        console.error("Error:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, msg: 'Search skills failed', error: err.message });
    }
};
