const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

require('nightmare-inline-download')(Nightmare);



async function download() {

    // navigate to blackboard homepage and log in
    nightmare
        .goto('https://blackboard.qut.edu.au')
        .wait(5000)
        .type('#username', 'n9699210')
        .type('#password', 'PIGmochynQUT4')
        .click('#kc-login')

    // get list of links to the units
    const subject_links = await nightmare
        .wait('#qutmyunits_val2018SEM-1')
        .evaluate(() => {
            var units = document.getElementById('qutmyunits_val2018SEM-1');
            var links = [];
            var units_divs = units.getElementsByTagName('div');
            for (var i = 0; i < units_divs.length; i ++) {
                links.push(units_divs[i].firstChild.href)
            };
            return links;
        })
        .end()

    nightmare
        .goto('https://blackboard.qut.edu.au')
        .wait(5000)
        .type('#username', 'n9699210')
        .type('#password', 'PIGmochynQUT4')
        .click('#kc-login')
        .wait('#qutmyunits_val2018SEM-1')
        .goto(subject_links[0])
        .wait(1000000)
        .end()
}

download();