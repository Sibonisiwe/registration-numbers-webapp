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
        it('should be able to check if the registration 1234 is already in the database if not return zero', async function () {
            let registrations = Registrations(pool);
            await registrations.checkReg('CA 1234');

            assert.equal([], await registrations.checkReg('CA 1234'));

        });

        it('should be able to check if the registration CA 12344 is already in the database if not return zero', async function () {
            let registrations = Registrations(pool);
            await registrations.checkReg('CA 2468');
                
            assert.equal([], await registrations.checkReg('CA 12344'));

        });
    });

    describe('The addRegistrations function', function () {
        it('should be able to insert all 3 registration into database', async function () {
            let registrations = Registrations(pool);
            await registrations.addRegistrations('CA 2468');
            await registrations.addRegistrations('CY 2468');
            await registrations.addRegistrations('CJ 2468');
            assert.deepEqual([{ reg_num: 'CA 2468' }, { reg_num: 'CY 2468' }, { reg_num: 'CJ 2468' }], await registrations.getRegistrations());
        });

        it('should be able to insert 3 registrations  with hyphen into database', async function () {
            let registrations = Registrations(pool);
            await registrations.addRegistrations('CA 246-378');
            await registrations.addRegistrations('CY 246-003');
            await registrations.addRegistrations('CJ 246-200');
            assert.deepEqual([{ reg_num: 'CA 246-378' }, { reg_num: 'CY 246-003' }, { reg_num: 'CJ 246-200' }], await registrations.getRegistrations());
        });
    });

    describe('The getRegistrations function', function () {
        it('should be able to return all the registrations', async function () {
            let registrations = Registrations(pool);
            await registrations.addRegistrations('CA 1234');
            await registrations.addRegistrations('CY 1234');
            await registrations.addRegistrations('CJ 1234');
            await registrations.addRegistrations('CA 2468');
            assert.deepEqual([{ reg_num: 'CA 1234' }, { reg_num: 'CY 1234' }, { reg_num: 'CJ 1234' }, { reg_num: 'CA 2468' }], await registrations.getRegistrations());
        });
    });

    describe('The filters function', function () {
        it('should be able to filter Cape Town registrations', async function () {
            let registrations = Registrations(pool);
            await registrations.addRegistrations('CY 345');
            await registrations.addRegistrations('CA 1234');
            await registrations.addRegistrations('CY 1234');
            await registrations.addRegistrations('CJ 1234');
            await registrations.addRegistrations('CA 2468');
            assert.deepEqual([{reg_num: 'CA 1234'}, {reg_num: 'CA 2468'}], await registrations.filters('CA'));
        });

        it('should be able to filter Bellville registrations', async function () {
            let registrations = Registrations(pool);
            await registrations.addRegistrations('CY 345');
            await registrations.addRegistrations('CA 1234');
            await registrations.addRegistrations('CY 1234');
            await registrations.addRegistrations('CJ 1234');
            await registrations.addRegistrations('CA 2468');
            assert.deepEqual([{reg_num: 'CY 345'}, {reg_num: 'CY 1234'}], await registrations.filters('CY'));
        });

        it('should be able to filter Paarl registrations', async function () {
            let registrations = Registrations(pool);
            await registrations.addRegistrations('CY 345');
            await registrations.addRegistrations('CJ 6780');
            await registrations.addRegistrations('CY 1234');
            await registrations.addRegistrations('CJ 1234');
            await registrations.addRegistrations('CA 2468');
            assert.deepEqual([{reg_num: 'CJ 6780'}, {reg_num: 'CJ 1234'}], await registrations.filters('CJ'));
        });
    });
    after(function () {
        pool.end();
    });

});