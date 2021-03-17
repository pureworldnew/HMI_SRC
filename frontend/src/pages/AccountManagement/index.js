import React from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

const AccountManagement = props => {
    let { action, presentations } = props;
    if(presentations) {
        let index = presentations.findIndex(p => p.id === 'fakeid2');
        if(index > -1){
            action(presentations[index].slides, 'data');
        }
    }

    return <Redirect to="account-management/accounts" />;
};


function mapStateToProps(state) {
    let { presentations } = state;
    return {
        presentations: presentations.archived
    };
}

function mapDispatchToProps(dispatch) {
    let { slides } = dispatch;
    return {
        action: slides.updateState
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountManagement);
