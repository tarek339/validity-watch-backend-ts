import { DriverType } from "../../types/driverTypes";
const Driver = require("../../model/driverModel");
const Company = require("../../model/companyModel");
const nodemailer = require("nodemailer");
const moment = require("moment");

const checkDriverDocsValidation = async () => {
  try {
    const drivers = await Driver.find();

    drivers.forEach(async (driver: DriverType) => {
      const company = await Company.findById(driver.companyId);

      const presentDate = new Date();
      const expireDayLicence = driver.licenceTypExpire;
      const expireDayCodeNumber = driver.codeNumberExpire;
      const expireDaydriverCardNum = driver.driverCardNumberExpire;

      const differenceOne = expireDayLicence.getTime() - presentDate.getTime();
      const differenceTwo =
        expireDayCodeNumber.getTime() - presentDate.getTime();
      const differenceThree =
        expireDaydriverCardNum.getTime() - presentDate.getTime();

      const calculateOne = Math.ceil(differenceOne / (1000 * 3600 * 24));
      const calculateTwo = Math.ceil(differenceTwo / (1000 * 3600 * 24));
      const calculateThree = Math.ceil(differenceThree / (1000 * 3600 * 24));

      const caseOne = calculateOne;
      const caseTwo = calculateTwo;
      const caseThree = calculateThree;

      const caseOneT = calculateOne;
      const caseTwoT = calculateTwo;
      const caseThreeT = calculateThree;

      if (
        caseOne === 180 ||
        caseTwo === 180 ||
        caseThree === 180 ||
        caseOneT === 90 ||
        caseTwoT === 90 ||
        caseThreeT === 90
      ) {
        console.log(
          `Sending E-Mail and Notification about driver ${driver.firstName} ${driver.lastName}.`
        );

        const transport = nodemailer.createTransport({
          service: "gmail",
          port: false,
          secure: true,
          auth: {
            user: "tarekjassine@gmail.com",
            pass: "wonoytjxbqgxhjtm",
          },
        });
        await transport.sendMail({
          from: "tarekjassine@gmail.com",
          to: `${company.email}`,
          subject: `Information Fleet Management ${moment()
            .locale("de")
            .format("DD.MM.YYYY")}`,
          html: `<p>${driver.firstName} ${driver.lastName}</p>
          <p>${company.companyName}</p>
              ${
                caseOne === 180
                  ? `<p>Driving license expires in 6 months</p>
              <p>Expiration on ${moment(driver.licenceTypExpire).format(
                "DD.MM.YYYY"
              )}.</p>`
                  : `<p>Driving license is still valid</p>` && caseOneT === 90
                  ? `<p>Driving license expires in 3 months</p>
              <p>Expiration on ${moment(driver.licenceTypExpire).format(
                "DD.MM.YYYY"
              )}.</p>`
                  : `<p>Driving license is still valid</p>`
              }

              <p>-----------------------------------------------------------</p>

              ${
                caseTwo === 180
                  ? `<p>Code number expires in 6 months</p>
              <p>Expiration on ${moment(driver.codeNumberExpire).format(
                "DD.MM.YYYY"
              )}.</p>`
                  : `<p>Code number is still valid</p>` && caseTwoT === 90
                  ? `<p>Code number expires in 3 months</p>
              <p>Expiration on ${moment(driver.codeNumberExpire).format(
                "DD.MM.YYYY"
              )}.</p>`
                  : `<p>Code number is still valid</p>`
              }

              <p>-----------------------------------------------------------</p>

              ${
                caseThree === 180
                  ? `<p>Driver card expires in 6 months</p>
                <p>Expiration on ${moment(driver.driverCardNumberExpire).format(
                  "DD.MM.YYYY"
                )}.</p>`
                  : `<p>Driver card is still valid</p>` && caseThreeT === 90
                  ? `<p>Driver card expires in 3 months</p>
                <p>Expiration on ${moment(driver.driverCardNumberExpire).format(
                  "DD.MM.YYYY"
                )}.</p>`
                  : `<p>Driver card is still valid</p>`
              }
              `,
        });
        console.log(
          `Message about ${driver.firstName} ${driver.lastName} sent, Status 200 OK!`
        );
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  checkDriverDocsValidation,
};
