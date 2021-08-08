const doctorService = require('../services/doctorService');

const getTopDoctorHome = async (req, res) => {
   let limit = 10;
   if (req.query.limit && req.query.limit !== 'undefined')
      limit = +req.query.limit;
   try {
      let response = await doctorService.getTopDoctorHome(limit);
      return res.status(200).json(response);
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: -1,
         message: 'Error from server',
      });
   }
};

const getAllDoctors = async (req, res) => {
   try {
      let response = await doctorService.getAllDoctors();
      return res.status(200).json(response);
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: -1,
         message: 'Error from server',
      });
   }
};

const postInfoDoctor = async (req, res) => {
   try {
      let response = await doctorService.saveInfoDoctor(req.body);
      return res.status(200).json(response);
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: -1,
         message: 'Error from server',
      });
   }
};

const getDetailDoctor = async (req, res) => {
   try {
      let info = await doctorService.getDetailDoctor(req.query.id);
      return res.status(200).json(info);
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: -1,
         message: 'Error from server',
      });
   }
};

module.exports = {
   getTopDoctorHome,
   getAllDoctors,
   postInfoDoctor,
   getDetailDoctor,
};
