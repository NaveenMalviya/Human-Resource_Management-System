const candidate = require("../models/candidateModel");
const status = require("../config/status");
const fs = require('fs'); // Importing fs with promises
const csvtojson = require('csvtojson');
const axios = require('axios');
const csv = require('csv-parser');
const path = require('path');
const RecruitmentModel = require('../models/Recruitment.model');
const { resolveTxt } = require("dns/promises");
const nodemailer = require('nodemailer');
const { parse } = require('json2csv');

function isValidBase64(str) {
    try {
        return btoa(atob(str)) === str;
    } catch (err) {
        return false;
    }
}
function capitalizeWords(str) {
    if (typeof str !== 'string') return str; // Return the input if it's not a string
    return str.replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word
}
// // Signup or Create candidate
exports.create = async (req, res) => {
    try {
        var uploadDir = process.cwd() + '/public/';
        var resumeUploadDir = uploadDir + "candidate/document/";

        if (!fs.existsSync(resumeUploadDir)) {
            fs.mkdirSync(resumeUploadDir, { recursive: true });
        }

        let resumePromise = await new Promise(async function (resolve, reject) {
            var resumePdfFile = req.body.candidate_document_proof;
            var resumePdfName = req.body.resumePdfName;
        
            if (resumePdfFile && resumePdfName) {
                var current_time = new Date().getTime();
                var fileName = current_time;
                var extension = resumePdfName.split('.').pop().toLowerCase();
                var finalname = fileName + "." + extension;
        
                if (extension == 'pdf') {
                    var base64Data = resumePdfFile.replace(/^data:application\/pdf;base64,/, "");
                    const buffer = Buffer.from(base64Data, 'base64');
                    if (buffer.length > 0) {
                        await fs.writeFileSync(resumeUploadDir + finalname, base64Data, 'base64');
                        resolve({ status: 'true', finalname: finalname, fileExt: extension });
                    } else {
                        resolve({ status: 'true', finalname: '', fileExt: '' });
                    }
                } else {
                    resolve({ status: 'true', finalname: '', fileExt: '' });
                }
            } else {
                resolve({ status: 'true', finalname: '', fileExt: '' });
            }
        });
        

        if (resumePromise.status == 'true') {
            let resumeFinalname = resumePromise.finalname;
            var resumeFullPdfUrl = '';
            if (resumeFinalname != '') {
                resumeFullPdfUrl = "candidate/document/" + resumeFinalname;
            }

            var obj = {
                candidate_id: req.body.candidate_id,
                candidate_first_name: capitalizeWords(req.body.candidate_first_name),
                candidate_last_name: capitalizeWords(req.body.candidate_last_name),
                candidate_mobile: req.body.candidate_mobile,
                candidate_alternate_mobile: req.body.candidate_alternate_mobile,
                candidate_email: req.body.candidate_email,
                candidate_skype: req.body.candidate_skype,
                candidate_linkedIn_profile: req.body.candidate_linkedIn_profile,
                candidate_skills: req.body.candidate_skills,
                candidate_experience: req.body.candidate_experience,
                candidate_expected_salary: req.body.candidate_expected_salary,
                candidate_expected_joining_date: req.body.candidate_expected_joining_date,
                candidate_marrital_status: req.body.candidate_marrital_status,
                interview_rounds:req.body.interview_rounds,
                candidate_selection_status: req.body.candidate_selection_status,
                candidate_feedback: req.body.candidate_feedback,
                source_of_candidate: req.body.source_of_candidate,
                candidate_address: req.body.candidate_address,
                candidate_document_proof: resumeFullPdfUrl,
                tenth_percentage: req.body.tenth_percentage,
                twelfth_percentage: req.body.twelfth_percentage,
                graduationPercentage: req.body.graduationPercentage,
                postGraduationPercentage:req.body.postGraduationPercentage,
                profile: req.body.profile
            };

            const newcandidate = new candidate(obj);
            let result = await newcandidate.save();

            // Update no_of_candidate in Recruitment Model based on profile
            await RecruitmentModel.findOneAndUpdate(
                { profile_id: req.body.profile }, // Find by profile field from candidate
                { $inc: { no_of_candidate: 1 } }, // Increment no_of_candidate by 1
                { new: true } // To return the updated document
            );
            res.json({ success: true, status: status.OK, msg: 'Candidate is added successfully.' });
        }
    } catch (err) {
        console.error("Error:", err);
        if (err.code === 11000 && err.keyPattern && err.keyPattern.candidate_email) {
            return res.json({ success: false, status: status.BAD_REQUEST, msg: 'This email is already registered.' });
        } else if (err.code === 11000 && err.keyPattern && err.keyPattern.candidate_id) {
            return res.json({ success: false, status: status.BAD_REQUEST, msg: 'This Id is already registered.' });
        } else {
            // For other errors
            return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Adding Candidate failed.' });
        }
    }
};


