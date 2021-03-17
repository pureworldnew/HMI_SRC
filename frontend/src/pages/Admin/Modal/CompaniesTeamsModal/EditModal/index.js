import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import './editmodal.scss';

const AdminModal = (props) => {
    const {
        buttonLabel,
        className,
        type,
    } = props;

    const people = [
        // { id: 1, fullName: "Oscar Martinez", role: "admin" },
        // { id: 2, fullName: "Angela Martin", role: "Account Manager" },
        // { id: 3, fullName: "Ryan Horward", role: "Account Manager" },
        // { id: 4, fullName: "Ron Weesley", role: "user" },
        // { id: 5, fullName: "Vladimir Stajkowski", role: "user" },
        // { id: 6, fullName: "Pam Beesley", role: "user" },
        // { id: 7, fullName: "Michael Scott", role: "user" },
        // { id: 8, fullName: "Jim Halpert", role: "user" },
        // { id: 9, fullName: "Andrew Bernard", role: "user" },
        // { id: 10, fullName: "Creed Braton", role: "user" },
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentResult, setCurrentResult] = useState(people);
    const [searchStatus, setSearchStatus] = useState(false);

    const handleChange = event => {
        setSearchTerm(event.target.value);
        event.target.value === "" ? setSearchStatus(false) : setSearchStatus(true);
    };
    const removeResult = (index) => {
        let newCurrentArray = [];
        let currentItems = currentResult;
        for (let i = 0; i < currentItems.length; i++) {
            let CurrentItem = currentItems[i];
            if (Object.values(CurrentItem)[0] !== index) {
                newCurrentArray.push(CurrentItem);
            }
        }
        setCurrentResult(newCurrentArray);

        let newSearchArray = [];
        let searchItems = searchResults;
        for (let j = 0; j < searchItems.length; j++) {
            let searchItem = searchItems[j];
            if (Object.values(searchItem)[0] !== index) {
                newSearchArray.push(searchItem);
            }
        }
        setSearchResults(newSearchArray);
    }

    useEffect(() => {
        var filtered = [];
        for (var i = 0; i < currentResult.length; i++) {

            var obj = currentResult[i];
            if (obj.fullName.toLowerCase().indexOf(searchTerm) >= 0) {
                filtered.push(obj);
            }
        }
        setSearchResults(filtered);
    }, [searchTerm]);

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <p className="viewButton" onClick={toggle}>{buttonLabel}</p>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>{type === "team" ? " + Edit Team" : " + Edit Company"}</ModalHeader>
                <ModalBody>
                    <FormGroup className="EditTeamNameInput">
                        <Label for="Name">Name</Label>
                        <Input type="text" name="Name" id="Name" placeholder="" />
                    </FormGroup>
                    <div className="teamMemberSearch">
                        <Label for="Members">Members</Label><br />
                        <input
                            type="text"
                            placeholder="Search members by name or e-mail"
                            value={searchTerm}
                            onChange={handleChange}
                        />
                        <div className="teamMemberSearchResults" style={{ border: searchResults.length === 0 ? "none" : null }}>
                            {searchStatus && searchResults.map((searchresult, index) => (
                                <div className="teamMemberResultItem teamMemberResultItem_result">
                                    <div className="teamMemberAvatar"></div>
                                    <div className="userNameDiv">
                                        {searchresult.fullName}
                                    </div>
                                    <span className="removeBtn" onClick={() => removeResult(searchresult.id)}>×</span>
                                </div>
                            ))}
                        </div>
                        <div className="teamMemberSearchResults" style={{ border: currentResult.length === 0 ? "none" : null }}>
                            {!searchStatus && currentResult.map((result, index_re) => (
                                <div className="teamMemberResultItem teamMemberResultItem_result">
                                    <div className="teamMemberAvatar"></div>
                                    <div className="userNameDiv">
                                        {result.fullName}
                                    </div>
                                    <span className="removeBtn" onClick={() => removeResult(result.id)}>×</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <button className="button button--block-admin-teamcreatecancel" onClick={toggle}>Cancel</button>
                    <button className="button button--block-admin-teamcreate" onClick={toggle}>Save Changes</button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AdminModal;