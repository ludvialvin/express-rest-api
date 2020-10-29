const moment = require('moment');


//function
const getDatetime = moment().format('YYYY-MM-DD hh:mm:ss');
const getDatetime2 = moment().format('DD-MM-YYYY hh:mm:ss');
/*const getDatetime = function (req, res, next) {
  return moment().format('YYYY-MM-DD hh:mm:ss');
}*/

module.exports = {
	getDatetime, getDatetime2
};