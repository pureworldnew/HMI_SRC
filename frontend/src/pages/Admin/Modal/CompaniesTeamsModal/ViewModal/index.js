import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import Select from "react-select";
import UserService from './../../../../../services/UserService';
import CompanyService from '../../../../../services/CompanyService';
import { connect } from 'react-redux';
// import * as Actions from '../../../../../store/actions/index';
import './viewmodal.scss';

const ModalExample = (props) => {
    const {
        buttonLabel,
        type,
        title,
        companyId,
    } = props;

    // const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchStatus, setSearchStatus] = useState(false);
    const [currentResultItems, setCurrentResultItems] = useState([]);
    const [currentResultMembers, setCurrentResultMembers] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [selectedRoleOptions, setselectedRoleOptions] = useState([]);

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setSearchTerm("");
        setCurrentResultItems([]);
        setCurrentResultMembers([]);
        setselectedRoleOptions([]);
        setModal(!modal);
    }

    const showToggle = () => {
        setModal(!modal);
        if (type === "companies") {
            UserService.getAllUserList()
                .then(res => {
                    // console.log('all user list', res.data)
                    setUsersList(res.data)
                })
                .catch(err => { console.log(err) })

            CompanyService.getCompanyUsers(companyId)
                .then(res => {
                    // console.log('company members:', res.data);
                    setCurrentResultItems(res.data.data.users);
                    for (var i = 0; i < res.data.data.users.length; i++) {
                        currentResultMembers.push(res.data.data.users[i].id);
                        selectedRoleOptions.push(res.data.data.users[i].roleId);
                    }
                })
                .catch(err => {
                    console.log('Error:', err);
                })

        } else if (type === "team") {
            // setUsersList(people);
            console.log('team modal');
        } else {
            console.log('else...');
        }
    }

    // console.log('members role array:', selectedRoleOptions);
    // const people = [
    //     { id: 1, fullName: "Oscar Martinez", role: "Admin" },
    //     { id: 2, fullName: "Angela Martin", role: "Account Manager" },
    //     { id: 3, fullName: "Ryan Horward", role: "Account Manager" },
    //     { id: 4, fullName: "Ron Weesley", role: "User" },
    //     { id: 5, fullName: "Vladimir Stajkowski", role: "User" },
    //     { id: 6, fullName: "Pam Beesley", role: "User" },
    //     { id: 7, fullName: "Michael Scott", role: "User" },
    //     { id: 8, fullName: "Jim Halpert", role: "User" },
    //     { id: 9, fullName: "Andrew Bernard", role: "User" },
    //     { id: 10, fullName: "Creed Braton", role: "User" },
    // ];

    const memberroleOptions = [
        { value: "1", label: "Master Admin" },
        { value: "2", label: "System Admin" },
        { value: "3", label: "Company Admin" },
        { value: "4", label: "CEO" },
        { value: "5", label: "VP Customer Success" },
        { value: "6", label: "Account Manager" },
        { value: "7", label: "Account Executive" },
    ];

    const handleChange = event => {

        setSearchTerm(event.target.value);
        event.target.value === "" ? setSearchStatus(false) : setSearchStatus(true);

        var newMembers;
        if (currentResultItems.length === 0) {
            newMembers = usersList;
        } else {
            newMembers = [];
            for (var i = 0; i < usersList.length; i++) {
                let check = 0;
                for (var j = 0; j < currentResultItems.length; j++) {
                    if (currentResultItems[j].id === usersList[i].id) {
                        check = 1;
                        break;
                    }
                }
                if (check === 0) {
                    newMembers.push(usersList[i]);
                }
            }
        }

        var filtered = [];
        for (var l = 0; l < newMembers.length; l++) {

            var obj = newMembers[l];
            if (obj.fullName && (obj.fullName.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0 || obj.emailAddress.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0)) {
                filtered.push(obj);
            }
        }
        setSearchResults(filtered);
    };

    const handleOption = (index, value) => {
        // console.log('select option value:', index, value);
        let array = selectedRoleOptions;
        array[index] = parseInt(value);
        setselectedRoleOptions(array);
    }

    const handleRoles = () => {
        document.getElementById("viewMemeberDiv").scrollTop = 1000
    }

    const removeResult = (index) => {
        let newCurrentArray = [];
        let newCurrentMember = [];
        let newCurrentRoles = [];
        let currentItems = currentResultItems;
        for (let i = 0; i < currentItems.length; i++) {
            let CurrentItem = currentItems[i];
            let CurrentMember = currentItems[i].id;
            let CurrentRoles = currentItems[i].roleId;
            if (Object.values(CurrentItem)[0] !== index) {
                newCurrentArray.push(CurrentItem);
                newCurrentMember.push(CurrentMember);
                newCurrentRoles.push(CurrentRoles);
            }
        }
        setCurrentResultItems(newCurrentArray);
        setCurrentResultMembers(newCurrentMember);
        setselectedRoleOptions(newCurrentRoles);
    }

    const selectresult = (item, index) => {
        setCurrentResultItems([...currentResultItems, item]);
        setCurrentResultMembers([...currentResultMembers, item.id]);
        setselectedRoleOptions([...selectedRoleOptions, item.roleId]);
        setSearchStatus(false);
        setSearchTerm("");
    }

    const customRoleStyles = {
        control: styles => ({
            ...styles,
            backgroundColor: 'white',
            // maxHeight: '50px',
        }),
        option: (styles) => {
            return {
                ...styles,
                maxHeight: '30px',
                paddingTop: '0',
                height: '100%',
            };
        },
    };

    const updateTeam = () => {
        console.log('update team');
        toggle();
    }

    const updateCompany = () => {
        console.log('update company:', companyId, currentResultMembers, selectedRoleOptions);

        CompanyService.updateCompany(companyId, currentResultMembers, selectedRoleOptions)
            .then(res => {
                // console.log("Success:", res.data);
                props.updateState(true);
            })
            .catch(err => {
                console.log("Error:", err);
            })

        toggle();
    }

    return (
        <div>
            <p className="viewButton" onClick={showToggle}>{buttonLabel}</p>
            <Modal isOpen={modal} toggle={toggle} className="TeamsViewModalCustomCss">

                <ModalHeader toggle={toggle}>
                    {type === "team" ? "Account Managers" : title}<br />
                    <Label for="Members">{currentResultItems && currentResultItems.length} MEMBERS</Label>
                </ModalHeader>
                <ModalBody>
                    <FormGroup className="viewTeamNameInput">
                        <Label for="Member" style={{ marginBottom: "3%" }}>{type === "team" ? "Add members to your Team" : "Add members to Company"}</Label><br />
                        <div className="addmemberDiv">
                            <Input
                                type="text"
                                placeholder="Add them by name or e-mail"
                                value={searchTerm}
                                onChange={handleChange}
                            />
                            {type === "team" ? <button className="button button--block-admin-addmember">+ Add to Team</button> : null}
                            {/* <button className="button button--block-admin-addmember">{type === "team" ? "+ Add to Team" : "+ Add to Company"}</button> */}
                        </div>
                    </FormGroup>
                    <hr className="HR" />
                    <div className="teamMemberSearchResults" style={{ border: !searchStatus ? "none" : null }} >
                        {searchStatus && searchResults.map((item, index) => (
                            <div className="teamMemberResultItem" onClick={() => selectresult(item, index)} style={{ cursor: "pointer" }}>
                                <div className="teamMemberAvatar"></div>
                                <div>
                                    {item.fullName}({item.emailAddress})
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="viewTeamMemebersDiv" id="viewMemeberDiv">
                        {!searchStatus && currentResultItems.map((result, index_re) => (
                            <div className="teamMemberResultItem teamMemberResultItem_result">
                                <div className="teamMemberAvatar"></div>
                                <div className="userNameDiv">
                                    {result.fullName}({result.emailAddress})
                                </div>
                                <div
                                    className="memberRole"
                                    onClick={handleRoles}>
                                    <Select
                                        // isMulti
                                        options={memberroleOptions}
                                        placeholder={result.role.roleName}
                                        styles={customRoleStyles}
                                        onChange={(e) => handleOption(index_re, e.value)}
                                    />
                                </div>
                                <span className="removeBtn" onClick={() => removeResult(result.id)}>REMOVE</span>
                            </div>
                        ))}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="button button--block-admin-teamviewcancel" onClick={toggle}>Cancel</button>{' '}
                    <button className="button button--block-admin-teamsave" onClick={type === "team" ? updateTeam : updateCompany}>Save Changes</button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

const mapStateToProps = ({ company: { set_create_company } }) => ({
    set_create_company,
});

const mapDispatchToProps = ({ company: { updateState } }) => ({
    updateState: (value) => updateState(value),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalExample);