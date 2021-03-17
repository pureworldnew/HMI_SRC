import React, { useState, useEffect, useRef } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import UserService from './../../../../../services/UserService';
import CompanyService from '../../../../../services/CompanyService';
import { connect } from 'react-redux';
import './createmodal.scss';

const AdminModal = (props) => {
    const {
        buttonLabel,
        className,
        type,
    } = props;

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchStatus, setSearchStatus] = useState(false);
    const [currentResultItems, setCurrentResultItems] = useState([]);
    const [currentResultMembers, setCurrentResultMembers] = useState([]);
    const [currentMemberRoles, setcurrentMemberRoles] = useState([]);
    const [currentTeamNameVal, setcurrentTeamNameVal] = useState("");
    const [usersList, setUsersList] = useState([]);

    const handleChange = event => {

        setSearchTerm(event.target.value);
        event.target.value === "" ? setSearchStatus(false) : setSearchStatus(true);

        var filtered = [];
        for (var i = 0; i < usersList.length; i++) {

            var obj = usersList[i];
            if (obj.fullName && (obj.fullName.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0 || obj.emailAddress.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0)) {
                filtered.push(obj);
            }
        }
        setSearchResults(filtered);
    };

    const handleTeamName = e => {
        setcurrentTeamNameVal(e.target.value);
    }

    const createCompany = () => {
        CompanyService.createCompany(currentTeamNameVal, currentResultMembers, currentMemberRoles)
            .then(res => {
                // console.log("Success:", res.data);
                props.updateState(true);
            })
            .catch(err => {
                console.log("Error:", err);
            })

        toggle();
    }

    const createTeam = () => {
        toggle();
    }

    const selectresult = (item, index) => {
        setCurrentResultItems([...currentResultItems, item]);
        setCurrentResultMembers([...currentResultMembers, item.id]);
        setSearchStatus(false);
        setcurrentMemberRoles([...currentMemberRoles, item.roleId]);
        setSearchTerm("");
    }

    const removeResult = (index) => {
        let newCurrentArray = [];
        let newCurrentMember = [];
        let newMemberRole = [];
        let currentItems = currentResultItems;
        for (let i = 0; i < currentItems.length; i++) {
            let CurrentItem = currentItems[i];
            let CurrentMember = currentItems[i].id;
            let CurrentRole = currentItems[i].roleId;
            if (Object.values(CurrentItem)[0] !== index) {
                newCurrentArray.push(CurrentItem);
                newCurrentMember.push(CurrentMember);
                newMemberRole.push(CurrentRole);
            }
        }
        setCurrentResultItems(newCurrentArray);
        setCurrentResultMembers(newCurrentMember);
        setcurrentMemberRoles(newMemberRole);
    }

    useEffect(() => {
        UserService.getAllUserList()
            .then(res => {
                setUsersList(res.data)
            })
            .catch(err => { console.log(err) })
        // setUsersList(people);
    }, []);

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setcurrentTeamNameVal("");
        setCurrentResultItems([]);
        setCurrentResultMembers([]);
        setModal(!modal);
        // console.log('create company');
    }

    return (
        <div>
            <button onClick={toggle}
                className="button button--block-admin button-primary"
            >
                <p>{buttonLabel}</p>
            </button>
            <Modal isOpen={modal} toggle={toggle} className={className} autoFocus={false}>
                <ModalHeader toggle={toggle}>{type === "team" ? "+ Create New Team" : "+ Add New Company"}</ModalHeader>
                <ModalBody>
                    <FormGroup className="createTeamNameInput">
                        <Label for="Name">Name</Label>
                        <Input
                            type="text"
                            name="Name"
                            id="Name"
                            placeholder=""
                            value={currentTeamNameVal}
                            onChange={handleTeamName}
                            autoFocus
                        />
                    </FormGroup>
                    <div className="teamMemberSearch">
                        <Label for="Members">Members</Label><br />
                        <input
                            type="text"
                            placeholder="Search members by name or e-mail"
                            value={searchTerm}
                            onChange={handleChange}
                        />
                        <div className="teamMemberSearchResults" style={{ border: !searchStatus ? "none" : null }}>
                            {!!searchStatus && searchResults.map((item, index) => (
                                <div className="teamMemberResultItem" onClick={() => selectresult(item, index)} style={{ cursor: "pointer" }}>
                                    <div className="teamMemberAvatar"></div>
                                    <div>
                                        {item.fullName}({item.emailAddress})
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="teamMemberSearchResults" style={{ border: currentResultItems.length === 0 ? "none" : null }}>
                            {!searchStatus && currentResultItems.map((searchresult, index_re) => (
                                <div className="teamMemberResultItem teamMemberResultItem_result">
                                    <div className="teamMemberAvatar"></div>
                                    <div className="userNameDiv">
                                        {searchresult.fullName}({searchresult.emailAddress})
                                    </div>
                                    <span className="removeBtn" onClick={() => removeResult(searchresult.id)}>×</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <button className="button button--block-admin-teamcreatecancel" onClick={toggle}>Cancel</button>
                    <button className="button button--block-admin-teamcreate button-primary" onClick={type === "team" ? createTeam : createCompany}>{type === "team" ? "+ Create Team" : "+ Add Company"}</button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

const mapDispatchToProps = ({ company: { updateState } }) => ({
    updateState: (value) => updateState(value),
})

const mapStateToProps = ({ company: { set_create_company } }) => ({
    set_create_company,
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminModal);
