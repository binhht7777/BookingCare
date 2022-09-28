import React, { Component } from 'react';
import { connect } from "react-redux";
import { getDetailInforDoctorService } from '../../../services/userService';
import { languages } from '../../../utils';
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorSchedule.scss';
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {},
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {

        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (language === languages.VI) {
                if (i === 0) {
                    let DDMM = moment(new Date()).add(i, 'days').format('DD/MM');
                    let today = `Hôm nay - ${DDMM}`;
                    obj.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    obj.label = this.capitalizeFirstLetter(labelVi)
                }

            } else {
                if (i === 0) {
                    let DDMM = moment(new Date()).add(i, 'days').format('MM/DD');
                    let today = `Today - ${DDMM}`;
                    obj.label = today;
                } else {
                    obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - MM/DD');
                }

            }

            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDate.push(obj);
        }
        return arrDate;
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language)
        if (this.props.doctorId) {
            let res = await getScheduleDoctorByDate(this.props.doctorId, allDays[0].value);
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }
        if (allDays && allDays.length > 0) {
            this.setState({
                allDays: allDays,
            })
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        let { language } = this.props;
        if (language !== prevProps.language) {
            let allDays = this.getArrDays(language)
            this.setState({
                allDays: allDays,
            })
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorId, allDays[0].value);
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }

    }

    handleOnChangeSelect = async (event) => {
        if (this.props.doctorId && this.props.doctorId !== -1) {
            let doctorId = this.props.doctorId;
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            let allTime = [];
            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })
            }
            console.log('Check res schedule doctor by date', this.state.allAvalableTime);
        }
    }

    handleClickScheduleTime = (time) => {

        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }

    closeModalBooking = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {
        let { allDays, allAvalableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select
                            onChange={(event) => this.handleOnChangeSelect(event)}
                        >
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>{item.label}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'>
                                <span><FormattedMessage id='patient.detail-doctor.schedule' /></span>
                            </i>
                        </div>
                        <div className='time-content'>

                            {allAvalableTime && allAvalableTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                        {
                                            allAvalableTime.map((item, index) => {
                                                let timeDisplay = language === languages.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                                return (
                                                    <button
                                                        key={index} className={language === languages.VI ? 'btn-vie' : 'btn-en'}
                                                        onClick={() => this.handleClickScheduleTime(item)}
                                                    >
                                                        {timeDisplay}
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className='book-free'>
                                        <span><FormattedMessage id="patient.detail-doctor.choose" /> <i className='far fa-hand-point-up'></i> và đặt (miễn phí)</span>
                                    </div>
                                </>
                                : <div className='no-schedule'><FormattedMessage id='patient.detail-doctor.no-schedule' /></div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal isOpenModalBooking={isOpenModalBooking} closeModalBooking={this.closeModalBooking} dataScheduleTimeModal={dataScheduleTimeModal} />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
