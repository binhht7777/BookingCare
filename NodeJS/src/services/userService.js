import db from "../models/index"
import bcrypt from 'bcryptjs';

var salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(e)
        }
    })
}


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {

                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true

                });
                if (user) {
                    let checkPwd = await bcrypt.compareSync(password, user.password);
                    console.log(checkPwd)
                    if (checkPwd) {
                        userData.errCode = 0;
                        userData.errMessage = "Ok";
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong Password";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = "Invalid Email and Password";
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = "Invalid Email and Password";
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })

}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })

}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email da ton tai'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    // gender: data.gender === '1' ? true : false,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.image,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}


let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }

            let userNew = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            console.log("Edit" + data.phonenumber);
            if (userNew) {
                userNew.firstName = data.firstName;
                userNew.lastName = data.lastName;
                userNew.address = data.address;
                userNew.roleId = data.roleId;
                userNew.positionId = data.positionId;
                userNew.gender = data.gender;
                userNew.phonenumber = data.phonenumber;
                userNew.image = data.image;
                // await db.User.save({})
                await userNew.save();
                resolve({
                    errCode: 0,
                    errMessage: "Cap nhat thanh cong"
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "User không ton tai"
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}


let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userId }
        })
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: 'Nguoi dung khong ton tai'
            })
        } else {
            await db.User.destroy({
                where: { id: userId }
            });
        }

        resolve({
            errCode: 0,
            errMessage: 'Xoa thanh cong'
        })
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing Type Input"
                })
            } else {
                let res = {};
                let allCode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allCode;
                resolve(res);
            }


        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    editUser: editUser,
    deleteUser: deleteUser,
    getAllCodeService: getAllCodeService,
}