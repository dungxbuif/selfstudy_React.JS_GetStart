const db = require('../models/index');

const getTopDoctorHome = async (limit) => {
   return new Promise(async (resolve, reject) => {
      try {
         let users = await db.User.findAll({
            limit,
            where: {roleId: 'R2'},
            order: [['createdAt', 'DESC']],
            attributes: {
               exclude: ['password'],
            },
            include: [
               {
                  model: db.Allcodes,
                  as: 'positionData',
                  attributes: ['valueVi', 'valueEn'],
               },
               {
                  model: db.Allcodes,
                  as: 'genderData',
                  attributes: ['valueVi', 'valueEn'],
               },
            ],
            raw: true,
            nest: true,
         });
         resolve({
            code: 0,
            data: users,
         });
      } catch (e) {
         reject(e);
      }
   });
};

const getAllDoctors = async () => {
   return new Promise(async (resolve, reject) => {
      try {
         const data = await db.User.findAll({
            where: {roleId: 'R2'},
            attributes: {
               exclude: ['password', 'image'],
            },
         });

         resolve({
            code: 0,
            data,
         });
      } catch (e) {
         reject(e);
      }
   });
};

const saveInfoDoctor = async (dataInput) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!dataInput.doctorId) {
            resolve({
               code: 1,
               message: 'Missing parameters',
            });
         } else {
            await db.Markdown.create({
               contentMarkdown: dataInput.contentMarkdown,
               contentHTML: dataInput.contentHTML,
               description: dataInput.description,
               doctorId: dataInput.id,
            });
            resolve({
               code: 0,
               message: 'Succeed',
            });
         }
      } catch (e) {
         reject(e);
      }
   });
};

module.exports = {
   getTopDoctorHome,
   getAllDoctors,
   saveInfoDoctor,
};
