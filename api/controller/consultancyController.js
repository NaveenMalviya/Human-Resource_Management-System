// const Consultancy = require('../models/consultancyModel');

// // Create a new consultancy
// exports.createConsultancy = async (req, res) => {
//     try {
//         const consultancy = new Consultancy(req.body);
//         await consultancy.save();
//         res.status(201).json({ success: true, msg: 'Consultancy created successfully', data: consultancy });
//     } catch (err) {
//         res.status(400).json({ success: false, msg: 'Failed to create consultancy', error: err.message });
//     }
// };

// // Get all consultancies
// exports.getAllConsultancies = async (req, res) => {
//     try {
//         const consultancies = await Consultancy.find().lean().exec();
//         res.status(200).json({ success: true, data: consultancies });
//     } catch (err) {
//         res.status(500).json({ success: false, msg: 'Failed to fetch consultancies', error: err.message });
//     }
// };

// // Get consultancy by ID
// exports.getConsultancyById = async (req, res) => {
//     try {
//         const consultancy = await Consultancy.findById(req.params.id).lean().exec();
//         if (!consultancy) {
//             return res.status(404).json({ success: false, msg: 'Consultancy not found' });
//         }
//         res.status(200).json({ success: true, data: consultancy });
//     } catch (err) {
//         res.status(500).json({ success: false, msg: 'Failed to fetch consultancy', error: err.message });
//     }
// };

// // Update consultancy
// exports.updateConsultancy = async (req, res) => {
//     const id = req.body._id;
//     if (!id) {
//         return res.status(400).json({ success: false, msg: 'Id Parameter Not Available' });
//     }
//     try {
//         const consultancy = await Consultancy.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true, runValidators: true }).lean().exec();
//         if (!consultancy) {
//             return res.status(404).json({ success: false, msg: 'Consultancy not found' });
//         }
//         res.status(200).json({ success: true, msg: 'Consultancy updated successfully', data: consultancy });
//     } catch (err) {
//         res.status(500).json({ success: false, msg: 'Failed to update consultancy', error: err.message });
//     }
// };

// // Delete consultancy
// exports.deleteConsultancy = async (req, res) => {
//     try {
//         const consultancy = await Consultancy.findByIdAndDelete(req.params.id).lean().exec();
//         if (!consultancy) {
//             return res.status(404).json({ success: false, msg: 'Consultancy not found' });
//         }
//         res.status(200).json({ success: true, msg: 'Consultancy deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ success: false, msg: 'Failed to delete consultancy', error: err.message });
//     }
// };

// // Multi-delete consultancies
// exports.multiDeleteConsultancies = async (req, res) => {
//     try {
//         const ids = req.body.ids;
//         if (!ids || ids.length === 0) {
//             return res.status(400).json({ success: false, msg: 'Ids parameter not available' });
//         }
//         await Consultancy.deleteMany({ _id: { $in: ids } }).lean().exec();
//         res.json({ success: true, msg: 'Consultancies deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ success: false, msg: 'Failed to delete consultancies', error: err.message });
//     }
// };


// // Search consultancy
// exports.searchConsultancies = async (req, res) => {
//     try {
//         const query = req.query.search;
//         if (!query) {
//             return res.status(400).json({ success: false, msg: 'No search query provided' });
//         }

//         const searchQuery = {
//             $or: [
//                 { consultancy_name: { $regex: new RegExp(query, "i") } },
//                 { consultancy_email: { $regex: new RegExp(query, "i") } },
//                 { consultancy_city: { $regex: new RegExp(query, "i") } },
//                 { consultancy_state: { $regex: new RegExp(query, "i") } },
//                 { contract_person_name: { $regex: new RegExp(query, "i") } }
//             ]
//         };

//         const results = await Consultancy.find(searchQuery).lean().exec();
//         if (results.length === 0) {
//             return res.status(404).json({ success: false, msg: 'No consultancies found' });
//         }
//         res.status(200).json({ success: true, data: results });
//     } catch (err) {
//         res.status(500).json({ success: false, msg: 'Failed to fetch consultancies', error: err.message });
//     }
// };


const consultancyModel = require('../models/consultancyModel');
const status = require('../config/status');

