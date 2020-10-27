const assert = require("assert");
const Registrations = require("../reg-fac");
const pg = require("pg");
let registrations = Registrations()
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/registration_test';
const pool = new Pool({
    connectionString
});
describe("The registrations-webApp", function () {
    beforeEach(async function () {
        await pool.query("delete from reg_numbers");

    });
    describe('The checkReg function', function () {
        it('should be able to check if the registration is already in the database if not return zero', async function () {
            let registrations = Registrations(pool);
            await registrations.checkReg('CA 1234');

            assert.equal(0, await registrations.checkReg('CA 1234'));

        });

        it('should be able to check if the registration CA 12344 is already in the database if not return zero', async function () {
            let registrations = Registrations(pool);
            await registrations.checkReg('CA 1234');
                var insertInto = await registrations.checkReg('CA 1234');
            assert.equal('CA 1234', await insertInto);

        });
    });

    describe('The addRegistrations function', function() {
        it('should be able to insert registration into database', async function(){
            let registrations = Registrations(pool);
            await registrations.addRegistrations('CA 2468');
            await registrations.addRegistrations('CY 2468');
            await registrations.addRegistrations('CJ 2468');
            assert.equal(['CA 2468', 'CY 2468', 'CJ 2468'], await registrations.getRegistrations());
        });
    });


    after(function () {
        pool.end();
    });

});