// Get All candidates
exports.getcandidates = async (req, res) => {
    try {
        const data = await candidate.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.log("The Error is " + err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get candidates failed.' });
    }
};

// Update candidate updateCandidate
exports.update = async (req, res) => {
    console.log("dust---", req.body)
    try {

        const candidateId = req.body.id;
        if (!candidateId) {
            return res.status(400).json({ success: false, msg: 'Candidate ID is required for update.' });
        }
        const existingCandidate = await candidate.findById(candidateId);
        if (!existingCandidate) {
            return res.status(404).json({ success: false, msg: 'Candidate not found.' });
        }

        var uploadDir = process.cwd() + '/public/';
        var resumeUploadDir = uploadDir + "candidate/document/";

        if (!fs.existsSync(resumeUploadDir)) {
            fs.mkdirSync(resumeUploadDir, { recursive: true });
        }

        let resumePromise = await new Promise(async function (resolve, reject) {
            var resumePdfFile = req.body.candidate_document_proof;

            if (resumePdfFile) {
                console.log("hiiiiii")
                var resumePdfName = req.body.resumePdfName;
                var current_time = new Date().getTime();
                var fileName = current_time;
                var extension = resumePdfName.split('.').pop().toLowerCase();
                var finalname = fileName + "." + extension;

                if (extension == 'pdf') {
                    var base64Data = resumePdfFile.replace(/^data:application\/pdf;base64,/, "");
                    const decodedData = base64Data;
                    if (!isValidBase64(decodedData)) {
                        return res.status(400).send({ message: "Invalid base64 string" });
                    } else {
                        const buffer = Buffer.from(base64Data, 'base64');
                        if (buffer.length > 0) {
                            await fs.writeFileSync(resumeUploadDir + finalname, base64Data, 'base64');
                            resolve({ status: 'true', finalname: finalname, fileExt: extension });
                        } else {
                            resolve({ status: 'true', finalname: '', fileExt: '' });
                        }
                    }
                }

                // else {
                //     resolve({ status: 'true', finalname: '', fileExt: '' });
                // }
            } else {
                resolve({ status: 'true', finalname: '', fileExt: '' });
            }
        });
        if (resumePromise.status == 'true') {
            let resumeFinalname = resumePromise.finalname;
            var resumeFullPdfUrl = '';
            if (resumeFinalname) {
                resumeFullPdfUrl = "candidate/document/" + resumeFinalname;
            }
            else {
                resumeFullPdfUrl = undefined
            }

            console.log("resumeFinalname", resumeFinalname)
            console.log("resumeFullPdfUrl", resumeFullPdfUrl)

            // Prepare object for candidate update
            var obj = {
                candidate_id: req.body.candidate_id,
                candidate_first_name: capitalizeWords(req.body.candidate_first_name),
                candidate_last_name: capitalizeWords(req.body.candidate_last_name),
                candidate_mobile: req.body.candidate_mobile,
                candidate_alternate_mobile: req.body.candidate_alternate_mobile,
                candidate_email: req.body.candidate_email,
                candidate_skype: req.body.candidate_skype,
                candidate_linkedIn_profile: req.body.candidate_linkedIn_profile,
                candidate_skills: req.body.candidate_skills,
                candidate_experience: req.body.candidate_experience,
                candidate_expected_salary: req.body.candidate_expected_salary,
                candidate_expected_joining_date: req.body.candidate_expected_joining_date,
                candidate_marrital_status: req.body.candidate_marrital_status,
                interview_rounds:req.body.interview_rounds,
                candidate_selection_status: req.body.candidate_selection_status,
                candidate_feedback: req.body.candidate_feedback,
                source_of_candidate: req.body.source_of_candidate,
                candidate_address: req.body.candidate_address,
                candidate_document_proof: resumeFullPdfUrl,
                tenth_percentage: req.body.tenth_percentage,
                twelfth_percentage: req.body.twelfth_percentage,
                graduationPercentage: req.body.graduationPercentage,
                postGraduationPercentage:req.body.postGraduationPercentage,
                profile: req.body.profile
            };
            // Find the existing candidate profile
            const oldProfile = existingCandidate.profile;
            // Update the candidate
            const updatedCandidate = await candidate.findByIdAndUpdate(
                candidateId,
                { $set: obj },
                { new: true } // Return the updated document
            );
            // Update no_of_candidate in Recruitment Model
            if (oldProfile !== req.body.profile) {
                // Decrement old profile count
                await RecruitmentModel.findOneAndUpdate(
                    { profile_id: oldProfile },
                    { $inc: { no_of_candidate: -1 } },
                    { new: true }
                );
                // Increment new profile count
                await RecruitmentModel.findOneAndUpdate(
                    { profile_id: req.body.profile },
                    { $inc: { no_of_candidate: 1 } },
                    { new: true }
                );
            }

            // Respond with success message and updated Candidate data
            res.json({ success: true, msg: 'Candidate updated successfully.', candidate: updatedCandidate });
        }
    } catch (err) {
        console.error("Error:", err);
        if (err.code === 11000 && err.keyPattern && err.keyPattern.candidate_email) {
            return res.json({ success: false, status: status.BAD_REQUEST, msg: 'This email is already registered.' });
        } else if (err.code === 11000 && err.keyPattern && err.keyPattern.candidate_id) {
            return res.json({ success: false, status: status.BAD_REQUEST, msg: 'This Id is already registered.' });
        } else {
            // For other errors
            return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Updating Candidate failed.' });
        }
    }
};
// Get candidate By ID
exports.getCandidateById = async (req, res) => {
    try {
        let candidateId = req.query._id;
        if (candidateId === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        const data = await candidate.findOne({ _id: candidateId }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get candidate failed.' });
    }
};

// Delete candidate
exports.deleteCandidate = async (req, res) => {
    try {
        const ID = req.query._id;
        if (ID === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        let result = await candidate.findOneAndDelete({ _id: ID }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'candidate is deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'candidate Id not found' });
        }
    } catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete candidate data failed.' });
    }
};

// Multi Delete candidates
// exports.multiDeletecandidates = async (req, res) => {
//     try {
//         const ids = req.body.ids;
//         if (!ids || ids.length === 0) {
//             return res.json({ success: false, status: status.NOTFOUND, msg: 'Ids Parameter Not Available' });
//         }
//         await candidate.deleteMany({ _id: { $in: ids } }).lean().exec();
//         res.json({ success: true, status: status.OK, msg: 'candidates are deleted successfully.' });
//     } catch (err) {
//         return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete candidates failed.' });
//     }
// };

exports.multiDeletecandidates = async (req, res) => {
    console.log("Request received for multi-delete", req.body);
    try {
        const ids = req.body.ids;
        if (!ids || ids.length === 0) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Ids Parameter Not Available' });
        }
        await candidate.deleteMany({ _id: { $in: ids } }).lean().exec();
        res.json({ success: true, status: status.OK, msg: 'Candidates deleted successfully.' });
    } catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete candidates failed.' });
    }
};


// // Search candidates
// exports.searchCandidates = async (req, res) => {
//     try {
//         const query = req.query.search;
//         if (!query) {
//             return res.status(400).json({ error: 'No search query provided' });
//         }

//         const searchTerms = query.split(',').map(term => term.trim());

//         const searchQuery = {
//             $or: [
//                 { candidate_first_name: { $regex: new RegExp(query, "i") } },
//                 { candidate_last_name: { $regex: new RegExp(query, "i") } },
//                 { candidate_email: { $regex: new RegExp(query, "i") } },
//                 { candidate_city: { $regex: new RegExp(query, "i") } },
//                 { candidate_state: { $regex: new RegExp(query, "i") } }
//             ]
//         };

//         searchTerms.forEach(term => {
//             searchQuery.$or.push({
//                 candidate_skills: { $regex: new RegExp(term, "i") }
//             });
//         });

//         const results = await candidate.find(searchQuery);
//         res.json(results);
//     } catch (err) {
//         console.error("Error:", err);
//         return res.status(500).json({ success: false, status: 500, msg: 'Internal Server Error' });
//     }
// };



exports.countCandidates = async (req, res) => {
    try {
        const count = await candidate.countDocuments({}).exec();
        res.json({ success: true, status: status.OK, count: count });
    } catch (err) {
        console.log("Error counting candidates", err);
        res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, msg: 'Failed to count candidates.', err: err });
    }
};


