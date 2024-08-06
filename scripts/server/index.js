const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const validations = require("./middleware/validations");
const dayjs = require("dayjs");
const uniqid = require("uniqid");
const _ = require("lodash");
const utc = require('dayjs/plugin/utc');
var cors = require('cors')

const app = express();
app.use(cors()) 

dayjs.extend(utc);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createPool({
  connectionLimit: 10,
  host: 'db',
  user: "root",
  password: "root",
  database: "SQLdb",
  port: 3306,
});

formBehaviour = {};

app.get("/user", async (req, res) => {
  try {
      let query = "SELECT * from SEC_USER";
      const result = await connection.promise().query(query);
      let employeeList = result[0];
      if (employeeList.length === 0) {
        return res
          .status(200)
          .send({ message: "No Records to display", statuscode: 200 });
      } 
      for (let i = 0; i < employeeList.length; i++) {
        employeeList[i].USER_START_DT = dayjs( employeeList[i].USER_START_DT).format("YYYY-MM-DD");
        employeeList[i].USER_END_DT = employeeList[i].USER_END_DT.toString().includes("Fri Dec 31 9999 00:00:00") ? "" : dayjs(employeeList[i].USER_END_DT).format("YYYY-MM-DD");
        employeeList[i] = mappingFields(employeeList[i], "toUI");
        }
        res.status(200).send({
          statuscode: 200,
          message : "Successfully retrieved records",
          employeeList: employeeList,
        });  
  } catch (error) {
    res
      .status(500)
      .send({ message: "Unable to connect to the database", statuscode: 500 });
  }
});

app.get("/user/filter", async (req, res) => {
  filterValue = req.query.filterBy.toLowerCase();
  try {
      const query = `SELECT * FROM SEC_USER WHERE LOWER(USER_FIRST_NM) LIKE '%${filterValue}%'OR LOWER(USER_LAST_NM) LIKE '%${filterValue}%'OR LOWER(USER_LOC_CD) LIKE '%${filterValue}%'OR LOWER(USER_EMP_ID) LIKE '%${filterValue}%'OR LOWER(USER_EMAIL) LIKE '%${filterValue}%'OR LOWER(USER_PHONE) LIKE '%${filterValue}%'OR LOWER(ORG_CD) LIKE '%${filterValue}%'OR LOWER(USER_ROLE) LIKE '%${filterValue}%'OR LOWER(USER_START_DT) LIKE '%${filterValue}%'OR LOWER(USER_END_DT) LIKE '%${filterValue}%';`;
      const result = await connection.promise().query(query);
      let employeeList = result[0];
      if (employeeList.length === 0) {
        return res.status(200).send({ message: "No Records to display", statuscode: 200 });
      }
      for (let i = 0; i < employeeList.length; i++) {
        employeeList[i].USER_START_DT = dayjs( employeeList[i].USER_START_DT ).format("YYYY-MM-DD");
        employeeList[i].USER_END_DT = employeeList[i].USER_END_DT.toString().includes("Fri Dec 31 9999 00:00:00") ? "" : dayjs(employeeList[i].USER_END_DT).format("YYYY-MM-DD");
        employeeList[i] = mappingFields(employeeList[i], "toUI");
        }
        res.status(200).send({
          statuscode: 200,
          message : "Successfully retrieved records",
          employeeList: employeeList,
        });  
  } catch (error) {
    res
      .status(500)
      .send({ message: "Unable to connect to the database", statuscode: 500 });
  }
});

app.get("/user/:id", async (req, res) => {
  const userID = req.params.id;  
  try {
      const query = `SELECT * FROM SEC_USER WHERE USER_ID = '${userID}';`;
      const employeeRecord = await connection.promise().query(query);
      let userRecord = employeeRecord[0][0];
      if(!userRecord){
        return res.status(404).send({ message: "No record found", statuscode: 404 });
      }
      userRecord.USER_START_DT = dayjs( userRecord.USER_START_DT ).format("YYYY-MM-DD");
      userRecord.USER_END_DT = userRecord.USER_END_DT.toString().includes("Fri Dec 31 9999 00:00:00") ? "" : dayjs(userRecord.USER_END_DT).format("YYYY-MM-DD");
      userRecord = mappingFields(userRecord, "toUI");
      res.status(200).send({
        statuscode: 200,
        message : "Successfully retrieved record",
        userRecord: userRecord,
      });
    
  } catch (error) {
    res
      .status(500)
      .send({ message: "Unable to connect to the database", statuscode: 500 });
  }
});

