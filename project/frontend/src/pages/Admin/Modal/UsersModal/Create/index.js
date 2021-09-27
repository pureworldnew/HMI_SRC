import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import Select from "react-select";
import Checkbox from "react-simple-checkbox";
import AuthService from '../../../../../services/AuthService';
import UserService from '../../../../../services/UserService';
import './UserModal.scss';
const customeStyle = {
    container: styles => ({
        ...styles,
        width: "95%",
        height: "56px"
    }),
    indicatorSeparator: () => false,
    control: styles => ({
        ...styles,
        height: "56px"
    }),
    placeholder: styles => ({
        ...styles,
        fontWeight: "600",
        fontSize: "14px",
        lineHeight: "20px",
        color: "#000000",
    })
};


const AdminModal = (props) => {
    const {
        buttonLabel,
        className
    } = props;

    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [roleId, setRoleId] = useState('');
    const [password, setPassword] = useState('');
    const [sendDetailAsEmail, setSendDetailAsEmail] = useState(false)

    const [options, setOptions] = useState([]);
    useEffect(() => {
        UserService.getRoleList()
            .then(roles => {
                // console.log('role lists', roles.data);
                setOptions(roles.data)
            })
            .catch(err => { console.log('Fetch role lists err', err) })
    }, []);

    const toggle = () => setModal(!modal);


    const handleSubmit = () => {
        const userId = Math.floor(Math.random() * 1000000000000)
        if (!!email && !!password && !!fullName && !!roleId) {
            AuthService.createAccount({ userId, fullName, email, roleId, password })
                .then(user => {
                    props.updateState(true, 'add_new_user')
                    toggle();
                    alert(user.message);
                })
                .catch(err => {
                    console.log('add new user error', err)
                })
        } else {
            alert('Please provide all information!');
        }
    }

    return (
        <div>
            <button onClick={toggle}
                className="button button--block-admin  button-primary"
            >
                <p>{buttonLabel}</p>
            </button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>+ Add New User</ModalHeader>
                <ModalBody>
                    <FormGroup className="userInput">
                        <Label for="Name">Full Name</Label>
                        <Input
                            type="text"
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="" />
                    </FormGroup>
                    <FormGroup className="userInput email">
                        <Label for="email">E-Mail Address</Label>
                        <Input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="" />
                    </FormGroup>
                    <FormGroup className="userInput role">
                        <Label for="role">Role</Label>
                        <Select
                            options={options}
                            onChange={(e) => setRoleId(e.value)}
                            styles={customeStyle}
                        />
                    </FormGroup>
                    <FormGroup className="userInput password">
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=""
                        />
                        <button className="generate_password">GENERATE PASSWORD</button>
                    </FormGroup>
                    <FormGroup className="userInput send-account-detail">
                        <Checkbox
                            onChange={value => setSendDetailAsEmail({ sendDetailAsEmail: value })}
                            size={3.8}
                            color="#333"
                        />
                        <label>
                            Send account details to e-mail address
                        </label>
                    </FormGroup>
                    <FormGroup className="userInput footer">
                        <button className="button button--block-admin-teamcreatecancel" onClick={toggle}>Cancel</button>
                        <button
                            className="button button--block-admin-teamcreate button-primary"
                            onClick={handleSubmit}
                            type="button"
                        >
                            + Add User
                        </button>
                    </FormGroup>
                </ModalBody>
            </Modal>
        </div>
    );
};

const mapDispatchToProps = ({ user: { updateState } }) => ({
    updateState: (value, name) => updateState(value, name),
})

const mapStateToProps = ({ user: { add_new_user } }) => ({
    add_new_user,
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminModal);