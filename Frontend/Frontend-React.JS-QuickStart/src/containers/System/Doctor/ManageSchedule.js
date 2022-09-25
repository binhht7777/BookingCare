import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { languages, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment'
import FormatedDate from '../../../components/Formating/FormattedDate';
import { dateFilter } from 'react-bootstrap-table2-filter';
import _, { times } from 'lodash';
import { toast } from 'react-toastify';
import { saveBulkScheduleDoctor } from '../../../services/userService';

class ManageSchedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.listUsers !== this.props.listUsers) {
        //     this.setState({
        //         usersRedux: this.props.listUsers
        //     })
        // }
        if ((prevProps.allDoctors !== this.props.allDoctors) || (prevProps.language !== this.props.language)) {
            let dataSelect = this.dataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({
                    ...item,
                    isSelected: false

                }))
            }
            this.setState({
                rangeTime: data,
            })
        }
    }

    // data selected
    dataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labeVi = `${item.lastName} ${item.firstName}`;
                let labeEn = `${item.firstName} ${item.lastName}`;

                object.label = language === languages.VI ? labeVi : labeEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        // let res = await getDetailInforDoctorService(selectedDoctor.value);
        // if (res && res.errCode === 0 && res.data && res.data.Markdown) {
        //     let markDown = res.data.Markdown;
        //     this.setState({
        //         contentHTML: markDown.contentHTML,
        //         contentMarkdown: markDown.contentMarkdown,
        //         description: markDown.description,
        //         hasOldData: true,
        //     })
        // } else {
        //     this.setState({
        //         contentHTML: '',
        //         contentMarkdown: '',
        //         description: '',
        //         hasOldData: false,
        //     })
        // }
    };

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
        console.log("check rangtime", rangeTime)
    }
    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        console.log(this.state);
        let result = [];
        if (!currentDate) {
            toast.success('Invalid date');
            return;
        }
        if (!selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.success('Invalid Doctor');
            return;
        }
        // let formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        let formatDate = new Date(currentDate).getTime()
        if (rangeTime && rangeTime.length > 0) {
            let selectTime = rangeTime.filter(item => item.isSelected === true);
            if (selectTime && selectTime.length > 0) {
                selectTime.map(item => {
                    let obj = {};
                    obj.doctorId = selectedDoctor.value;
                    obj.date = formatDate;
                    obj.timeType = item.keyMap;
                    result.push(obj);
                })

            } else {
                toast.success('Invalid Time');
                return;
            }

            let res = await saveBulkScheduleDoctor({
                arrSchedule: result,
                doctorId: selectedDoctor.value,
                formatedDate: formatDate
            });
            if (res && res.errCode === 0) {
                toast.success('Save Successfully')
            } else {
                toast.error('Error Save');
            }
        }
    }
    render() {
        const { isLoggedIn, language } = this.props;
        const { selectedDoctor, rangeTime } = this.state;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id='manage-schedule.title' />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.choose-doctor' /></label>
                            <Select
                                value={selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.choose-date' /></label>
                            <DatePicker
                                onChange={this.handleOnchangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                                return (
                                    <button key={index} className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                        onClick={() => this.handleClickBtnTime(item)}
                                    >
                                        {language === languages.VI ? item.valueVi : item.valueEn}
                                    </button>
                                )
                            })}

                        </div>

                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule' style={
                                { width: 100 }}
                                onClick={() => this.handleSaveSchedule()}
                            ><FormattedMessage id='manage-schedule.save' /></button>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
