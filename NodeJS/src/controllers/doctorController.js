import doctorService from "../services/doctorService"

let getTopDoctor = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let doctors = await doctorService.getTopDoctorService(+limit);
        return res.status(200).json(doctors)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        })
    }
}


let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctorsService();
        return res.status(200).json(doctors)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        })
    }
}

let saveInforDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveInforDoctorService(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getDetailDoctorByIdService(req.query.id);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        })
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {
        let response = await doctorService.bulkCreateScheduleService(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        })
    }
}

let getScheduleDoctorByDate = async (req, res) => {
    try {
        let response = await doctorService.getScheduleDoctorByDateService(req.query.doctorId, req.query.date);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        })
    }
}

let getExtraInfoDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getExtraInfoDoctorByIdService(req.query.doctorId);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        })
    }
}

let getProfileDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getProfileDoctorByIdService(req.query.doctorId);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        })
    }
}

let getListPatientForDoctor = async (req, res) => {
    try {
        let response = await doctorService.getListPatientForDoctorService(req.query.doctorId, req.query.date);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        })
    }
}


module.exports = {
    getTopDoctor: getTopDoctor,
    getAllDoctors: getAllDoctors,
    saveInforDoctor: saveInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleDoctorByDate: getScheduleDoctorByDate,
    getExtraInfoDoctorById: getExtraInfoDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getListPatientForDoctor: getListPatientForDoctor,
}