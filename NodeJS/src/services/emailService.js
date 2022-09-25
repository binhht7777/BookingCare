require('dotenv').config();
import nodemailer from "nodemailer";

let sendSampleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"Chính tao"',
        to: dataSend.reciverEmail,
        subject: "Thông tin đặt lịch khám bệnh",
        html: getBodyHTMLEmail(dataSend),
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    console.log('<<<getBodyHTMLEmail>>>', dataSend)
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên bookingcare</p>
        <p>Thông tin đặt lịch khám bệnh</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <b>Kiểm tra lại thông tin và xác nhận theo link bên dưới, hoàn tất đặt lịch khám bệnh</b>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
        <p>Xin chân thành cảm ơn</p>
        `
    } if (dataSend.language === 'en') {
        result =
            ` 
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked an online medical appointment on bookingcare</p>
        <p>Information to book a medical appointment</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <b>Check the information and confirm by the link below, complete the appointment booking</b>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
        <p>Thanks and Regards</p>
        `
    }
    return result;
}

module.exports = {
    sendSampleEmail: sendSampleEmail
}