const data = require('./data').data;

const OPTIONS_NAMES = {
    filter : 'filter',
    count : 'count',
};


function getOptions(cliArgs) {
    return cliArgs.reduce((acc, option) => {
        if(option.indexOf('--') !== -1) {
            // remove -- from option name
            const optionSanitize = option.substr(2);
            // seperate option name and value
            const [optionName, value] = optionSanitize.split('=');
            if (value !== undefined) {
                acc[optionName] = value;
            } else {
                acc[optionName] = true;
            }
        }
        return acc;
    }, {});
} 

function filterData(filter) {
    return data.reduce((acc, country) => {
        if(country.hasOwnProperty('people')) {
            const newPeople = country.people.reduce((acc, peopleOwned) => {
                const filteredAnimals = peopleOwned.animals.filter( animal => {
                        return animal.name.indexOf(filter) !== -1;
                    });
                    if(filteredAnimals.length > 0) {
                        acc.push({name: peopleOwned.name, animals: filteredAnimals});
                    }
                    return acc
            }, [])
            if (newPeople.length > 0) {
                acc.push({name: country.name, people: newPeople});
            }
            return acc;
        }
    }, [])
}

function countData() {
    return data.map((country) => {
        const countryCounted = {};
        countryCounted.name = `${country.name} [${country.people.length}]`;
        countryCounted.people = country.people.map((people) => {
            const countPeople = {};
            countPeople.name = `${people.name} [${people.animals.length}]`;
            (countPeople.animals = [...people.animals]);
            return countPeople;
        })
        return countryCounted;
    })
}

function run() {
    const options = getOptions(process.argv);
    const optionsSet = Object.keys(options);
    if (optionsSet.length > 0) {
        let dataProcessed;
        if(Object.keys(options).includes(OPTIONS_NAMES['filter']) && typeof options[OPTIONS_NAMES['filter']] === 'string') {
             dataProcessed = filterData(options[OPTIONS_NAMES['filter']]);
        } else if(Object.keys(options).includes(OPTIONS_NAMES['count'])) {
            dataProcessed = countData();
        }
        return dataProcessed;
    } else {
        process.exitCode = 1;
        console.error('No option provided. Command should be run with --filter=[filterString] or --count');
    }
}

module.exports = {
    run,
    countData,
    filterData,
}