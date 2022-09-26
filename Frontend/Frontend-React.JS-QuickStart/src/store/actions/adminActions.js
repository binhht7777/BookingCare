import actionTypes from './actionTypes';
import {
    deleteUserService,
    editUserService,
    getAllCodeService,
    getAllDoctorsService,
    getAllUsers,
    getTopDoctorService,
    saveInforDoctorService,
    getAllSpecialty
} from '../../services/userService';
import { createNewUserService } from '../../services/userService';
import { toast } from 'react-toastify'

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService('GENDER')
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart', error);
        }
    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})


export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})



export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            console.log('Check create user', res);
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
                toast.success('Create new user successfully');
            } else {
                dispatch(saveUserFailed());
                toast.error('Create new user error');
            }
        } catch (error) {
            dispatch(saveUserFailed());
            console.log('createNewUser', error);
        }
    }
}

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})


// Position

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionStart', error);
        }
    }
}

export const fetchPositionSuccess = (PositionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: PositionData
})


export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})


// Role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('ROLE')
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart', error);
        }
    }

}
export const fetchRoleSuccess = (RoleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: RoleData
})


export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})


// User
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (error) {
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersStart', error);
        }
    }

}
export const fetchAllUsersSuccess = (UsersData) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data: UsersData
})


export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

// Delete
export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            console.log('Check create user', res);
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
                toast.success('Delete user successfully');
            } else {
                dispatch(deleteUserFailed());
                toast.error('Delete user error');
            }
        } catch (error) {
            dispatch(deleteUserFailed());
            console.log('deleteUser', error);
        }
    }
}

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

// Edit
export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
                toast.success('Update user successfully');
            } else {
                dispatch(editUserFailed());
                toast.error('Update user error');
            }
        } catch (error) {
            dispatch(editUserFailed());
            console.log('editUser', error);
        }
    }
}

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const fetchTopDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorService('20');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
                })
            }
        } catch (error) {
            console.log('FETCH_TOP_DOCTORS_FAILED', error);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorsService();
            if (res && res.errCode === 0) {

                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
                })
            }
        } catch (error) {
            console.log('FETCH_ALL_DOCTORS_FAILED', error);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            })
        }
    }
}


export const saveInforDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveInforDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success('Save infor doctor successfully');
                dispatch({
                    type: actionTypes.SAVE_INFOR_DOCTOR_SUCCESS,
                })
            } else {
                toast.error('Error Save infor doctor successfully');
                dispatch({
                    type: actionTypes.SAVE_INFOR_DOCTOR_FAILED
                })
            }
        } catch (error) {
            toast.error('Error Save infor doctor successfully');
            dispatch({
                type: actionTypes.SAVE_INFOR_DOCTOR_FAILED
            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            if (res && res.errCode === 0) {

                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        } catch (error) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED', error);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
}

export const getRequireDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR
            })
            let resPrice = await getAllCodeService('PRICE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resProvince = await getAllCodeService('PROVINCE');
            let resSpecialty = await getAllSpecialty();

            if (resPrice && resPrice.errCode === 0
                && resPayment && resPrice.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                }
                dispatch(getRequireDoctorInforSuccess(data));
            } else {
                dispatch(getRequireDoctorInforFailed());
            }
        } catch (error) {
            dispatch(getRequireDoctorInforFailed());
            console.log('GetDoctorPrice', error);
        }
    }

}

export const getRequireDoctorInforSuccess = (allRequireData) => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_SUCCESS,
    data: allRequireData
})


export const getRequireDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_FAILED
})

