const expect = require('chai').expect
const core = require('../core');
const expectFilterData = require('./data/resultFilter').data;
const expectCountData = require('./data/resultCount').data;
describe('Command option test', () => {
    afterEach(() => {
        process.argv.slice(0,2);
        process.exitCode = 0;
    });
    it('Should return error', () => {
        core.run()
        expect(process.exitCode).to.be.equal(1);
    });
    it('Should return validation code filter option', () => {
        process.argv.push('--filter=ry');
        core.run()
        expect(process.exitCode).to.be.equal(0);
    });
    it('Should return validation code count option', () => {
        process.argv.push('--count');
        core.run()
        expect(process.exitCode).to.be.equal(0);
    });
});

describe('Test filter option', () => {
    afterEach(() => {
        process.argv.slice(0,2);
    });
    it('filter with ry', () => {
        process.argv.push('--filter=ry');
        expect(core.filterData('ry')).to.be.deep.equal(expectFilterData);
    });
});

describe('Test count option', () => {
    afterEach(() => {
        process.argv.slice(0,2);
    });

    it('count data', () => {
        process.argv.push('--count');
        expect(core.countData()).to.be.deep.equal(expectCountData);
    });
});