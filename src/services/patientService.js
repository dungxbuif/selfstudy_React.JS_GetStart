const db = require('../models/index');
require('dotenv').config();

const bookApppointment = (dataInput) => {
   const email = dataInput.email;
   return new Promise(async (resolve, reject) => {
      try {
         const user = await db.User.findOrCreate({
            where: { email },
            defaults: {
               email,
               roleId: 'R3',
            },
         });
         let data = {};
         if (user && user[0]) {
            data = await db.Bookings.findOrCreate({
               where: { patientId: user[0].id },
               default: {
                  statusID: 'S1',
                  doctorId: dataInput.doctorId,
                  patientId: user[0].id,
                  date: dataInput.date,
                  timeType: dataInput.timeType,
               },
            });

            console.log(data);
         }

         if (Object.entries(data).length) {
            resolve({
               code: 0,
               data,
            });
         } else {
            resolve({
               code: 1,
               message: 'create error',
            });
         }

         resolve({
            code: 0,
            data,
         });
      } catch (e) {
         reject(e);
      }
   });
};

// const getAllDoctors = async () => {
//    return new Promise(async (resolve, reject) => {
//       try {
//          const data = await db.User.findAll({
//             where: { roleId: 'R2' },
//             attributes: {
//                exclude: ['password', 'image'],
//             },
//          });

//          resolve({
//             code: 0,
//             data,
//          });
//       } catch (e) {
//          reject(e);
//       }
//    });
// };

// const saveInfoDoctor = async (dataInput) => {
//    return new Promise(async (resolve, reject) => {
//       try {
//          //UPSERT MarkDown Table
//          if (
//             !dataInput.doctorId ||
//             !dataInput.contentHTML ||
//             !dataInput.contentMarkdown ||
//             !dataInput.description ||
//             !dataInput.selectedPrice ||
//             !dataInput.selectedPayment ||
//             !dataInput.selectedProvince ||
//             !dataInput.nameClinic ||
//             !dataInput.addressClinic ||
//             !dataInput.note
//          ) {
//             resolve({
//                code: 1,
//                message: 'Missing parameters',
//             });
//          } else {
//             if (dataInput.action === 'CREATE')
//                await db.Markdown.create({
//                   contentMarkdown: dataInput.contentMarkdown,
//                   contentHTML: dataInput.contentHTML,
//                   description: dataInput.description,
//                   doctorId: +dataInput.doctorId,
//                });
//             else if (dataInput.action === 'EDIT') {
//                let doctor = await db.Markdown.findOne({
//                   where: {
//                      doctorId: +dataInput.doctorId,
//                   },
//                   raw: false,
//                });

//                if (doctor) {
//                   doctor.contentMarkdown = dataInput.contentMarkdown;
//                   doctor.contentHTML = dataInput.contentHTML;
//                   doctor.description = dataInput.description;
//                   doctor.updatedAt = new Date();
//                   await doctor.save();
//                }
//             }

//             //UPSERT DoctorInfor Table
//             let doctorInfo = null;
//             doctorInfo = await db.doctor_infos.findOne({
//                where: { doctorID: dataInput.doctorId },
//                raw: false,
//             });
//             if (doctorInfo) {
//                doctorInfo.priceId = dataInput.selectedPrice;
//                doctorInfo.paymentId = dataInput.selectedPayment;
//                doctorInfo.provinceId = dataInput.selectedProvince;
//                doctorInfo.nameClinic = dataInput.nameClinic;
//                doctorInfo.addressClinic = dataInput.addressClinic;
//                doctorInfo.note = dataInput.note;

//                doctorInfo.save();
//             } else {
//                doctorInfo = await db.doctor_infos.create({
//                   doctorId: dataInput.doctorId,
//                   priceId: dataInput.selectedPrice,
//                   paymentId: dataInput.selectedPayment,
//                   provinceId: dataInput.selectedProvince,
//                   nameClinic: dataInput.nameClinic,
//                   addressClinic: dataInput.addressClinic,
//                   note: dataInput.note,
//                });
//             }
//             resolve({
//                code: 0,
//                message: 'Succeed',
//             });
//          }
//       } catch (e) {
//          reject(e);
//       }
//    });
// };

// const getDetailDoctorByID = async (doctorID) => {
//    return new Promise(async (resolve, reject) => {
//       try {
//          if (!doctorID)
//             resolve({
//                code: -1,
//                message: 'Missing required prameters',
//             });

//          const data = await db.User.findOne({
//             where: { id: doctorID },
//             attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'gender'] },
//             include: [
//                {
//                   model: db.Markdown,
//                   as: 'markDownData',
//                },
//                {
//                   model: db.Allcodes,
//                   as: 'positionData',
//                   attributes: ['valueVi', 'valueEn'],
//                },
//                {
//                   model: db.doctor_infos,
//                   as: 'doctorInfoData',
//                   exclude: ['id', 'doctorId'],
//                },
//             ],
//             raw: false,
//             nest: true,
//          });

