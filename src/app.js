dotenv.config();
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./api/middlewares/errorMiddleware.js";
import companyRoute from "../src/api/routes/companyRoute.js"
import homeRoute from "../src/api/routes/homeRoute.js"
import blogRoute from "../src/api/routes/blogRoute.js"
import ourServiceRoute from "../src/api/routes/ourServiceRoute.js"
import collegeRoute from "../src/api/routes/collegeRoute.js"
import countryRoute from "../src/api/routes/countryRoute.js"
import cityRoute from "../src/api/routes/cityRoute.js"
import stateRoute from "../src/api/routes/stateRoute.js"
import testimonialRoute from "../src/api/routes/testimonialRoute.js"
import webinarRoute from "../src/api/routes/webinarRoute.js"
import subscribeRoute from "../src/api/routes/subscribeRoute.js"
import contactUsRoute from "../src/api/routes/contactUsRoute.js"
import appointmentRoute from "../src/api/routes/appointmentRoute.js";
import adminRoute from "../src/api/routes/adminRoute.js";
import announceMentRoute from "../src/api/routes/announceMentRoute.js";
import warningRoute from "../src/api/routes/warningRoute.js";
import mentorshipVideoRoute from "../src/api/routes/mentorshipVideoRoute.js";
import aboutRoute from "../src/api/routes/aboutRoute.js";
import faqRoute from "../src/api/routes/faqRoute.js";
import ourPartnerRoute from "../src/api/routes/ourPartnerRoute.js";
import franchiseRoute from "../src/api/routes/franchiseRoute.js";
import dashboardRoute from "../src/api/routes/dashboardRoute.js";
import testpreparationRoute from "../src/api/routes/testpreparationRoute.js";











const app = express();



// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);




// Route
app.use("/api", companyRoute)
app.use("/api", homeRoute)
app.use("/api", blogRoute)
app.use("/api", ourServiceRoute)
app.use("/api", collegeRoute)
app.use("/api", countryRoute)
app.use("/api", cityRoute)
app.use("/api", stateRoute)
app.use("/api", testimonialRoute)
app.use("/api", webinarRoute)
app.use("/api", subscribeRoute)
app.use("/api", contactUsRoute)
app.use("/api",appointmentRoute);
app.use("/api",adminRoute);
app.use("/api",announceMentRoute);
app.use("/api",warningRoute);
app.use("/api",mentorshipVideoRoute);
app.use("/api",aboutRoute);
app.use("/api",faqRoute);
app.use("/api",ourPartnerRoute);
app.use("/api",franchiseRoute);
app.use("/api",dashboardRoute);
app.use("/api",testpreparationRoute);


























export default app;