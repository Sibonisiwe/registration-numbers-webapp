module.exports = function Registrations(pool) {
    


    async function checkReg(regNumbers) {
        var registration = await pool.query(`SELECT reg_num FROM reg_numbers WHERE reg_num = $1`, [regNumbers]);
        //console.log(registration.rows.length)
        return registration.rows.length;
    }


    async function addRegistrations(regNumbers) {
            var regEntered = await checkReg(regNumbers)
            if (regEntered < 1) {

                if (regNumbers.startsWith('CA')) {
                    await pool.query(`INSERT INTO reg_numbers(reg_num, reg_strings) VALUES ($1, 'CA')`, [regNumbers]);

                }
                else if (regNumbers.startsWith('CY')) {
                    await pool.query(`INSERT INTO reg_numbers(reg_num, reg_strings) VALUES ($1, 'CY')`, [regNumbers]);
                }
                else if (regNumbers.startsWith('CJ')) {
                    await pool.query(`INSERT INTO reg_numbers(reg_num, reg_strings) VALUES ($1, 'CJ')`, [regNumbers]);
                }
            }
        }

    async function getRegistrations() {
        var regs = await pool.query(`SELECT reg_num FROM reg_numbers`);
        return regs.rows;
    }

    async function filters(reg) {
        if (reg === 'CA') {
            const filteredRegList = await pool.query(`SELECT reg_num FROM reg_numbers WHERE reg_strings = 'CA'`);

            //console.log(filteredRegList.rows);
            return filteredRegList.rows
        }
        else if (reg === 'CY') {
            const filteredRegList = await pool.query(`SELECT reg_num FROM reg_numbers WHERE reg_strings = 'CY'`);
            //console.log(filteredRegList.rows);
            return filteredRegList.rows

        }
        else if (reg === 'CJ') {
            const filteredRegList = await pool.query(`SELECT reg_num FROM reg_numbers WHERE reg_strings = 'CJ'`);
            //console.log(filteredRegList.rows);
            return filteredRegList.rows

        }
        else if (reg === "all") {
            const filteredRegList = await pool.query(`SELECT reg_num FROM reg_numbers`);
            console.log(filteredRegList.rows);
            return filteredRegList.rows

        }
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
        clearReg
    }

}