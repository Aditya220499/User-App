formBehaviour = require("../index.js");
const dayjs = require("dayjs");

module.exports = function (req, res, next) {

  let method = req.method;
  let action
  if(method.includes('POST'))
    action = "CreateForm";
  else if(method.includes('PATCH'))
    action = "EditPassword";
  else if(method.includes('PUT'))
    action = "EditForm";
  
  formBehaviour.validationCheck = false;
  let document = req.body;
  if (
    action == "CreateForm" ||
    action == "EditForm" ||
    action == "EditPassword"
  ) {
    for (let key in document) {
      if (
        document[key] === "" &&
        key !== "CIDRS" &&
        key !== "ID" &&
        key !== "endDate"
      ) {
        formBehaviour.message = "Please fill all the Mandatory Fields";
        formBehaviour.validationCheck = true;
      }
      if (document[key] === "" && key === "CIDRS") {
        req.body.CIDRS = "0.0.0.0/0";
      }
    }
  }

  if ((action == "CreateForm" || action == "EditForm") && formBehaviour.validationCheck == false) {

    const email = document.email;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
      formBehaviour.message = 'Invalid Email ID';
      formBehaviour.validationCheck = true;
    }

  }

  if (action == "EditForm" && formBehaviour.validationCheck == false) {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    const isStartDateBeforeEndDate = dayjs(startDate).isBefore(dayjs(endDate));

    if (!isStartDateBeforeEndDate && endDate != '') {
      formBehaviour.message = "Start Date must be before End Date";
      formBehaviour.validationCheck = true;
    }

  }

  next();
};
