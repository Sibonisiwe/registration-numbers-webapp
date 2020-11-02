module.exports = function Registrations(pool) {
    


    async function checkReg(regNumbers) {
        var registration = await pool.query(`SELECT reg_num FROM reg_numbers WHERE reg_num = $1`, [regNumbers]);
        //console.log(registration.rows.length)
        return registration.rows.length;
    }


    async function addRegistrations(regNumbers) {
            var regEntered = await checkReg(regNumbers)
            
            if (regEntered < 1) {
                var townId = await getTownId(regNumbers)
                //console.log(townId)
               
                    await pool.query(`INSERT INTO reg_numbers(reg_num, reg_strings) VALUES ($1, $2)`,[regNumbers, townId]);
            } 
        }

         async function getTownId(id){
             var sub = id.substring(0,2).toUpperCase()
             var selectId = await pool.query(`select id from store_towns where strings = $1`, [sub]);
             return selectId.rows[0].id
         }
    async function getRegistrations() {
        var regs = await pool.query(`SELECT reg_num FROM reg_numbers`);
        return regs.rows;
    }

    async function filters(reg) {
       var storedId = await getTownId(reg)
            const filteredRegList = await pool.query(`SELECT reg_num FROM reg_numbers WHERE reg_strings = $1`,[storedId]);
            return filteredRegList.rows
        
    }

    async function clearReg() {
        var clearRegistrations = await pool.query(`DELETE FROM reg_numbers`);
        return clearRegistrations;
    }


    return {
        addRegistrations,
        getRegistrations,
        filters,
        checkReg,
        clearReg,
        getTownId
    }

}