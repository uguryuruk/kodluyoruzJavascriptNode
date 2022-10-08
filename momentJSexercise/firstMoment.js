var moment = require('moment'); // require

moment().locale('tr'); 
moment().format();


let withoutZero="5/4/2022"
let normalDate="15/04/2023"
let shortDate="20221111"

var formattedDate=moment(withoutZero,"DD/MM/YYYY","tr");

console.log(formattedDate.month());