exports.search = async (req, res) => {
    try {
        const query = req.query.profile;

        if (!query) {
            return res.status(400).json({ error: 'No search query provided' });
        }
        const searchQuery = {
            $or: [
                { candidate_first_name: { $regex: new RegExp(query, "i") } },
                { candidate_last_name: { $regex: new RegExp(query, "i") } },
                { candidate_email: { $regex: new RegExp(query, "i") } },
                { candidate_mobile: { $regex: new RegExp(query, "i") } },
                { profile: { $regex: new RegExp(query, "i") } },
                { candidate_skills: { $elemMatch: { $regex: new RegExp(query, "i") } } },
                { candidate_skype: { $regex: new RegExp(query, "i") } },
                { candidate_linkedIn_profile: { $regex: new RegExp(query, "i") } },
                { candidate_experience: { $regex: new RegExp(query, "i") } },
                { candidate_address: { $regex: new RegExp(query, "i") } },
            ]
        };
        // Check if the query contains both first and last names
        if (query.includes(' ')) {
            const [firstName, lastName] = query.split(' ');
            // Update search query to match both first and last names together
            searchQuery.$or.push({
                $and: [
                    { candidate_first_name: { $regex: new RegExp(firstName, "i") } },
                    { candidate_last_name: { $regex: new RegExp(lastName, "i") } }
                ]
            });
        }
        // Perform search using Mongoose's find method
        const results = await candidate.find(searchQuery);
        res.json(results);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, status: 500, msg: 'Internal Server Error' });
    }
}