app.put("/user/:id", [validations], async (req, res) => {
  let userInput =req.body;
  let document = mappingFields(userInput, "toDB");
  const userID = req.params.id;
  try {
    if (req.headers.accept != "application/json" || req.headers["content-type"] != "application/json" ) {
      return res.status(400).send({ message: "Not a supported header type.", statuscode: 400 });
    } 
      if (formBehaviour.validationCheck == false) {
        document.USER_END_DT = document.USER_END_DT || "9999-12-31";
        
        document.USER_START_DT = dayjs(document.USER_START_DT).format("YYYY-MM-DD")
        document.USER_END_DT = dayjs(document.USER_END_DT).format("YYYY-MM-DD");

        const fetchRecord = `SELECT * FROM SEC_USER WHERE USER_ID = '${userID}';`;
        const retrievedUser = await connection.promise().query(fetchRecord);
        let recordDetails = retrievedUser[0][0];
        if(!recordDetails){
          return res.status(404).send({ message: "No record found", statuscode: 404 });
        }
        recordDetails.USER_START_DT = dayjs(recordDetails.USER_START_DT).format("YYYY-MM-DD")
        recordDetails.USER_END_DT = dayjs(recordDetails.USER_END_DT).format("YYYY-MM-DD");
       
        let message;

        if (_.isMatch(recordDetails , document)) {
          message = "No Changes to Update";
        } else {
          const query = `UPDATE SEC_USER SET USER_FIRST_NM = '${document.USER_FIRST_NM}', USER_LAST_NM = '${document.USER_LAST_NM}', USER_EMP_ID = '${document.USER_EMP_ID}', USER_EMAIL = '${document.USER_EMAIL}',  USER_PHONE = '${document.USER_PHONE}', ORG_CD = '${document.ORG_CD}', USER_CNTRY_CD = '${document.USER_CNTRY_CD}', USER_LOC_CD = '${document.USER_LOC_CD}', USER_LOCALE = '${document.USER_LOCALE}',  USER_TZ = '${document.USER_TZ}', USER_CIDRS = '${document.USER_CIDRS}', USER_STATUS = '${document.USER_STATUS}', USER_ROLE = '${document.USER_ROLE}', USER_START_DT = '${document.USER_START_DT}', USER_END_DT = '${document.USER_END_DT}'
          WHERE USER_ID = '${userID}';`;
          const result = await connection.promise().query(query);
          message = "Record Updated successfully";
        }
        res.status(200).send({
          statuscode: 200,
          message: message,
          userRecord :userInput
        });
      } else {
        let message = formBehaviour.message;
        res.status(200).send({
          statuscode: 200,
          message: message,
          userRecord :userInput
        });
      }
    
  } catch (error) {
    if (error.sqlMessage != undefined && error.sqlMessage.toString().includes("Duplicate entry") ) {
      return res.status(400).send({ message: "Duplicate Record Found", statuscode: 400 });
    } 
      return res.status(500).send({ message: "Unable to connect to the database",  statuscode: 500 }); 
  }
});

app.patch("/user/:id", [validations], async (req, res) => {
  let userInput = req.body;
  let document = mappingFields(userInput, "toDB");
  let userID = req.params.id;
  try {
    if (req.headers.accept != "application/json" || req.headers["content-type"] != "application/json") {
      return res.status(400).send({ message: "Not a supported header type.", statuscode: 400 });
    } 
      if (formBehaviour.validationCheck == false) {
        const fetchRecord = `SELECT * FROM SEC_USER WHERE USER_ID = '${userID}';`;
        const retrievedUser = await connection.promise().query(fetchRecord);
        let recordDetails = retrievedUser[0][0];
        if(!recordDetails){
          return res.status(404).send({ message: "No record found", statuscode: 404 });
        }
        let message;
        if (recordDetails.USER_PW == document.USER_PW) {
          message = "No Changes to Update";
        } else {
          const query = `UPDATE SEC_USER SET USER_PW = '${document.USER_PW}' WHERE USER_ID = '${userID}';`;
          const result = await connection.promise().query(query);
          message = "Password Updated successfully";
        }
        return res.status(200).send({
          message: message,
          statuscode: 200,
          userRecord : userInput
        });
      } else {
        let message = formBehaviour.message;
        res.status(200).send({
          message: message,
          statuscode: 200,
        });
      }
    
  } catch (error) {
    res
      .status(500)
      .send({ message: "Unable to connect to the database", statuscode: 500 });
  }
});

