// Routes (sessionRoutes.js)
import express from 'express';
import { getAllAppointment, createAppointment, getByIdAppointment,updateAppointMentStatus } from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/getAllAppointment', getAllAppointment);
router.get('/getByIdAppointment', getByIdAppointment);
router.post('/createAppointment', createAppointment);
router.put("/updateAppointMentStatus",updateAppointMentStatus);

export default router;