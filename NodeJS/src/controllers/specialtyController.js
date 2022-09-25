import specialtyService from '../services/specialtyService';

let createSpecialty = async (req, res) => {
    try {
        console.log('<<<createSpecialty controller>>>');
        let response = await specialtyService.createSpecialtyService(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        })
    }
}

module.exports = {
    createSpecialty: createSpecialty,
}