app.post("/user", [validations], async (req, res) => {
  try {
    if (req.headers.accept != "application/json" || req.headers["content-type"] != "application/json") {
      return res.status(400).send({ message: "Not a supported header type.", statuscode: 400 });
    } 
      let document = mappingFields(req.body, "toDB");
      if (formBehaviour.validationCheck == false) {
        const USER_ID = uniqid().toString();
        let endDate = "9999-12-31";       
        document.USER_START_DT =  dayjs(document.USER_START_DT).format("YYYY/MM/DD");        
        const query = `INSERT INTO SEC_USER (USER_ID, USER_FIRST_NM, USER_LAST_NM, USER_EMP_ID, USER_EMAIL, USER_PHONE, ORG_CD, USER_CNTRY_CD, USER_LOC_CD, USER_LOCALE, USER_TZ, USER_CIDRS, USER_STATUS, USER_ROLE, USER_START_DT, USER_END_DT, USER_PW, CRT_BY_USER, UPD_BY_USER, CRT_BY_TS, UPD_BY_TS)
      VALUES ('${USER_ID}', '${document.USER_FIRST_NM}', '${document.USER_LAST_NM}', '${document.USER_EMP_ID}', '${document.USER_EMAIL}', '${document.USER_PHONE}', '${document.ORG_CD}', '${document.USER_CNTRY_CD}', '${document.USER_LOC_CD}', '${document.USER_LOCALE}', '${document.USER_TZ}', '${document.USER_CIDRS}', '${document.USER_STATUS}', '${document.USER_ROLE}', '${document.USER_START_DT}', '${endDate}', '${document.USER_PW}', 'alonkar', 'alonkar', (CURRENT_TIMESTAMP), (CURRENT_TIMESTAMP));`;
        const result = await connection.promise().query(query);
        const fetch = `SELECT * FROM SEC_USER WHERE USER_ID = '${USER_ID}';`;
        const employeeRecord = await connection.promise().query(fetch);
        let userRecord = employeeRecord[0][0];
        userRecord.USER_START_DT = dayjs(document.USER_START_DT).format("YYYY-MM-DD")
        userRecord.USER_END_DT = userRecord.USER_END_DT.toString().includes("Fri Dec 31 9999 00:00:00") ? "" : dayjs(userRecord.USER_END_DT).format("YYYY-MM-DD");
        userRecord = mappingFields(userRecord, "toUI");
        res.status(200).send({
          message: "User Record Created successfully",
          statuscode: 200,
          userRecord : userRecord
        });
      } else {
        let message = formBehaviour.message;
        res.status(200).send({
          message: message,
          statuscode: 200,
        });
      }   
  } catch (error) {
    if ( error.sqlMessage != undefined &&error.sqlMessage.toString().includes("Duplicate entry")) {
      return res.status(400).send({ message: "Duplicate Record Found", statuscode: 400 });
    } 
      return res.status(500).send({message: "Unable to connect to the database", statuscode: 500 });
  }
});

app.delete("/user/:id", async (req, res) => {
  const userID = req.params.id;
  try {
    if ( req.headers.accept != "application/json"  ) {
      return  res .status(400).send({ message: "Not a supported header type.", statuscode: 400 });
    }
      const query = `DELETE FROM SEC_USER WHERE USER_ID = '${userID}';`;
      const employeeRecord = await connection.promise().query(query);
      if(employeeRecord[0].affectedRows == 0){
        return res.status(404).send({ message: "No record found", statuscode: 404 });
      }
      return res
        .status(200)
        .send({ message: "User Deleted Successfully", statuscode: 200 }); 
  } catch (error) {
    res
      .status(500)
      .send({ message: "Unable to connect to the database", statuscode: 500 });
  }
});

function mappingFields(record, to) {
  mappedRecord = {};

  let referenceDictionary = {
    USER_ID: "ID",
    USER_EMP_ID: "employeeID",
    USER_FIRST_NM: "firstName",
    USER_LAST_NM: "lastName",
    USER_EMAIL: "email",
    USER_PHONE: "phone",
    ORG_CD: "organizationCode",
    USER_ROLE: "role",
    USER_CNTRY_CD: "countryCode",
    USER_LOC_CD: "locationCode",
    USER_LOCALE: "locale",
    USER_TZ: "timeZone",
    USER_CIDRS: "CIDRS",
    USER_START_DT: "startDate",
    USER_END_DT: "endDate",
    USER_STATUS: "status",
    USER_PW: "password",
  };
  if (to === "toUI") {
    for (k in record) {
      if (referenceDictionary.hasOwnProperty(k)) {
        mappedRecord[referenceDictionary[k]] = record[k];
      }
    }
  } else if (to === "toDB") {
    for (const key in referenceDictionary) {
      if (record.hasOwnProperty(referenceDictionary[key])) {
        mappedRecord[key] = record[referenceDictionary[key]];
      }
    }
  }
  return mappedRecord;
}

app.listen(5500, () => console.log(`Listening on port 5500...`));

module.exports = formBehaviour;
