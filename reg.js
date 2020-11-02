module.exports = function Reg(registrations) {

    async function homeRoute(req, res) {
        var regList = {
            getReg: await registrations.getRegistrations(),
        }
        res.render('index', {
            regList
        });
    }

    async function addRegList(req, res) {
        let regEntered = req.body.reg;
        let regNumbers = regEntered.toUpperCase()
        console.log(regNumbers);
        var regex = /C[AYJ]\s\d{3,6}\D\d{3,9}|C[AYJ]\s\d{3,6}/gi
        var result = await regex.test(regNumbers);
        // var id = await registrations.getTownId(regEntered)
        //console.log(id)
        if (!regNumbers) {
            req.flash('info', 'Please enter a registration number');
        }
        else if (result===false) {
            req.flash('info', 'Please enter a valid registration number');
        } else {
            var regList = {
                addReg: await registrations.addRegistrations(regNumbers),
                getReg: await registrations.getRegistrations(),

            }
        }
        res.render('index', {
            regList
        });
    }

    async function filteredList(req, res) {
        var towns = req.body.town;
        var filter;
        if (!towns) {
            req.flash('info', 'Please select a town');

        } else if(towns === 'all'){
            filter = await registrations.getRegistrations()

        }
        else {
                 filter = await registrations.filters(towns)
        }
        res.render('index', {
            filteredTown : filter 
        });
    }

        async function clearList(req, res) {
            await registrations.clearReg();
            res.redirect('/')

        }

        return {
            homeRoute,
            addRegList,
            filteredList,
            clearList
        };
    }