import React, { Component } from 'react';
import { connect } from "react-redux";
import { languages } from '../../../utils';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
        }
    }

    async componentDidMount() {


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }


    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    render() {

        return (
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quản lý bệnh nhận
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            onChange={this.handleOnchangeDatePicker}
                            className='form-control'
                            value={this.state.currentDate}
                        />
                    </div>
                    <div className='col-12 table-manage-patient'>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Email</th>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>Firstname</td>
                                    <td>Lastname</td>
                                    <td>Address</td>
                                    <td>Action</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
