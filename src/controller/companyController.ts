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
            <a href="http://localhost:3000/verify-email?token=${emailToken}">click here to verify and sign in</a>      
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
      "-password -confirmPassword"
    );
    res.json(company);
  } catch (err) {
    res.status(401).json({
      message: "Please log in",
    });
  }
};

// edit company data
const editProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const company = await Company.findById(req.body.companyId);

    company.firstName = req.body.firstName;
    company.lastName = req.body.lastName;
    company.companyName = req.body.companyName;
    company.ceo = req.body.ceo;
    company.phoneNumber = req.body.phoneNumber;
    company.street = req.body.street;
    company.houseNumber = req.body.houseNumber;
    company.zipCode = req.body.zipCode;
    company.city = req.body.city;
    company.communityLicence = req.body.communityLicence;

    await company.save();
    res.json({
      message: "Profile data successfully changed",
      company: {
        _id: company._id,
        firstName: company.firstName,
        lastName: company.lastName,
        companyName: company.companyName,
        ceo: company.ceo,
        phoneNumber: company.phoneNumber,
        email: company.email,
        street: company.street,
        houseNumber: company.houseNumber,
        zipCode: company.zipCode,
        city: company.city,
        communityLicence: company.communityLicence,
        emailVerified: company.emailVerified,
      },
    });
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

//Edit E-Mail
const editEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const company = await Company.findById(req.body.companyId);
    const emailExist = await Company.findOne({
      email: req.body.email,
    });

    if (emailExist) {
      return res.status(422).json({
        message: "E-mail allready exists!",
      });
    }
    company.email = req.body.email;
    company.emailVerified = false;

    const token = crypto.randomBytes(32).toString("hex");
    company.emailVerificationToken = token;

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
      subject: "Verify your email",
      html: `<p>Verify your email</p>
            <a href="http://localhost:3000/verify-email?token=${token}">click here to verify your new e-mail</a>      
      `,
    });

    res.json({
      message: "E-mail changed, please verify it!",
      company: {
        _id: company._id,
        firstName: company.firstName,
        lastName: company.lastName,
        companyName: company.companyName,
        ceo: company.ceo,
        phoneNumber: company.phoneNumber,
        email: company.email,
        street: company.street,
        houseNumber: company.houseNumber,
        zipCode: company.zipCode,
        city: company.city,
        communityLicence: company.communityLicence,
        emailVerified: company.emailVerified,
      },
    });
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

// verify password for change password function
const verifyPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const company = await Company.findById(req.body.companyId);

    if (company.password != req.body.password) {
      return res.status(422).json({
        message: "password incorrect!",
      });
    }
    res.json({ message: "password verified" });
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

// change password
const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const company = await Company.findById(req.body.companyId);
    const oldPassword = await Company.findOne({ password: req.body.password });
    if (oldPassword) {
      return res.status(422).json({
        message: "Changin to previous password is not allowed",
      });
    }
    company.password = req.body.password;
    company.confirmPassword = req.body.confirmPassword;

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
      subject: "Change password",
      html: `<p>Password successfully changed</p>`,
    });

    res.json({
      message: "Password successfully changed",
      company: {
        _id: company._id,
        firstName: company.firstName,
        lastName: company.lastName,
        companyName: company.companyName,
        ceo: company.ceo,
        phoneNumber: company.phoneNumber,
        email: company.email,
        street: company.street,
        houseNumber: company.houseNumber,
        zipCode: company.zipCode,
        city: company.city,
        communityLicence: company.communityLicence,
        emailVerified: company.emailVerified,
      },
    });
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

// send forgot password email
const sendForgotPasswordEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const company = await Company.findOne({ email: req.body.email });
    if (!company) {
      return res.status(422).json({
        message: "Company does not exist!",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    company.forgotPasswordToken = token;

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
      subject: "Change the password",
      html: `<p>Change the password</p>
            <a href="http://localhost:3000/change-password?token=${token}">click here to reset password</a>      
      `,
    });
    res.json({
      message: "Please check your email inbox",
    });
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

// Forgot Password
const forgotPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const company = await Company.findOne({
      forgotPasswordToken: req.body.token,
    });
    if (!company) {
      return res.status(422).json({
        message: "Incorrect token!",
      });
    }

    company.password = req.body.password;
    company.confirmPassword = req.body.confirmPassword;
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
      subject: "Reset the password",
      html: `<p>Password successfully reseted and changed</p>`,
    });
    res.json({
      message: "Password successfully changed",
      company: {
        _id: company._id,
        firstName: company.firstName,
        lastName: company.lastName,
        companyName: company.companyName,
        ceo: company.ceo,
        phoneNumber: company.phoneNumber,
        email: company.email,
        street: company.street,
        houseNumber: company.houseNumber,
        zipCode: company.zipCode,
        city: company.city,
        communityLicence: company.communityLicence,
        emailVerified: company.emailVerified,
      },
    });
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

module.exports = {
  signUp,
  verifyAccount,
  signIn,
  getProfile,
  editProfile,
  editEmail,
  verifyPassword,
  changePassword,
  sendForgotPasswordEmail,
  forgotPasswordHandler,
};