// Create a new consultancy
exports.createConsultancy = async (req, res) => {
    try {
        // Check if a consultancy with the same ID or email already exists


        const consultancyData = {
            consultancy_id: req.body.consultancy_id,
            consultancy_name: req.body.consultancy_name,
            consultancy_email: req.body.consultancy_email,
            consultancy_website_url: req.body.consultancy_website_url,
            consultancy_mobile: req.body.consultancy_mobile,
            consultancy_alternate_mobile: req.body.consultancy_alternate_mobile,
            consultancy_city: req.body.consultancy_city,
            consultancy_state: req.body.consultancy_state,
            consultancy_address: req.body.consultancy_address,
            contract_agreement: req.body.contract_agreement,
            contract_person_name: req.body.contract_person_name,
            contract_linkedIn_Profile: req.body.contract_linkedIn_Profile
        };

        const newConsultancy = new consultancyModel(consultancyData);
        await newConsultancy.save();
        res.json({ success: true, status: status.OK, msg: 'Consultancy created successfully.' });

    } catch (err) {
        console.error("Error", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Consultancy creation failed.' });
    }
};

// Get all consultancies
exports.getConsultancy = async (req, res) => {
    try {
        const data = await consultancyModel.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.error(`Error: ${err}`);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get consultancies failed.' });
    }
};

// Update a consultancy by ID
exports.updateConsultancy = async (req, res) => {
    const id = req.body._id;
    if (!id) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'ID parameter not available' });
    }

    try {
        let result = await consultancyModel.findOneAndUpdate(
            { _id: id },
            { $set: req.body },
            { new: true } // Return the updated document
        ).lean().exec();

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Consultancy updated successfully.', data: result });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Consultancy ID not found' });
        }
    } catch (err) {
        console.error("Error in updating consultancy:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update consultancy failed.' });
    }
};

// Get a consultancy by ID
exports.getConsultancyById = async (req, res) => {
    try {
        const consultancyId = req.query.id;
        if (!consultancyId) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'ID parameter not available' });
        }

        const data = await consultancyModel.findOne({ _id: consultancyId }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.error("Error in getting consultancy by ID:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get consultancy failed.' });
    }
};

// Delete a consultancy by ID
exports.deleteConsultancy = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'ID parameter not available' });
        }

        let result = await consultancyModel.findOneAndDelete({ _id: id }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Consultancy deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Consultancy ID not found' });
        }
    } catch (err) {
        console.error("Error in deleting consultancy:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete consultancy failed.' });
    }
};

// Multi-delete consultancies by array of IDs
exports.multiDelete = async (req, res) => {
    try {
        const ids = req.body.ids;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, status: status.INVALIDSYNTAX, msg: 'IDs parameter not available or invalid' });
        }

        const result = await consultancyModel.deleteMany({ _id: { $in: ids } }).lean().exec();

        if (result.deletedCount > 0) {
            res.status(200).json({ success: true, status: status.OK, msg: 'Consultancies deleted successfully.' });
        } else {
            res.status(404).json({ success: false, status: status.NOTFOUND, msg: 'No consultancies found with the given IDs.' });
        }
    } catch (error) {
        console.error("Error in multi-delete:", error);
        res.status(500).json({ success: false, status: status.INTERNAL_SERVER_ERROR, msg: error.message });
    }
};

// Search consultancies by query
exports.searchConsultancy = async (req, res) => {
    try {
        const query = req.query.search;

        if (!query) {
            return res.status(400).json({ success: false, status: status.INVALIDSYNTAX, msg: 'No search query provided' });
        }

        const searchQuery = {
            $or: [
                { consultancy_id: { $regex: new RegExp(query, "i") } },
                { consultancy_name: { $regex: new RegExp(query, "i") } },
                { consultancy_email: { $regex: new RegExp(query, "i") } },
                { consultancy_website_url: { $regex: new RegExp(query, "i") } },
                { consultancy_mobile: { $regex: new RegExp(query, "i") } },
                { consultancy_city: { $regex: new RegExp(query, "i") } },
                { consultancy_state: { $regex: new RegExp(query, "i") } },
                { contract_person_name: { $regex: new RegExp(query, "i") } },
                { contract_linkedIn_Profile: { $regex: new RegExp(query, "i") } }
            ]
        };

        const results = await consultancyModel.find(searchQuery).lean().exec();
        res.json({ success: true, status: status.OK, data: results });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, status: status.INTERNAL_SERVER_ERROR, msg: 'Internal Server Error' });
    }
};
