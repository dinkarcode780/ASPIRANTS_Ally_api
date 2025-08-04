import Appointment from "../../models/appointmentModel.js";

export const getDashboard = async (req, res) => {
  try {
    const totalAppointment = await Appointment.countDocuments();

    const todayAppointment = await Appointment.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    });

    // Monthly report: appointments count from January to December
    const monthlyAppointments = await Appointment.aggregate([
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: "$_id.month",
          count: 1,
          _id: 0,
        },
      },
      {
        $sort: { month: 1 }, // sort from Jan to Dec
      },
    ]);

    // Fill missing months with 0
    const fullMonthlyReport = Array.from({ length: 12 }, (_, i) => {
      const monthData = monthlyAppointments.find((m) => m.month === i + 1);
      return {
        month: new Date(0, i).toLocaleString("default", { month: "long" }),
        count: monthData ? monthData.count : 0,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Dashboard Data Fetched Successfully.",
      data: {
        totalAppointment,
        todayAppointment,
        monthlyReport: fullMonthlyReport,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