//          if (data && data.image) {
//             data.image = Buffer.from(data.image, 'base64').toString('binary');
//          }

//          if (!data) data = {};

//          resolve({
//             code: 0,
//             data,
//          });
//       } catch (e) {
//          reject(e);
//       }
//    });
// };

// const bulkCreateSchedule = async (dataReq) => {
//    return new Promise(async (resolve, reject) => {
//       try {
//          if (!dataReq.arrData || !dataReq.arrData.length) {
//             resolve({
//                code: -1,
//                message: 'Missing required prameters',
//             });
//             return;
//          }
//          let schedlude = dataReq.arrData;
//          if (schedlude && schedlude.length) {
//             schedlude.forEach((item) => {
//                item.maxNumber = MAX_NUMBER_SCHEDULE;
//             });
//             let existing = await db.Schedule.findAll({
//                where: { doctorId: +dataReq.arrData[0].doctorId, date: dataReq.arrData[0].date },
//                attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
//                raw: true,
//             });

//             if (existing && existing.length > 0) {
//                existing = existing.map((item) => {
//                   item.date = new Date(item.date).getTime();
//                   return item;
//                });
//             }

//             let toCreate = _.differenceWith(schedlude, existing, (a, b) => {
//                return a.timeType === b.timeType && a.date === b.date;
//             });

//             if (toCreate && toCreate.length) {
//                const data = await db.Schedule.bulkCreate(toCreate);
//                resolve({
//                   code: 0,
//                   message: 'Succeed',
//                   data,
//                });
//             }
//          }
//       } catch (e) {
//          reject(e);
//       }
//    });
// };

// const getScheduleDoctorByDate = async (doctorId, date) => {
//    return new Promise(async (resolve, reject) => {
//       try {
//          if (!doctorId || !date)
//             resolve({
//                code: -1,
//                message: 'Missing required prameters',
//             });

//          const data = await db.Schedule.findAll({
//             where: { doctorId, date: new Date(date).getTime() },
//             include: {
//                model: db.Allcodes,
//                as: 'scheduleData',
//                attributes: ['valueVi', 'valueEn'],
//             },

//             raw: false,
//          });

//          if (data && data.image) {
//             data.image = Buffer.from(data.image, 'base64').toString('binary');
//          }

//          if (!data) data = [];

//          resolve({
//             code: 0,
//             data,
//          });
//       } catch (e) {
//          reject(e);
//       }
//    });
// };

// const getExtraDoctorInfoById = async (doctorID) => {
//    return new Promise(async (resolve, reject) => {
//       try {
//          if (!doctorID)
//             resolve({
//                code: -1,
//                message: 'Missing required prameters',
//             });

//          const data = await db.doctor_infos.findOne({
//             where: { doctorID },
//             attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'gender'] },
//             include: [
//                {
//                   model: db.Allcodes,
//                   as: 'priceData',
//                   attributes: ['valueVi', 'valueEn'],
//                },
//                {
//                   model: db.Allcodes,
//                   as: 'paymentData',
//                   attributes: ['valueVi', 'valueEn'],
//                },
//                {
//                   model: db.Allcodes,
//                   as: 'provinceData',
//                   attributes: ['valueVi', 'valueEn'],
//                },
//             ],
//             raw: false,
//             nest: true,
//          });

//          if (data && data.image) {
//             data.image = Buffer.from(data.image, 'base64').toString('binary');
//          }

//          if (!data) data = {};

//          resolve({
//             code: 0,
//             data,
//          });
//       } catch (e) {
//          reject(e);
//       }
//    });
// };

// const getProfileDoctorInfoById = async (doctorID) => {
//    return new Promise(async (resolve, reject) => {
//       try {
//          if (!doctorID)
//             resolve({
//                code: -1,
//                message: 'Missing required prameters',
//             });

//          const data = await db.User.findOne({
//             where: { id: doctorID },
//             attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'gender'] },
//             include: [
//                {
//                   model: db.Allcodes,
//                   as: 'positionData',
//                   attributes: ['valueVi', 'valueEn'],
//                },
//                {
//                   model: db.Markdown,
//                   as: 'markDownData',
//                },
//             ],
//             raw: false,
//             nest: true,
//          });

//          if (data && data.image) {
//             data.image = Buffer.from(data.image, 'base64').toString('binary');
//          }

//          if (!data) data = {};

//          resolve({
//             code: 0,
//             data,
//          });
//       } catch (e) {
//          reject(e);
//       }
//    });
// };

module.exports = {
   bookApppointment,
   // getAllDoctors,
   // saveInfoDoctor,
   // getDetailDoctorByID,
   // bulkCreateSchedule,
   // getScheduleDoctorByDate,
   // getExtraDoctorInfoById,
   // getProfileDoctorInfoById,
};
