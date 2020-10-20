module.exports = function Registrations(pool) {
    // let regList =  regNumbersIn || [];

    async function addRegistrations(regNumbers) {
        if(regNumbers){
        var registration = await pool.query(`SELECT reg_num FROM reg_numbers WHERE reg_strings = $1`, [regNumbers]);
        console.log(registration.rows)
        } 
        //return registration.rows;

    else if((registration.rows === []) && (regNumbers.startsWith('CA'))){
    var regList = await pool.query(`INSERT INTO reg_numbers(reg_num, reg_strings) VALUES ($1, 'CA')`, [regNumbers]);
     
    }
        else if((registration.rows === []) && (regNumbers.startsWith('CY'))){
    var regList = await pool.query(`INSERT INTO reg_numbers(reg_num, reg_strings) VALUES ($1, 'CY')`, [regNumbers]);

        }
        else if((registration.rows === []) && (regNumbers.startsWith('CJ'))){
    var regList = await pool.query(`INSERT INTO reg_numbers(reg_num, reg_strings) VALUES ($1, 'CJ')`, [regNumbers]);

    }
 //   console.log(regList)
 //   return regList;
}


async function getRegistrations() {
    var regs = await pool.query(`SELECT reg_num FROM reg_numbers`);
    //console.log(regs.rows)
    return regs.rows;
}

function filters(reg) {
    const filteredRegList = [];
    for (var i=0; i<regList.length; i++) {
        const currentRegList = regList[i];

        if (currentRegList.startsWith(reg)) {
            filteredRegList.push(currentRegList)
        }
    }
    return filteredRegList;
}

function addRegex(regNumbers) {
    var pattern = /C[AYJ]\s\d{3,6}$/g;
   var result = regNumbers.match(pattern);
    
     return result;
 }

function errorHandler(regNumbers, reg) {
    if(!regNumbers && !reg){
        alert ("please enter restration and select a town");
    }
    else if (!regNumbers) {
        alert("please enter aregistration number"); 
    }
    else if (!reg) {
        alert("please select a language");
    }
}


return {
    addRegistrations,
    getRegistrations,
    filters,
    addRegex,
    errorHandler,


}

}