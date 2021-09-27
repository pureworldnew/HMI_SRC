# express-mysql-rest

Boilerplate for building the rest api with sequelize and mysql using express js. the repository will contains crud operation with mysql database using sequelize ORM.

## Prerequisite

1.  Express JS
2.  mysql2
3.  sequelize-cli
4.  sequelize
5.  nodemon
6.  doenv

## Installation

1.  clone the repository
2.  install the `sequelize cli` for support ORM command
    For `npm` package: `npm install -g sequelize-cli`
    For `yarn` package: `yarn add global sequelize-cli`

3.  run command for npm `npm install` and for yarn `yarn install`
4.  create database to mysql, if you use command line, command will be
    `>mysql -u <username> -p <password> `
    `mysql> create DATABASE test_dev`
    `mysql> exit`
5.  then use command for migrate the database 1. for Yarn command : `yarn db:migrate` 2. for npm command : `npm run db:migrate`
6.  For development purpose user command `yarn start:dev`

## Predefiend api endpoint

1.  For consuming the get api or list for user `[GET]http://localhost:3000/api/users`
2.  For posting the data to api `[POST]http://localhost:3000/api/users`
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

this command will create the model file with migration file at `db` folder.those are file name are based on model name 1. db/model/<model>.js file 2. db/migration/ <date>-create-user.js

## Sequelize Command for development

sequelize model:create --name notification --attributes trigger_temperature:string,trigger_temperature_condition:string,trigger_temperature_unit:string,settings_subject:string,settings_message:string,settings_user_id:INTEGER,extra_acknowledgeMode:string,extra_smsMessage:string,extra_snoozeMode:string,extra_snoozePeriod:string,extra_voiceText:string,action_name:string,sensor_id:INTEGER

sequelize model:create --name sensorlog --attributes includeDate:DATEONLY,includeTime:time,deviceName:string,macAddress:string,temp1:string,temp2:string,voltage:double, includeDateTime:date

sequelize model:create --name user --attributes userId:string,fullName:string,emailAddress:string,password:string,roleId:integer,lastLogin:string,avatarUrl:string

sequelize model:create --name role --attributes roleName:string

sequelize model:create --name setting --attributes lowLimitVol:double,cautionLimitVol:double,logUrl:string

sequelize model:generate --name userrole --attributes userId:INTEGER,roleId:INTEGER

## Sequelize Seed creation for development

npx sequelize-cli seed:generate --name demo-user

## Running Seeds

npx sequelize-cli db:seed:all

## Migrate specific file

npm run db:migrate --name 20200423094018-create-segment.js

## MySQL setting on server

mysql> SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
