import db from '../models/index'
import CRUDService from "../services/CRUDService"

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data)
        return res.render("homepage.ejs", {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }
}


let getCRUD = async (req, res) => {
    try {
        return res.render("crud.ejs");
    } catch (e) {
        console.log(e)
    }
}

let postCRUD = async (req, res) => {
    try {
        let message = await CRUDService.createNewUser(req.body);
        console.log(message)
        return res.send("post CRUD from server");
    } catch (e) {
        console.log(e)
    }
}

let displayGetCRUD = async (req, res) => {
    try {
        let data = await CRUDService.getAllUser();
        console.log(data);
        return res.render("dishplayCRUD.ejs", {
            dataTable: data
        });
    } catch (e) {
        console.log(e);
    }
}

let getEditCRUD = async (req, res) => {
    try {
        let userId = req.query.id;
        if (userId) {
            let userData = await CRUDService.getUserInfoById(userId)
            return res.render("editCRUD.ejs", {
                user: userData
            });
        }
        else {
            return res.send("User not found");
        }

    } catch (error) {
        console.log(error);
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUser(data);
    return res.render("dishplayCRUD.ejs", {
        dataTable: allUsers
    })
}



module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
}