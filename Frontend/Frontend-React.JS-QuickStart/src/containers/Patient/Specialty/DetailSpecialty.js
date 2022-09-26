import React, { Component } from 'react';
import { connect } from "react-redux";
import { languages } from '../../../utils';
import './DetiailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';


class DetiailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    showHideDetailInfo = (status) => {
        this.setState({
            isShowDetailInfo: status
        })
    }

    render() {

        return (
            <>
                <HomeHeader />
                <div>
                    this page Specialty
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetiailSpecialty);
