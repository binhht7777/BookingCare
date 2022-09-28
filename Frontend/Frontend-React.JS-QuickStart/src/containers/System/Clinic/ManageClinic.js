import React, { Component } from 'react';
import { connect } from "react-redux";
import { CommonUtils, languages } from '../../../utils';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify'
import { createNewClinic } from '../../../services/userService';



const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            address: '',
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

    handleOnchangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }

    handleOnchangeImage = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            })
        }

    }


    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new');
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            })
        } else {
            toast.error('add error');
        }
    }

    render() {

        return (
            <div className='manage-clinic-container'>
                <div className='ms-title'> Quản lý phòng khám</div>
                <div className='btn-add-new-clinic row'>
                    <div className='col-6 form-group'>
                        <lavel>Tên phòng khám</lavel>
                        <input className='form-control' type="text"
                            value={this.state.name}
                            onChange={(event) => this.handleOnchangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <lavel>Ảnh phòng khám</lavel>
                        <input className='form-control-file' type="file"
                            onChange={(event) => this.handleOnchangeImage(event)}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <lavel>Địa chỉ phòng khám</lavel>
                        <input className='form-control' type="text"
                            value={this.state.address}
                            onChange={(event) => this.handleOnchangeInput(event, 'address')}
                        />
                    </div>
                    <div className='col-12 form-group'>
                        <MdEditor style={{ height: '350px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-clinic'
                            onClick={() => this.handleSaveNewClinic()}
                        >Save</button></div>
                </div>
                {/* <div className='all-Clinic'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                    // onChange={this.handleEditorChange}
                    // value={this.state.contentMarkdown}
                    />
                </div> */}

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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
