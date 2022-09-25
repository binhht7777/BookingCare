import React, { Component } from 'react';
import { connect } from "react-redux";
import { getDetailInforDoctorService, getExtraInfoDoctorById } from '../../../services/userService';
import { languages } from '../../../utils';
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorExtraInfo.scss';
import Select from 'react-select';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';


class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
            extraInfo: {},
        }
    }

    async componentDidMount() {


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        let { language } = this.props;
        if (language !== prevProps.language) {
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let res = await getExtraInfoDoctorById(this.props.doctorId);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data ? res.data : []
                })
            }

        }
    }

    showHideDetailInfo = (status) => {
        this.setState({
            isShowDetailInfo: status
        })
    }

    render() {
        let { isShowDetailInfo, extraInfo } = this.state;
        let { language } = this.props;
        return (
            <div className='doctor-extra-info-container'>
                <div className='content-up'>
                    <div className='text-address'><FormattedMessage id="patient.extra-info-doctor.text-address" /></div>
                    <div className='name-clinic'>{extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}</div>
                    <div className='detail-address'>{extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}</div>
                </div>

                <div className='content-down'>
                    <div className='short-info'>
                        {isShowDetailInfo === false &&
                            <div><FormattedMessage id="patient.extra-info-doctor.price" />
                                {extraInfo && extraInfo.priceTypeData && language === languages.VI &&
                                    <NumberFormat
                                        value={extraInfo.priceTypeData.valueVi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VND'}
                                    />
                                }
                                {extraInfo && extraInfo.priceTypeData && language === languages.EN &&
                                    <NumberFormat
                                        value={extraInfo.priceTypeData.valueEn}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'$'}
                                    />
                                }
                                <span className='detail' onClick={() => this.showHideDetailInfo(true)}>
                                    <FormattedMessage id="patient.extra-info-doctor.detail" />
                                </span>
                            </div>
                        }
                    </div>

                    {isShowDetailInfo === true &&
                        <>
                            <div className='title-price'><FormattedMessage id="patient.extra-info-doctor.price" />  </div>
                            <div className='detail-info'>
                                <div className='price'>
                                    <span className='left'><FormattedMessage id="patient.extra-info-doctor.price" /></span>
                                    <span className='right'>
                                        {extraInfo && extraInfo.priceTypeData && language === languages.VI &&
                                            <NumberFormat
                                                value={extraInfo.priceTypeData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        }
                                        {extraInfo && extraInfo.priceTypeData && language === languages.EN &&
                                            <NumberFormat
                                                value={extraInfo.priceTypeData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'}
                                            />
                                        }</span>

                                </div>
                                <div className='note'>{extraInfo && extraInfo.note ? extraInfo.note : ''}</div>
                            </div>
                            <div className='payment'><FormattedMessage id="patient.extra-info-doctor.payment" />
                                {extraInfo && extraInfo.paymentTypeData && language === languages.VI ? extraInfo.paymentTypeData.valueVi : ''}
                                {extraInfo && extraInfo.paymentTypeData && language === languages.EN ? extraInfo.paymentTypeData.valueEn : ''}
                            </div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfo(false)}>
                                    <FormattedMessage id="patient.extra-info-doctor.hide-price" />
                                </span>
                            </div>
                        </>
                    }
                </div>

            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
