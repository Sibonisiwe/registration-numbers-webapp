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
        var regEntered = req.body.reg;
        var regNumbers = regEntered.toUpperCase()
        if (!regNumbers) {
            req.flash('info', 'Please enter a registration number');
        }
        else if (!(/C[AYJ]\s\d{3,6}\D|\d{3,6}$/gi.test(regNumbers))) {
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
        if (!towns) {
            req.flash('info', 'Please select a town');

        } else {
            var filteredTown = {
                filter: await registrations.filters(towns)
            }
        }
        res.render('index', {
            filteredTown
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