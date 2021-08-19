const db = require('../models');

const getAllCodeServices = async (req, res, next) => {
   if (!req.query.type) {
      res.status(404).json({
         code: 1,
         message: 'Missing required parameters',
      });
   }
   const type = req.query.type;

   try {
      const data = await db.Allcodes.findAll({
         where: { type },
         attributes: ['valueVi', 'valueEn'],
      });

      return res.status(200).json({
         code: 0,
         data,
         message: 'Succeed',
      });
   } catch (ex) {
      console.log(ex);
      return res.status(500).json({
         code: 1,
         data,
         message: 'failed',
      });
   }
};

module.exports = {
   getAllCodeServices,
};
