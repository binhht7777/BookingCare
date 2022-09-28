const clinicService = require("../services/clinicService");

let createClinic = async (req, res) => {
    try {
        let response = await clinicService.createClinicService(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        })
    }
}

let getAllClinic = async (req, res) => {
    try {
        let response = await clinicService.getAllClinicService();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        })
    }
}

let getDetailClinicById = async (req, res) => {
    try {
        let response = await clinicService.getDetailClinicByIdService(req.query.id);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        })
    }
}

module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
}