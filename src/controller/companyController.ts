import { NextFunction, Request, Response } from "express";

interface ErrorMessage {
  message: string;
}

interface Error {
  errors: Record<any, ErrorMessage>;
  message: string;
}

const mongooseErrorHandler = (error: Error) => {
  var errorMessage = null;
  if (error.errors) errorMessage = Object.values(error.errors)[0].message;
  return errorMessage || error.message;
};

const Company = require("../model/companyModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Sign up company
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const emailExist = await Company.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(422).json({
        message: "E-mail allready exists",
      });
    }

    const emailToken = crypto.randomBytes(32).toString("hex");

    const company = new Company({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      companyName: req.body.companyName,
      ceo: req.body.ceo,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      street: req.body.street,
      houseNumber: req.body.houseNumber,
      zipCode: req.body.zipCode,
      city: req.body.city,
      communityLicence: req.body.communityLicence,
      emailVerificationToken: emailToken,
    });

    await company.save();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tarekjassine@gmail.com",
        pass: "wonoytjxbqgxhjtm",
      },
    });
    await transport.sendMail({
      from: "tarekjassine@gmail.com",
      to: company.email,
      subject: "Verify your E-Mail",
      html: `<p>Verify your E-Mail to use the App</p>
            <a href="http://localhost:3000/verify-email?token=${emailToken}">click here to verify</a>      
      `,
    });

    const token = jwt.sign(
      {
        companyId: company._id,
      },
      "secret123456",
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Company signed up",
      company: {
        _id: company._id,
        firstName: company.firstName,
        lastName: company.lastName,
        companyName: company.companyName,
        ceo: company.ceo,
        phoneNumber: company.phoneNumber,
        email: company.email,
        password: company.password,
        confirmPassword: company.confirmPassword,
        street: company.street,
        houseNumber: company.houseNumber,
        zipCode: company.zipCode,
        city: company.city,
        communityLicence: company.communityLicence,
        emailVerified: company.emailVerified,
      },
      token,
    });
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

// Verify Account
const verifyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const company = await Company.findOne({
      emailVerificationToken: req.body.token,
    });
    if (!company) {
      return res.status(422).json({
        message: "Invalid token!",
      });
    }
    company.emailVerified = true;
    await company.save();
    res.json(company);
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

// Sign in
const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const company = await Company.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (req.body.email.length === 0) {
      return res.status(422).json({
        message: "E-mail is required",
      });
    }

    if (req.body.password.length === 0) {
      return res.status(422).json({
        message: "Password is required",
      });
    }

    if (!company) {
      return res.status(422).json({
        message: "Wrong e-mail or password",
      });
    }

    const token = jwt.sign(
      {
        companyId: company._id,
      },
      "secret123",
      {
        expiresIn: "7d",
      }
    );

    res.json({
      company: {
        _id: company._id,
        firstName: company.firstName,
        lastName: company.lastName,
        companyName: company.companyName,
        ceo: company.ceo,
        phoneNumber: company.phoneNumber,
        email: company.email,
        password: company.password,
        confirmPassword: company.confirmPassword,
        street: company.street,
        houseNumber: company.houseNumber,
        zipCode: company.zipCode,
        city: company.city,
        communityLicence: company.communityLicence,
        emailVerified: company.emailVerified,
      },
      token,
    });
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

// Get profile
const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const company = await Company.findById(req.body.companyId).select(
      "-password"
    );
    res.json(company);
  } catch (err) {
    res.status(401).json({
      message: "Please sign in",
    });
  }
};

module.exports = {
  signUp,
  verifyAccount,
  signIn,
  getProfile,
};
