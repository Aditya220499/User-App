import { rest } from 'msw';

export const handlers = [
  rest.get("http://localhost:5500", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        statuscode: 200,
        message: "Successfully retrieved records",
        employeeList: [{
          CIDRS: "0.0.0.0/0",
          ID: "25v0t6yclogqmjyn",
          countryCode: "United States of America",
          email: "jcook@gmail.com",
          employeeID: "jcook",
          endDate: "",
          firstName: "Joe",
          lastName: "Cook",
          locale: "US English",
          locationCode: "Work From Home, USA",
          organizationCode: "R3 Services",
          password: "12345!!123",
          phone: "+1 (445) 456-5379",
          role: "Admin",
          startDate: "2023-10-31",
          status: "Inactive",
          timeZone: "CST",
        },
        {
          CIDRS: "0.0.0.0/0",
          ID: "25v0t6yclogqmjy6",
          countryCode: "India",
          email: "alonkar@gmail.com",
          employeeID: "alonkar",
          endDate: "",
          firstName: "Aditya",
          lastName: "Lonkar",
          locale: "India English",
          locationCode: "Work From Home, India",
          organizationCode: "Quadyster",
          password: "12345!!@123",
          phone: "+91 95554 5578",
          role: "User",
          startDate: "2023-10-31",
          status: "Inactive",
          timeZone: "IST",
        }
        ],
      })
    );
  }),

  rest.get("http://localhost:5500/user/filter", (req, res, ctx) => {
    let value = String(req.url).split('=')[1]
    if (value === "India") {
      return res(
        ctx.status(200),
        ctx.json({
          statuscode: 200,
          message: "Successfully retrieved records",
          employeeList: [
            {
              CIDRS: "0.0.0.0/0",
              ID: "25v0t6yclogqmjy6",
              countryCode: "India",
              email: "alonkar@gmail.com",
              employeeID: "alonkar",
              endDate: "",
              firstName: "Aditya",
              lastName: "Lonkar",
              locale: "India English",
              locationCode: "Work From Home, India",
              organizationCode: "Quadyster",
              password: "12345!!@123",
              phone: "+91 95554 5578",
              role: "User",
              startDate: "2023-10-31",
              status: "Inactive",
              timeZone: "IST",
            }
          ],
        })
      );
    } else if (value === "Germany") {
      return res(
        ctx.status(200),
        ctx.json({
          statuscode: 200,
          message: "No Records to display",
        })
      );
    }
  }),

  rest.patch("http://localhost:5500/user/:id", async (req, res, ctx) => {
    const { CIDRS, ID, countryCode, email, employeeID, endDate, firstName, lastName, locale, locationCode, organizationCode, password, phone, role, startDate, status, timeZone } = await req.json();
    if (ID === "2c599qufclhfh3qom" && employeeID === 'ahales') {
      return res(
        ctx.status(200),
        ctx.json({
          message: "Password Updated successfully",
          statuscode: 200,
          userRecord: {
            CIDRS: CIDRS,
            ID: ID,
            countryCode: countryCode,
            email: email,
            employeeID: employeeID,
            endDate: endDate,
            firstName: firstName,
            lastName: lastName,
            locale: locale,
            locationCode: locationCode,
            organizationCode: organizationCode,
            password: password,
            phone: phone,
            role: role,
            startDate: startDate,
            status: status,
            timeZone: timeZone,
          },
        })
      );
    }
  }),

  rest.put("http://localhost:5500/user/:id", async (req, res, ctx) => {
    const { CIDRS, ID, countryCode, email, employeeID, endDate, firstName, lastName, locale, locationCode, organizationCode, password, phone, role, startDate, status, timeZone } = await req.json();
    if (ID === "2c599qufclhfh3qom" && employeeID === 'ahales') {
      return res(
        ctx.status(200),
        ctx.json({
          message: "No Changes to Update",
          statuscode: 200,
          userRecord: {
            CIDRS: CIDRS,
            ID: ID,
            countryCode: countryCode,
            email: email,
            employeeID: employeeID,
            endDate: endDate,
            firstName: firstName,
            lastName: lastName,
            locale: locale,
            locationCode: locationCode,
            organizationCode: organizationCode,
            password: password,
            phone: phone,
            role: role,
            startDate: startDate,
            status: status,
            timeZone: timeZone,
          },
        })
      );
    } else if (ID === "2c599qufclhfh3qom" && employeeID === 'alexhales') {
      return res(
        ctx.status(200),
        ctx.json({
          message: "Record Updated successfully",
          statuscode: 200,
          userRecord: {
            CIDRS: CIDRS,
            ID: ID,
            countryCode: countryCode,
            email: email,
            employeeID: employeeID,
            endDate: endDate,
            firstName: firstName,
            lastName: lastName,
            locale: locale,
            locationCode: locationCode,
            organizationCode: organizationCode,
            password: password,
            phone: phone,
            role: role,
            startDate: startDate,
            status: status,
            timeZone: timeZone,
          },
        })
      );
    }
  }),

  rest.post("http://localhost:5500/user", async (req, res, ctx) => {
    const { CIDRS, ID, countryCode, email, employeeID, endDate, firstName, lastName, locale, locationCode, organizationCode, password, phone, role, startDate, status, timeZone } = await req.json();
    if (
      (employeeID === "jcook" &&
        email === "jcook@gmail.com") ||
      (employeeID === "jcook" &&
        organizationCode === "R3 Services")
    ) {
      return res(
        ctx.status(400),
        ctx.json({
          message: "Duplicate Record Found", statuscode: 400
        })
      )
    } else if (ID === "" && startDate === "2022-01-02" && endDate === "2023-01-02") {
      return res(
        ctx.status(201),
        ctx.json({
          message: "User Record Created successfully",
          statuscode: 201,
          userRecord: {
            CIDRS: CIDRS,
            ID: "2c599qufclhfh3qom",
            countryCode: countryCode,
            email: email,
            employeeID: employeeID,
            endDate: endDate,
            firstName: firstName,
            lastName: lastName,
            locale: locale,
            locationCode: locationCode,
            organizationCode: organizationCode,
            password: password,
            phone: phone,
            role: role,
            startDate: startDate,
            status: status,
            timeZone: timeZone,
          }
        })
      );
    } else if (ID === "" && startDate === "2022-01-02" && endDate === "2020-01-02") {
      return res(
        ctx.status(200),
        ctx.json({
          message: "Start Date must be before End Date",
          statuscode: 200,
        })
      );
    }
  }),

];