import db from '../models/index';
require('dotenv').config();
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';

let buildUrlEmail = (doctorId, token) => {
    let result = '';
    result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
    return result;
}

let postBookAppointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let token = uuidv4();
            if (!data.email) {
                resolve({
                    errCode: 0,
                    errMessage: 'Missing parameter'
                })

            } else {
                console.log('<<<check data send email>>>', data)

                await emailService.sendSampleEmail({
                    reciverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)

                })

                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                    }
                });
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token,
                        }
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save infor doctor successfull'
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}


let postVerifyBookAppointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 0,
                    errMessage: 'Missing parameter'
                })

            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1',
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S2';
                    await appointment.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Booking is actived'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Booking does not exists'
                    })
                }

            }

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    postBookAppointmentService: postBookAppointmentService,
    postVerifyBookAppointmentService: postVerifyBookAppointmentService,
}