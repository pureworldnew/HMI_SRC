# express-mysql-rest
Boilerplate for building the rest api with sequelize and mysql using express js. the repository will contains crud operation with mysql database using sequelize ORM.

## Prerequisite
 1. Express JS
 2. mysql2
 3. sequelize-cli
 4. sequelize
 5. nodemon
 6. doenv

## Installation
 1. clone the repository
 2. install the ```sequelize cli``` for support ORM command
         For `npm` package: ```npm install -g sequelize-cli```
         For `yarn` package: ```yarn add global sequelize-cli```

 3. run command for npm ```npm install```  and for yarn ```yarn install```
 4. create database to mysql, if you use command line, command will be
    ```>mysql -u <username> -p <password> ```
    ```mysql> create DATABASE test_dev```
    ```mysql> exit```
 5. then use command for migrate the database
        1. for Yarn command : ```yarn db:migrate```
        2. for npm command  : ```npm run db:migrate```
 6. For development purpose user command ```yarn start:dev```

 ## Predefiend api endpoint

 1. For consuming the get api or list for user ```[GET]http://localhost:3000/api/users``` 
 2. For posting the data to api ```[POST]http://localhost:3000/api/users``` 
        Request Body:
        {
                firstName: 'example name',
                lastName: 'example last name,
                email: 'example email'
        }

## Create the New Model for Application

```
$ sequelize model:create --name User --attributes firstName:string, lastName:string, email:string
```

this command will create the model file with migration file at `db` folder.those are file name are based on model name
        1. db/model/<model>.js file
        2. db/migration/ <date>-create-user.js


## Sequelize Command for development
sequelize model:create --name User --attributes userId:string,fullName:string,emailAddress:string,password:string,roleId:integer,lastLogin:string,avatarUrl:string

sequelize model:create --name Role --attributes roleName:string

sequelize model:generate --name UserRole --attributes userId:INTEGER,roleId:INTEGER

sequelize model:create --name Company --attributes companyName:string,googleApi:string,googleSheet:string

sequelize model:create --name Segment --attributes SegmentID:string,SegmentName:string,LowValue:string,HighValue:string,MonthlyLowValue:string,MonthlyHighValue:string,company_Id:INTEGER

sequelize model:create --name Contract --attributes Company:string,EventsCompanyName:string,CompanyID:string,ContractCompanyName:string,ContractAddress:string,ContractID:string,Active:string,ContractDate:date,ContractType:string,TheirExecutor:string,TheirExecutorTitle:string,OurExecutor:string,GoLiveDate:date,ContractStartDate:date,ContractEndDate:date,ContractEndTerminationDate:date,ContractMonths:string,DaysUntilRenewal:string,BillingStartDate:date,BillingFrequency:string,ContractTerm:string,TermMetric:string,AnnualContractValue:string,TotalContractValue:string,CurrentARR:string,SegmentID:string,SegmentName:string,ProductsPurchased:string,Product:string,Discounts:string,TerminationRights:string,NoticetoTerminate:string,NoticetoTerminateUnits:string,AccountExecutiveID:string,AccountExecutive:string,AccountManagerID:string,AccountManager:string,TerminationDate:date,TerminationReasonID:string,TerminationReason:string,TerminationNotes:string,PlanName:string,PlanName2:string,AutoRenew:string,Invoicing:string,InvoiceAmount:string,PricePerUser:string,LicensesPurchased:string,ContractExternalURL:string,ContractInternalURL:string,Delivery:string,company_Id:INTEGER

sequelize model:create --name Contracts_waterfall --attributes Company:string,ContractID:string,AccountManager:string,AnnualContractValue:string,StartDate:date,EndDate:date,Months:string,StartMonth:string,StartYear:string,MonthlyValue:string,SegmentID:string,Segment:string,TerminationReasonID:string,Jan2019:string,Feb2019:string,Mar2019:string,Apr2019:string,May2019:string,Jun2019:string,Jul2019:string,Aug2019:string,Sep2019:string,Oct2019:string,Nov2019:string,Dec2019:string,Jan2020:string,Feb2020:string,Mar2020:string,Apr2020:string,May2020:string,Jun2020:string,Jul2020:string,Aug2020:string,Sep2020:string,Oct2020:string,Nov2020:string,Dec2020:string,Jan2021:string,Feb2021:string,Mar2021:string,Apr2021:string,May2021:string,Jun2021:string,Jul2021:string,Aug2021:string,Sep2021:string,Oct2021:string,Nov2021:string,Dec2021:string,company_Id:INTEGER

sequelize model:create --name Contract --attributes Date:date,Company:string,CompanyID:string,ContractID:string,Active:string,ContractDate:date,GoLiveDate:date,ContractStartDate:date,ContractEndDate:date,ContractEndTerminationDate:date,ContractMonths:string,DaysUntilRenewal:string,BillingStartDate:string,BillingFrequency:string,ContractTerm:string,TermMetric:string,AnnualContractValue:string,CurrentARR:string,SegmentID:string,SegmentName:string,ProductsPurchased:string,Product:string,TerminationRights:string,AccountExecutiveID:string,AccountExecutive:string,AccountManagerID:string,AccountManager:string,TerminationDate:date,TerminationReasonID:string,TerminationReason:string,TerminationNotes:string,PlanName:string,PlanName2:string,AutoRenew:string,PricePerUser:string,LicensesPurchased:string,ContractExternalURL:string,ContractInternalURL:string,company_Id:INTEGER

## Sequelize Seed creation for development
npx sequelize-cli seed:generate --name demo-user
## Running Seeds
npx sequelize-cli db:seed:all

## Migrate specific file
npm run db:migrate --name 20200423094018-create-segment.js
