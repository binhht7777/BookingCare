import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions'
import { startCase } from 'lodash';
import './ManageDoctor.scss'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select'
import { CRUD_Actions, languages } from '../../../utils';
import { getDetailInforDoctorService } from '../../../services/userService';


// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
// ]

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: null,
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            listDoctors: [],
            hasOldData: false,
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',
        }
    }

    // data selected
    dataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labeVi = `${item.lastName} ${item.firstName}`;
                    let labeEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === languages.VI ? labeVi : labeEn;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labeVi = `${item.valueVi}`;
                    let labeEn = `${item.valueEn} USD`;
                    object.label = language === languages.VI ? labeVi : labeEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labeVi = `${item.valueVi}`;
                    let labeEn = `${item.valueEn}`;
                    object.label = language === languages.VI ? labeVi : labeEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }
        }
        return result
    }

    async componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.getRequireDoctorInfor();
        let { resPrice, resPayment, resProvince, resSpecialty } = this.props.allRequireDoctorInfor;
        let dataPrice = this.dataInputSelect(resPrice, 'PRICE');
        let dataPayment = this.dataInputSelect(resPayment, 'PAYMENT');
        let dataProvince = this.dataInputSelect(resProvince, 'PROVINCE');
        let dataSepcialty = this.dataInputSelect(resSpecialty, 'SPECIALTY');
        this.setState({
            listPrice: dataPrice,
            listPayment: dataPayment,
            listProvince: dataProvince,
            listSpecialty: dataSepcialty,
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.listUsers !== this.props.listUsers) {
        //     this.setState({
        //         usersRedux: this.props.listUsers
        //     })
        // }
        if ((prevProps.allDoctors !== this.props.allDoctors) || (prevProps.language !== this.props.language)) {
            let dataSelect = this.dataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect
            })
        }
        if ((prevProps.allRequireDoctorInfor !== this.props.allRequireDoctorInfor) || (prevProps.language !== this.props.language)) {
            let { resPrice, resPayment, resProvince } = this.props.allRequireDoctorInfor;
            let dataPrice = this.dataInputSelect(resPrice, 'PRICE');
            let dataPayment = this.dataInputSelect(resPayment, 'PAYMENT');
            let dataProvince = this.dataInputSelect(resProvince, 'PROVINCE');
            this.setState({
                listPrice: dataPrice,
                listPayment: dataPayment,
                listProvince: dataProvince,
            })

        }
    } 

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveInforDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_Actions.EDIT : CRUD_Actions.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value,
        });
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let { listPayment, listPrice, listProvince } = this.state;
        let res = await getDetailInforDoctorService(selectedDoctor.value);

        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markDown = res.data.Markdown;
            console.log('doctor info selectedDoctor.value', selectedDoctor);
            let addressClinic = '', nameClinic = '', note = '', paymentId = '', priceId = '', provinceId = '', selectedPayment = ''
                , selectedPrice = '', selectedProvince = '';
            if (res.data.Doctor_Info) {
                addressClinic = res.data.Doctor_Info.addressClinic;
                nameClinic = res.data.Doctor_Info.nameClinic;
                note = res.data.Doctor_Info.note;
                paymentId = res.data.Doctor_Info.paymentId;
                priceId = res.data.Doctor_Info.priceId;
                provinceId = res.data.Doctor_Info.provinceId;
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
            }
            this.setState({
                contentHTML: markDown.contentHTML,
                contentMarkdown: markDown.contentMarkdown,
                description: markDown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince

            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
            })
        }
    };

    handleChangSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };

        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }



    render() {
        const { selectedDoctor, description, hasOldData, selectedPrice, selectedPayment, selectedProvince, listSpecialty } = this.state;
        let arrUsers = this.state.usersRedux;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'><FormattedMessage id="admin.manage-doctor.title" /></div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.choose-doctor" /></label>
                        <Select
                            value={selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={'Chọn bác sĩ'}
                        />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id="admin.manage-doctor.intro-infor" /></label>
                        <textarea className='form-control'
                            onChange={(event) => { this.handleOnChangeText(event, 'description') }}
                            value={description}
                        >

                        </textarea>
                    </div>
                </div>

                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={selectedPrice}
                            onChange={this.handleChangSelectDoctorInfor}
                            options={this.state.listPrice}
                            name={"selectedPrice"}
                        // placeholder={'Giá khán bệnh'}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={selectedPayment}
                            onChange={this.handleChangSelectDoctorInfor}
                            options={this.state.listPayment}
                            name={"selectedPayment"}
                        // placeholder={'Phương thức thanh toán'}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={selectedProvince}
                            onChange={this.handleChangSelectDoctorInfor}
                            options={this.state.listProvince}
                            name={"selectedProvince"}
                        // placeholder={'Tỉnh thành'}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4 form-group'>
                        <label>Chọn chuyên khoa</label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangSelectDoctorInfor}
                            options={this.state.listSpecialty}
                            name={"selectedSpecialty"}
                        // placeholder={'Giá khán bệnh'}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn phòng khám</label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangSelectDoctorInfor}
                            options={this.state.listClinic}
                            name={"selectedClinic"}
                        // placeholder={'Giá khán bệnh'}
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    className={hasOldData === true ? 'btn-content-doctor' : 'create-content-doctor'}
                    onClick={() => { this.handleSaveContentMarkdown() }}
                >
                    {hasOldData === true ? <span><FormattedMessage id="admin.manage-doctor.save_infor" /></span> : <span><FormattedMessage id="admin.manage-doctor.create_infor" /></span>}
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequireDoctorInfor: state.admin.allRequireDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        saveInforDoctorRedux: (data) => dispatch(actions.saveInforDoctor(data)),
        getRequireDoctorInfor: () => dispatch(actions.getRequireDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
