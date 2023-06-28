const Truck = require("../../model/truckModel");
const Company = require("../../model/companyModel");
const nodemailer = require("nodemailer");
const moment = require("moment");
import { TruckType } from "../../types/truckTypes";

const checkTruckValidation = async () => {
  try {
    const trucks = await Truck.find();

    trucks.forEach(async (truck: TruckType) => {
      const company = await Company.findById(truck.companyId);

      const presentDate = new Date();
      const nextHUDate = truck.nextHU;
      const nextSPDate = truck.nextSP;
      const differenceOne = nextHUDate.getTime() - presentDate.getTime();
      const differenceTwo = nextSPDate.getTime() - presentDate.getTime();
      const calculateOne = Math.ceil(differenceOne / (1000 * 3600 * 24));
      const calculateTwo = Math.ceil(differenceTwo / (1000 * 3600 * 24));
      const caseOne = calculateOne;
      const caseTwo = calculateTwo;

      if (caseOne === 90 || caseTwo === 90) {
        console.log(
          `Sending E-Mail and Notification about truck ${truck.indicator}.`
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
          subject: `Information Fleet Managment ${moment()
            .locale("de")
            .format("DD.MM.YYYY")}`,
          html: `<p>Truck: ${truck.indicator}</p>
           <p>${company.companyName}</p>

              ${
                caseOne === 90
                  ? `<p>Main inspection in 3 months on ${moment(
                      nextHUDate
                    ).format("MM.YYYY")}</p>`
                  : `<p>General inspection not yet due</p>`
              }
              ${
                caseTwo === 90
                  ? `<p>Security check in 3 months on ${moment(
                      nextSPDate
                    ).format("MM.YYYY")}</p>`
                  : `<p>Security check not yet due</p>`
              }
              `,
        });
        console.log(`Message about ${truck.indicator} sent, Status 200 OK!`);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  checkTruckValidation,
};
