var moment = require('moment');

const Helper = {
    groupArrayOfObjects: (docs) => {
        let grouped = [];
        let curCompany = '';
        let newGroup = [];
        for (let i = 0; i < docs.length; i++) {
            if(docs[i].ContractDate) {
                docs[i].ContractDate = moment.utc(docs[i].ContractDate);
            }
            if (curCompany == docs[i].Company) {
                newGroup.push(docs[i]);
                if (i < docs.length - 1 && docs[i].Company == docs[i + 1].Company) {
                    continue;
                }
                else {
                    grouped.push(newGroup);
                    newGroup = [];
                }
            }
            else {
                if (i < docs.length - 1 && docs[i].Company == docs[i + 1].Company) {
                    curCompany = docs[i].Company;
                    newGroup.push(docs[i]);
                }
                else {
                    curCompany = '';
                    grouped.push([docs[i]]);
                }
            }


        }
        return grouped;
    },
    isNoneMember: (roleId, companyId) => {
        return roleId > 2 && !companyId ? true : false
    },
    isAdmin: (roleId) => {
        return roleId < 3 ? true : false
    }
}

module.exports = Helper
