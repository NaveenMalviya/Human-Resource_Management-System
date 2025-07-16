const Profile = require('../models/profileModel');
const status = require('../config/status');

// Create a new profile
exports.createProfile = async (req, res) => {
    try {
        const profileData = {
            profile: req.body.profile,
            profile_id: req.body.profile_id,
        };

        const newProfile = new Profile(profileData);
        await newProfile.save();
        res.json({ success: true, status: status.OK, msg: 'Profile created successfully.', data: newProfile });
    } catch (err) {
        console.error("Error", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Profile creation failed.' });
    }
};

// Get all profiles
exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find({}).lean().exec();
        return res.json({ data: profiles, success: true, status: status.OK });
    } catch (err) {
        console.error(`Error: ${err}`);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get profiles failed.' });
    }
};

// Get a profile by ID
exports.getProfileById = async (req, res) => {
    try {
        const profileId = req.query.id;
        if (!profileId) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'ID parameter not available' });
        }

        const profile = await Profile.findOne({ _id: profileId }).lean().exec();
        return res.json({ data: profile, success: true, status: status.OK });
    } catch (err) {
        console.error("Error in getting profile by ID:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get profile failed.' });
    }
};

// Update a profile by ID
exports.updateProfile = async (req, res) => {
    const id = req.body._id;
    if (!id) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'ID parameter not available' });
    }

    try {
        let result = await Profile.findOneAndUpdate(
            { _id: id },
            { $set: req.body },
            { new: true } // Return the updated document
        ).lean().exec();

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Profile updated successfully.', data: result });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Profile ID not found' });
        }
    } catch (err) {
        console.error("Error in updating profile:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update profile failed.' });
    }
};

// Delete a profile by ID
exports.deleteProfile = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'ID parameter not available' });
        }

        let result = await Profile.findOneAndDelete({ _id: id }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Profile deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Profile ID not found' });
        }
    } catch (err) {
        console.error("Error in deleting profile:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete profile failed.' });
    }
};

// Multi-delete profiles by array of IDs
exports.multiDeleteProfiles = async (req, res) => {
    try {
        const ids = req.body.ids;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, status: status.INVALIDSYNTAX, msg: 'IDs parameter not available or invalid' });
        }

        const result = await Profile.deleteMany({ _id: { $in: ids } }).lean().exec();

        if (result.deletedCount > 0) {
            res.status(200).json({ success: true, status: status.OK, msg: 'Profiles deleted successfully.' });
        } else {
            res.status(404).json({ success: false, status: status.NOTFOUND, msg: 'No profiles found with the given IDs.' });
        }
    } catch (error) {
        console.error("Error in multi-delete:", error);
        res.status(500).json({ success: false, status: status.INTERNAL_SERVER_ERROR, msg: error.message });
    }
};

// Search profiles by query
exports.searchProfiles = async (req, res) => {
    try {
        const query = req.query.search;

        if (!query) {
            return res.status(400).json({ success: false, status: status.INVALIDSYNTAX, msg: 'No search query provided' });
        }

        const searchQuery = {
            $or: [
                { profile: { $regex: new RegExp(query, "i") } },
                { profile_id: { $regex: new RegExp(query, "i") } }
            ]
        };

        const results = await Profile.find(searchQuery).lean().exec();
        res.json({ success: true, status: status.OK, data: results });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, status: status.INTERNAL_SERVER_ERROR, msg: 'Internal Server Error' });
    }
};