exports.export = async (req, res) => {
    const { csvData, filename } = req.body;

    if (!csvData || !filename) {
        console.error('Missing csvData or filename');
        return res.status(400).json({ error: 'Missing csvData or filename' });
    }

    const filePath = path.join(__dirname, 'download', filename);

    try {
        // Convert CSV to JSON
        const jsonData = await csvtojson().fromString(csvData);

        // Remove the _id field from each document
        const modifiedData = jsonData.map(({ _id, ...rest }) => rest);

        // Convert JSON back to CSV
        const csv = parse(modifiedData);

        console.log(`Saving file to ${filePath}`); // Log the file path

        fs.writeFile(filePath, csv, (err) => {
            if (err) {
                console.error('Failed to save file:', err); // Log error details
                return res.status(500).json({ error: 'Failed to save file' });
            }
            console.log('File saved successfully'); // Log success
            res.json({ message: 'File saved successfully', path: `/download/${filename}` });
        });
    } catch (error) {
        console.error('Error processing CSV data:', error);
        res.status(500).json({ error: 'Error processing CSV data' });
    }
};

exports.sendEmail = async (req, res) => {
    try {
        const emails = req.body && req.body.emails ? req.body.emails : [];

        if (!Array.isArray(emails) || emails.length === 0) {
            return res.json({ success: false, status: 'INVALIDSYNTAX', msg: 'Invalid email list.' });
        }

        // Create the transporter object
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mahimagarg1602@gmail.com',
                pass: 'uixv laul bjpd tqcc'
            }
        });

        const sendMailPromises = emails.map(async (email) => {
            const user = await candidate.findOne({ candidate_email: new RegExp(`^${email}$`, 'i') }).lean().exec();

            if (!user) {
                console.log(`User not found in database: ${email}`);
            }

            const mailOptions = {
                from: 'mailto:mahimagarg1602@gmail.com',
                to: email,
                subject: 'Requirement..Hiring',
                text: 'Hello world?',
                html: `
                    <h2>About the Role:</h2>
                    <p>We are seeking a skilled and passionate Laravel Developer to join our dynamic team. The ideal candidate will have 2-3 years of experience in developing robust and scalable web applications using the Laravel framework.</p>
                    <h2>Key Responsibilities:</h2>
                    <ol>
                        <li>Develop, test, and maintain web applications using Laravel.</li>
                        <li>Collaborate with cross-functional teams to define, design, and ship new features.</li>
                        <li>Troubleshoot, test, and maintain the core product software and databases to ensure strong optimization and functionality.</li>
                    </ol>
                    <h2>Required Skills:</h2>
                    <ul>
                        <li>2-3 years of experience in Laravel development.</li>
                        <li>Strong knowledge of PHP Framework.</li>
                        <li>Experience with front-end technologies such as JavaScript, HTML, and CSS.</li>
                        <li>Familiarity with version control tools (e.g., Git).</li>
                        <li>Knowledge of database design and querying using MySQL.</li>
                    </ul>
                    <h2>Why Join Us:</h2>
                    <ul>
                        <li>Opportunity to work on exciting projects with a talented team.</li>
                        <li>Competitive salary and benefits package.</li>
                        <li>Continuous learning and professional development opportunities.</li>
                        <li>Positive and inclusive work environment.</li>
                    </ul>
                    <p>Thank you</p>
                `,
            };

            return transporter.sendMail(mailOptions)
                .then(info => {
                    console.log(`Message sent to ${email}: %s`, info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    return `Message sent to ${email}`;
                })
                .catch(error => {
                    console.error(`Error sending mail to ${email}:`, error);
                    return `Error sending mail to ${email}: ${error.message}`;
                });
        });

        const results = await Promise.all(sendMailPromises);

        res.json({ success: true, status: 'OK', msg: 'Emails sent to the provided email addresses.', results });

    } catch (e) {
        console.log("Error:", e);
        return res.json({ success: false, status: 'INVALIDSYNTAX', err: e, msg: 'Error in sending emails.' });
    }
};
