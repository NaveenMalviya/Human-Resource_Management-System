const Employee = require("../models/employeeModel");
const status = require("../config/status");
const fs = require('fs'); // Importing fs with promises
const path = require('path');
const { resolveTxt } = require("dns/promises");
const nodemailer = require('nodemailer');

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


exports.signup = async (req, res) => {
    try {
        var uploadDir = process.cwd() + '/public/';
        var resumePdfUploadDir = uploadDir + "employee/resume_pdf/";
        var proofPdfUploadDir = uploadDir + "employee/proof_pdf/";
        var panPdfUploadDir = uploadDir + "employee/pan_card_pdf/";
        var expLetterPdfUploadDir = uploadDir + "employee/exe_letter_pdf/";
        var marksheetPdfUploadDir = uploadDir + "employee/marksheet_pdf/";
        var marksheetPdfUploadDir = uploadDir + "employee/marksheet_pdf/";
        var imageUploadDir = uploadDir + "employee/image/";

        if (!fs.existsSync(resumePdfUploadDir)) {
            fs.mkdirSync(resumePdfUploadDir, { recursive: true });
        }
        if (!fs.existsSync(proofPdfUploadDir)) {
            fs.mkdirSync(proofPdfUploadDir, { recursive: true });
        }
        if (!fs.existsSync(panPdfUploadDir)) {
            fs.mkdirSync(panPdfUploadDir, { recursive: true });
        }
        if (!fs.existsSync(expLetterPdfUploadDir)) {
            fs.mkdirSync(expLetterPdfUploadDir, { recursive: true });
        }
        if (!fs.existsSync(marksheetPdfUploadDir)) {
            fs.mkdirSync(marksheetPdfUploadDir, { recursive: true });
        }
        if (!fs.existsSync(imageUploadDir)) {
            fs.mkdirSync(imageUploadDir, { recursive: true });
        }
        let resumePromise = await new Promise(async function (resolve, reject) {
            var resumePdfFile = req.body.employee_resume;
            console.log("resumePdfFile", resumePdfFile)
            if (resumePdfFile) {
                var resumePdfName = req.body.resumePdfName;
                var current_time = new Date().getTime();
                var fileName = current_time;
                var extension = resumePdfName.split('.').pop().toLowerCase();
                var finalname = fileName + "." + extension;

                if (extension == 'pdf') {
                    var base64Data = resumePdfFile.replace(/^data:application\/pdf;base64,/, "");
                    const buffer = Buffer.from(base64Data, 'base64');
                    if (buffer.length > 0) {
                        await fs.writeFileSync(resumePdfUploadDir + finalname, base64Data, 'base64');
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

        let proofPromise = await new Promise(async function (resolve, reject) {
            var proofPdfFile = req.body.employee_id_proof;

            if (proofPdfFile) {
                var proofPdfName = req.body.proofPdfName;
                var current_time = new Date().getTime();
                var fileName = current_time;
                var extension = proofPdfName.split('.').pop().toLowerCase();
                var finalname = fileName + "." + extension;

                if (extension == 'pdf') {
                    var base64Data = proofPdfFile.replace(/^data:application\/pdf;base64,/, "");
                    const buffer = Buffer.from(base64Data, 'base64');
                    if (buffer.length > 0) {
                        await fs.writeFileSync(proofPdfUploadDir + finalname, base64Data, 'base64');
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

        let panPromise = await new Promise(async function (resolve, reject) {
            var panPdfFile = req.body.employee_pan_card;

            if (panPdfFile) {
                var panPdfName = req.body.panPdfName;
                var current_time = new Date().getTime();
                var fileName = current_time;
                var extension = panPdfName.split('.').pop().toLowerCase();
                var finalname = fileName + "." + extension;

                if (extension == 'pdf') {
                    var base64Data = panPdfFile.replace(/^data:application\/pdf;base64,/, "");
                    const buffer = Buffer.from(base64Data, 'base64');
                    if (buffer.length > 0) {
                        await fs.writeFileSync(panPdfUploadDir + finalname, base64Data, 'base64');
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

        let experiencePromise = await new Promise(async function (resolve, reject) {
            var experiencePdfFile = req.body.employee_experience_letter;
        
            if (experiencePdfFile) {
                var experiencePdfName = req.body.experiencePdfName;
        
                // Ensure experiencePdfName is defined
                if (experiencePdfName) {
                    var current_time = new Date().getTime();
                    var fileName = current_time;
                    var extension = experiencePdfName.split('.').pop().toLowerCase();
                    var finalname = fileName + "." + extension;
        
                    if (extension === 'pdf') {
                        var base64Data = experiencePdfFile.replace(/^data:application\/pdf;base64,/, "");
                        const buffer = Buffer.from(base64Data, 'base64');
                        if (buffer.length > 0) {
                            await fs.writeFileSync(expLetterPdfUploadDir + finalname, base64Data, 'base64');
                            resolve({ status: 'true', finalname: finalname, fileExt: extension });
                        } else {
                            resolve({ status: 'true', finalname: '', fileExt: '' });
                        }
                    } else {
                        resolve({ status: 'true', finalname: '', fileExt: '' });
                    }
                } else {
                    // If experiencePdfName is missing
                    resolve({ status: 'true', finalname: '', fileExt: '' });
                }
            } else {
                resolve({ status: 'true', finalname: '', fileExt: '' });
            }
        });
        
        

        let marksheetPromise = await new Promise(async function (resolve, reject) {
            var marksheetPdfFile = req.body.employee_marksheet;

            if (marksheetPdfFile) {
                var marksheetPdfName = req.body.marksheetPdfName;
                var current_time = new Date().getTime();
                var fileName = current_time;
                var extension = marksheetPdfName.split('.').pop().toLowerCase();
                var finalname = fileName + "." + extension;

                if (extension == 'pdf') {
                    var base64Data = marksheetPdfFile.replace(/^data:application\/pdf;base64,/, "");
                    const buffer = Buffer.from(base64Data, 'base64');
                    if (buffer.length > 0) {
                        await fs.writeFileSync(marksheetPdfUploadDir + finalname, base64Data, 'base64');
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

        let imagePromise = await new Promise(async function (resolve, reject) {
            var imageFile = req.body.image;
            var imageName = req.body.imageName;
        
            if (imageFile && imageName) { // Ensure both image file and image name are available
                var current_time = new Date().getTime();
                var fileName = current_time;
                var extension = imageName.split('.').pop().toLowerCase();
                var finalname = fileName + "." + extension;
        
                if (extension === 'png') { // Check if the file is PNG
                    var base64Data = imageFile.replace(/^data:image\/png;base64,/, ""); // Update regex for PNG image
                    const buffer = Buffer.from(base64Data, 'base64');
                    if (buffer.length > 0) {
                        await fs.writeFileSync(imageUploadDir + finalname, base64Data, 'base64');
                        resolve({ status: 'true', finalname: finalname, fileExt: extension });
                    } else {
                        resolve({ status: 'true', finalname: '', fileExt: '' });
                    }
                } else {
                    resolve({ status: 'true', finalname: '', fileExt: '' });
                }
            } else {
                // If image or image name is missing, handle it gracefully
                resolve({ status: 'true', finalname: '', fileExt: '' });
            }
        });
        

        if (resumePromise.status == 'true' && proofPromise.status == 'true') {
            let resumeFinalname = resumePromise.finalname;
            let proofFinalname = proofPromise.finalname;
            let panFinalname = panPromise.finalname;
            let experienceFinalname = experiencePromise.finalname;
            let marksheetFinalname = marksheetPromise.finalname;
            let imageFinalname = imagePromise.finalname;

            var resumeFullPdfUrl = '';
            var proofFullPdfUrl = '';
            var panFullPdfUrl = '';
            var experienceFullPdfUrl = '';
            var marksheetFullPdfUrl = '';
            var imageFullUrl = '';
            if (resumeFinalname != '') {
                resumeFullPdfUrl = "employee/resume_pdf/" + resumeFinalname;
            }

            if (proofFinalname != '') {
                proofFullPdfUrl = "employee/proof_pdf/" + proofFinalname;
            }
            if (panFinalname != '') {
                panFullPdfUrl = "employee/pan_card_pdf/" + panFinalname;
            }
            if (experienceFinalname != '') {
                experienceFullPdfUrl = "employee/experience_card_pdf/" + experienceFinalname;
            }
            if (marksheetFinalname != '') {
                marksheetFullPdfUrl = "employee/marksheet_pdf/" + marksheetFinalname;
            }
            if (imageFinalname != '') {
                imageFullUrl = "employee/image/" + imageFinalname;
            }

            var obj = {
                employee_code: req.body.employee_code,
                employee_first_name: capitalizeWords(req.body.employee_first_name),
                employee_last_name: capitalizeWords(req.body.employee_last_name),
                employee_mobile: req.body.employee_mobile,
                employee_alternate_mobile: req.body.employee_alternate_mobile,
                employee_email: req.body.employee_email,
                employee_password: req.body.employee_password,
                employee_address: req.body.employee_address,
                employee_city: capitalizeWords(req.body.employee_city),
                employee_state: capitalizeWords(req.body.employee_state),
                employee_other_info: req.body.employee_other_info,
                employee_dob: req.body.employee_dob,
                employee_doj: req.body.employee_doj,
                employee_skills: req.body.employee_skills,
                employee_experience: req.body.employee_experience,
                employee_resume: resumeFullPdfUrl, // Use resumeFullPdfUrl here
                employee_id_proof: proofFullPdfUrl, // Use proofFullPdfUrl here
                employee_pan_card: panFullPdfUrl,
                employee_experience_letter: experienceFinalname,
                employee_marksheet: marksheetFullPdfUrl,
                employee_permanant_address_proof: req.body.employee_permanant_address_proof,
                employee_local_address_proof: req.body.employee_local_address_proof,
                employee_reference_one_name: req.body.employee_reference_one_name,
                employee_reference_one_mobile: req.body.employee_reference_one_mobile,
                employee_reference_two_name: req.body.employee_reference_two_name,
                employee_reference_two_mobile: req.body.employee_reference_two_mobile,
                image: imageFullUrl
            };

            const newEmployee = new Employee(obj);
            let result = await newEmployee.save();

            res.json({ success: true, status: status.CREATED, msg: 'Employee is created successfully.' });
        }

    } catch (err) {
        console.log("error", err);
        if (err.code === 11000 && err.keyPattern && err.keyPattern.employee_code) {
            return res.json({ success: false, status: status.BAD_REQUEST, msg: 'Employee Code is already registered.' });
        }
        else if (err.code === 11000 && err.keyPattern && err.keyPattern.employee_email) {
            return res.json({ success: false, status: status.BAD_REQUEST, msg: 'This Email is already registered.' });
        }
        else {
            // For other errors
            return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Adding Employee failed.' });

        }
    }
}


const uploadFolder = path.join(__dirname, 'uploads'); // Folder ka path define karein

// Agar folder nahi hai to create karein
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

// Get All Employees
exports.getEmployees = async (req, res) => {
    try {
        const data = await Employee.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.log("The Error is " + err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get Employees failed.' });
    }
};



exports.updateEmployee = async (req, res) => {
    try {
        const employeeId = req.body._id;
        if (!employeeId) {
            return res.status(400).json({ success: false, msg: 'Employee ID is required for update.' });
        }
        const existingEmployee = await Employee.findById(employeeId);
        if (!existingEmployee) {
            return res.status(404).json({ success: false, msg: 'Employee not found.' });
        }
        // Code to handle file uploads...
        var uploadDir = process.cwd() + '/public/';
        var resumePdfUploadDir = uploadDir + "employee/resume_pdf/";
        var proofPdfUploadDir = uploadDir + "employee/proof_pdf/";
        var panPdfUploadDir = uploadDir + "employee/pan_card_pdf/";
        var expLetterPdfUploadDir = uploadDir + "employee/exe_letter_pdf/";
        var marksheetPdfUploadDir = uploadDir + "employee/marksheet_pdf/";
        var imageUploadDir = uploadDir + "employee/image/";

        // Check if upload directories exist, if not, create them
        if (!fs.existsSync(resumePdfUploadDir)) {
            fs.mkdirSync(resumePdfUploadDir, { recursive: true });
        }
        if (!fs.existsSync(proofPdfUploadDir)) {
            fs.mkdirSync(proofPdfUploadDir, { recursive: true });
        }
        if (!fs.existsSync(panPdfUploadDir)) {
            fs.mkdirSync(panPdfUploadDir, { recursive: true });
        }
        if (!fs.existsSync(expLetterPdfUploadDir)) {
            fs.mkdirSync(expLetterPdfUploadDir, { recursive: true });
        }
        if (!fs.existsSync(marksheetPdfUploadDir)) {
            fs.mkdirSync(marksheetPdfUploadDir, { recursive: true });
        }
        if (!fs.existsSync(imageUploadDir)) {
            fs.mkdirSync(imageUploadDir, { recursive: true });
        }

        // Processing file uploads for each type of document
        let resumePromise = await new Promise(async function (resolve, reject) {
            var resumePdfFile = req.body.employee_resume;
            console.log("resumePdfFile", resumePdfFile)
            
            // Check if both resumePdfFile and resumePdfName are provided
            if (resumePdfFile && req.body.resumePdfName) {
                var resumePdfName = req.body.resumePdfName;
                var current_time = new Date().getTime();
                var fileName = current_time;
                var extension = resumePdfName.split('.').pop().toLowerCase();
                var finalname = fileName + "." + extension;
        
                if (extension == 'pdf') {
                    var base64Data = resumePdfFile.replace(/^data:application\/pdf;base64,/, "");
                    const buffer = Buffer.from(base64Data, 'base64');
                    if (buffer.length > 0) {
                        await fs.writeFileSync(resumePdfUploadDir + finalname, base64Data, 'base64');
                        resolve({ status: 'true', finalname: finalname, fileExt: extension });
                    } else {
                        resolve({ status: 'true', finalname: '', fileExt: '' });
                    }
                } else {
                    resolve({ status: 'true', finalname: '', fileExt: '' });
                }
            } else {
                // If resumePdfFile or resumePdfName is missing, handle it gracefully
                resolve({ status: 'true', finalname: '', fileExt: '' });
            }
        });
        

        let proofPromise = await new Promise(async function (resolve, reject) {
            var proofPdfFile = req.body.employee_id_proof;
            var proofPdfName = req.body.proofPdfName;
        
            if (proofPdfFile && proofPdfName) {  // Ensure both proofPdfFile and proofPdfName are available
                var current_time = new Date().getTime();
                var fileName = current_time;
                var extension = proofPdfName.split('.').pop().toLowerCase();
                var finalname = fileName + "." + extension;
        
                if (extension === 'pdf') {
                    var base64Data = proofPdfFile.replace(/^data:application\/pdf;base64,/, "");
                    const buffer = Buffer.from(base64Data, 'base64');
                    if (buffer.length > 0) {
                        await fs.writeFileSync(proofPdfUploadDir + finalname, base64Data, 'base64');
                        resolve({ status: 'true', finalname: finalname, fileExt: extension });
                    } else {
                        resolve({ status: 'true', finalname: '', fileExt: '' });
                    }
                } else {
                    resolve({ status: 'true', finalname: '', fileExt: '' });
                }
            } else {
                // If proofPdfFile or proofPdfName is missing, handle it gracefully
                resolve({ status: 'true', finalname: '', fileExt: '' });
            }
        });
        

        let panPromise = await new Promise(async function (resolve, reject) {
            var panPdfFile = req.body.employee_pan_proof;
            var panPdfName = req.body.panPdfName;
        
            if (panPdfFile && panPdfName) {  // Ensure both panPdfFile and panPdfName are available
                var current_time = new Date().getTime();
                var fileName = current_time;
                var extension = panPdfName.split('.').pop().toLowerCase();
                var finalname = fileName + "." + extension;
        
                if (extension === 'pdf') {
                    var base64Data = panPdfFile.replace(/^data:application\/pdf;base64,/, "");
                    const buffer = Buffer.from(base64Data, 'base64');
                    if (buffer.length > 0) {
                        await fs.writeFileSync(panPdfUploadDir + finalname, base64Data, 'base64');
                        resolve({ status: 'true', finalname: finalname, fileExt: extension });
                    } else {
                        resolve({ status: 'true', finalname: '', fileExt: '' });
                    }
                } else {
                    resolve({ status: 'true', finalname: '', fileExt: '' });
                }
            } else {
                // If panPdfFile or panPdfName is missing, handle it gracefully
                resolve({ status: 'true', finalname: '', fileExt: '' });
            }
        });
        

        let experiencePromise = await new Promise(async function (resolve, reject) {
            var experiencePdfFile = req.body.employee_experience_proof;
            var experiencePdfName = req.body.experiencePdfName;
        
            if (experiencePdfFile && experiencePdfName) {  // Ensure both experiencePdfFile and experiencePdfName are available
                var current_time = new Date().getTime();
                var fileName = current_time;
                var extension = experiencePdfName.split('.').pop().toLowerCase();
                var finalname = fileName + "." + extension;
        
                if (extension === 'pdf') {
                    var base64Data = experiencePdfFile.replace(/^data:application\/pdf;base64,/, "");
                    const buffer = Buffer.from(base64Data, 'base64');
                    if (buffer.length > 0) {
                        await fs.writeFileSync(experiencePdfUploadDir + finalname, base64Data, 'base64');
                        resolve({ status: 'true', finalname: finalname, fileExt: extension });
                    } else {
                        resolve({ status: 'true', finalname: '', fileExt: '' });
                    }
                } else {
                    resolve({ status: 'true', finalname: '', fileExt: '' });
                }
            } else {
                // If experiencePdfFile or experiencePdfName is missing, handle it gracefully
                resolve({ status: 'true', finalname: '', fileExt: '' });
            }
        });
        
        let marksheetPromise = await new Promise(async function (resolve, reject) {
            var marksheetPdfFile = req.body.employee_marksheet;
            var marksheetPdfName = req.body.marksheetPdfName;
        
            if (marksheetPdfFile && marksheetPdfName) {  // Check if both marksheetPdfFile and marksheetPdfName are defined
                var current_time = new Date().getTime();
                var fileName = current_time;
                var extension = marksheetPdfName.split('.').pop().toLowerCase();
                var finalname = fileName + "." + extension;
        
                if (extension === 'pdf') {
                    var base64Data = marksheetPdfFile.replace(/^data:application\/pdf;base64,/, "");
                    const buffer = Buffer.from(base64Data, 'base64');
                    if (buffer.length > 0) {
                        await fs.writeFileSync(marksheetPdfUploadDir + finalname, base64Data, 'base64');
                        resolve({ status: 'true', finalname: finalname, fileExt: extension });
                    } else {
                        resolve({ status: 'true', finalname: '', fileExt: '' });
                    }
                } else {
                    resolve({ status: 'true', finalname: '', fileExt: '' });
                }
            } else {
                // If marksheetPdfFile or marksheetPdfName is missing, handle it gracefully
                resolve({ status: 'true', finalname: '', fileExt: '' });
            }
        });
        
        let imagePromise = await new Promise(async function (resolve, reject) {
            var imageFile = req.body.image;
            var imageName = req.body.imageName;
        
            if (imageFile && imageName) { // Ensure both image file and image name are available
                var current_time = new Date().getTime();
                var fileName = current_time;
                var extension = imageName.split('.').pop().toLowerCase();
                var finalname = fileName + "." + extension;
        
                if (extension === 'png') { // Check if the file is PNG
                    var base64Data = imageFile.replace(/^data:image\/png;base64,/, ""); // Update regex for PNG image
                    const buffer = Buffer.from(base64Data, 'base64');
                    if (buffer.length > 0) {
                        await fs.writeFileSync(imageUploadDir + finalname, base64Data, 'base64');
                        resolve({ status: 'true', finalname: finalname, fileExt: extension });
                    } else {
                        resolve({ status: 'true', finalname: '', fileExt: '' });
                    }
                } else {
                    resolve({ status: 'true', finalname: '', fileExt: '' });
                }
            } else {
                // If image or image name is missing, handle it gracefully
                resolve({ status: 'true', finalname: '', fileExt: '' });
            }
        });
        
        
        // If all file uploads are successful, proceed with updating the database
        if (resumePromise.status == 'true' && proofPromise.status == 'true' && marksheetPromise.status == 'true' && experiencePromise.status == 'true' && panPromise.status == 'true') {
            // Extract filenames and URLs for each document
            let resumeFinalname = resumePromise.finalname;
            let proofFinalname = proofPromise.finalname;
            let panFinalname = panPromise.finalname;
            let experienceFinalname = experiencePromise.finalname;
            let marksheetFinalname = marksheetPromise.finalname;
            let imageFinalname = imagePromise.finalname;

            // Formulate URLs for each document
            if (resumeFinalname) {
                var resumeFullPdfUrl = "employee/resume_pdf/" + resumeFinalname;
            } else if (proofFinalname) {
                var proofFullPdfUrl = "employee/proof_pdf/" + proofFinalname;
            } else if (panFinalname) {
                var panFullPdfUrl = "employee/pan_card_pdf/" + panFinalname;
            } else if (experienceFinalname) {
                var experienceFullPdfUrl = "employee/experience_card_pdf/" + experienceFinalname;
            } else if (marksheetFinalname) {
                var marksheetFullPdfUrl = "employee/marksheet_pdf/" + marksheetFinalname;
            } else if (imageFinalname) {
                var imageFullUrl = "employee/image/" + imageFinalname;
            }
            console.log("resumeFinalname", resumeFinalname)
            console.log("resumeFullPdfUrl", resumeFullPdfUrl)

            // Construct the employee object with all data including file URLs
            var obj = {
                employee_code: req.body.employee_code,
                employee_first_name: capitalizeWords(req.body.employee_first_name),
                employee_last_name: capitalizeWords(req.body.employee_last_name),
                employee_mobile: req.body.employee_mobile,
                employee_alternate_mobile: req.body.employee_alternate_mobile,
                employee_email: req.body.employee_email,
                employee_password: req.body.employee_password,
                employee_address: req.body.employee_address,
                employee_city: capitalizeWords(req.body.employee_city),
                employee_state: capitalizeWords(req.body.employee_state),
                employee_other_info: req.body.employee_other_info,
                employee_dob: req.body.employee_dob,
                employee_doj: req.body.employee_doj,
                employee_skills: req.body.employee_skills,
                employee_experience: req.body.employee_experience,
                employee_resume: resumeFullPdfUrl,
                employee_id_proof: proofFullPdfUrl,
                employee_pan_card: panFullPdfUrl,
                employee_experience_letter: experienceFullPdfUrl,
                employee_marksheet: marksheetFullPdfUrl,
                employee_permanant_address_proof: req.body.employee_permanant_address_proof,
                employee_local_address_proof: req.body.employee_local_address_proof,
                employee_reference_one_name: req.body.employee_reference_one_name,
                employee_reference_one_mobile: req.body.employee_reference_one_mobile,
                employee_reference_two_name: req.body.employee_reference_two_name,
                employee_reference_two_mobile: req.body.employee_reference_two_mobile,
                image: imageFullUrl
            };
            const updatedEmployee = await Employee.findByIdAndUpdate(
                employeeId,
                { $set: obj },
                { new: true } // Return the updated document
            );
            // Respond with success message and updated employee data
            res.json({ success: true, msg: 'Employee updated successfully.', employee: updatedEmployee });
        }

    } catch (err) {
        // If any error occurs during the process, handle it
        console.log("error", err);
        if (err.code === 11000 && err.keyPattern && err.keyPattern.employee_code) {
            return res.json({ success: false, status: status.BAD_REQUEST, msg: 'Employee Code is already registered.' });
        }
        else if (err.code === 11000 && err.keyPattern && err.keyPattern.employee_email) {
            return res.json({ success: false, status: status.BAD_REQUEST, msg: 'This Email is already registered.' });
        }
        else {
            // For other errors
            return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update Employee failed.' });

        }
    }
}


// Get Employee By ID
exports.getEmployeeById = async (req, res) => {
    try {
        let employeeId = req.query._id;
        if (employeeId === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        const data = await Employee.findOne({ _id: employeeId }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get Employee failed.' });
    }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
    try {
        const ID = req.query._id;
        if (ID === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        let result = await Employee.findOneAndDelete({ _id: ID }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Employee is deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Employee Id not found' });
        }
    } catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete Employee data failed.' });
    }
};

// Multi Delete Employees
exports.multiDeleteEmployees = async (req, res) => {
    try {
        const ids = req.body.ids;
        if (!ids || ids.length === 0) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Ids Parameter Not Available' });
        }
        await Employee.deleteMany({ _id: { $in: ids } }).lean().exec();
        res.json({ success: true, status: status.OK, msg: 'Employees are deleted successfully.' });
    } catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete Employees failed.' });
    }
};

// Search Employees
// exports.searchEmployees = async (req, res) => {
//     try {
//         const query = req.query.search;
//         if (!query) {
//             return res.status(400).json({ error: 'No search query provided' });
//         }

//         const searchTerms = query.split(',').map(term => term.trim());

//         const searchQuery = {
//             $or: [
//                 { employee_first_name: { $regex: new RegExp(query, "i") } },
//                 { employee_last_name: { $regex: new RegExp(query, "i") } },
//                 { employee_email: { $regex: new RegExp(query, "i") } },
//                 { employee_city: { $regex: new RegExp(query, "i") } },
//                 { employee_state: { $regex: new RegExp(query, "i") } }
//             ]
//         };

//         searchTerms.forEach(term => {
//             searchQuery.$or.push({
//                 employee_skills: { $regex: new RegExp(term, "i") }
//             });
//         });

//         const results = await Employee.find(searchQuery);
//         res.json(results);
//     } catch (err) {
//         console.error("Error:", err);
//         return res.status(500).json({ success: false, status: 500, msg: 'Internal Server Error' });
//     }
// };


// Count Total Employees
exports.countEmployee = async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments({});
        return res.json({ success: true, status: status.OK, count: totalEmployees });
    } catch (err) {
        console.log("Error:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Failed to count employees.' });
    }
};




// Get Upcoming Employee Birthdays
exports.getUpcomingDob = async (req, res) => {
    try {
        const today = new Date();
        const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        // Find employees whose birthdays are today or in the future
        const upcomingBirthdays = await Employee.find({
            $expr: {
                $gte: [
                    { $dateFromString: { dateString: { $concat: [{ $toString: today.getFullYear() }, '-', { $toString: { $month: "$employee_dob" } }, '-', { $toString: { $dayOfMonth: "$employee_dob" } }] } } },
                    currentDate
                ]
            }
        }).select('employee_first_name employee_last_name employee_dob').lean().exec();

        if (upcomingBirthdays.length > 0) {
            return res.json({ success: true, status: status.OK, data: upcomingBirthdays });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'No upcoming birthdays found.' });
        }
    } catch (err) {
        console.log("Error:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Failed to retrieve upcoming birthdays.' });
    }
};



exports.export = async (req, res) => {
    const { csvData, filename } = req.body;

    if (!csvData || !filename) {
        console.error('Missing csvData or filename');
        return res.status(400).json({ error: 'Missing csvData or filename' });
    }

    const filePath = path.join(__dirname, 'download', filename);

    console.log(`Saving file to ${filePath}`); // Log the file path

    fs.writeFile(filePath, csvData, (err) => {
        if (err) {
            console.error('Failed to save file:', err); // Log error details
            return res.status(500).json({ error: 'Failed to save file' });
        }
        console.log('File saved successfully'); // Log success
        res.json({ message: 'File saved successfully', path: `/download/${filename}` });
    });
};


exports.search = async (req, res) => {
    try {
        const query = req.query.search;
        if (!query) {
            return res.status(400).json({ error: 'No search query provided' });
        }

        // Split the query into an array of search terms
        const searchTerms = query.split(',').map(term => term.trim());

        const searchQuery = {
            $or: [
                { employee_last_name: { $regex: new RegExp(query, "i") } },
                { employee_first_name: { $regex: new RegExp(query, "i") } },
                { employee_email: { $regex: new RegExp(query, "i") } },
                { employee_mobile: { $regex: new RegExp(query, "i") } },
                { employee_code: { $regex: new RegExp(query, "i") } },
                { employee_address: { $regex: new RegExp(query, "i") } },
                { employee_city: { $regex: new RegExp(query, "i") } },
                { employee_state: { $regex: new RegExp(query, "i") } },
                { employee_experience: { $regex: new RegExp(query, "i") } }
            ]
        };

        // Add search conditions for each skill term
        searchTerms.forEach(term => {
            searchQuery.$or.push({
                employee_skills: { $regex: new RegExp(term, "i") }
            });
        });

        // Check if the query contains both first and last names
        if (query.includes(' ')) {
            const [firstName, lastName] = query.split(' ');
            // Update search query to match both first and last names together
            searchQuery.$or.push({
                $and: [
                    { employee_first_name: { $regex: new RegExp(firstName, "i") } },
                    { employee_last_name: { $regex: new RegExp(lastName, "i") } }
                ]
            });
        }

        const results = await Employee.find(searchQuery);
        res.json(results);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, status: 500, msg: 'Internal Server Error' });
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
            const user = await Employee.findOne({ employee_email: new RegExp(`^${email}$`, 'i') }).lean().exec();

            if (!user) {
                console.log(`User not found in database: ${email}`);
            }

            const mailOptions = {
                from: 'Reinforce Software Solution Pvt. Ltd.:mahimagarg1602@gmail.com',
                to: email,
                subject: '🎆🎇𝐇𝐚𝐩𝐩𝐲 𝐃𝐢𝐰𝐚𝐥𝐢 🎇🎆',
                text: `As the festival of lights illuminates our lives, we take this opportunity to wish you and your family a Happy Diwali! 🎆`,

                html: ` <h2 style="color: black;"><i><b>As the festival of lights illuminates our lives, we take this opportunity to wish you and your family a Happy Diwali! 🎆</b></i></h2>
<h3 style="color: black;"><i><b>Dear Team,</b></i></h3>
<h3 style="color: black;"><i><b>
🌟 Wishing You a Joyous and Prosperous Diwali! 🌟</b></i></h3>
<h3 style="color: black;"><i><b>
May this Diwali bring you joy, success, and happiness. Just as each diya adds brightness to the festival, your hard work and dedication light up our team. Let's celebrate this auspicious occasion with the same spirit of unity and positivity that defines us.</b></i></h3>
<img src="https://img.freepik.com/free-vector/paper-style-diwali-background_23-2149602500.jpg?t=st=1731775317~exp=1731778917~hmac=1c7faa923d6eae7427c8993b42af0b2bf7912dea79e8c78363c3dcc30a5b1f24&w=1060" alt="Independence Day Celebration" style="display: block; margin: 20px auto; max-width: 100%; height: auto;">
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