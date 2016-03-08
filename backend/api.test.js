'use strict';
const path = require('path');
const expect = require('chai').expect;

const api = require('./api');
const testAccount = require(path.join(__dirname, '..', 'test-account.json'));

describe('login API', function () {
  it('should not work with incorrect values', (done) => {
    const req = {
      body: {
        username: 'dood',
        password: 'blabberish'
      }
    };

    api.login(req)
    .then(done) // should not succeed
    .catch(response => {
      // console.log('Login Response');
      // console.dir(response);
      expect(response).to.contain.keys(['logged', 'recaptcha']);
      expect(response.logged).to.be.equal(false);
    }).then(done);
  });

  it('should work with correct values', () => {
    const req = {
      body: {
        username: testAccount.username,
        password: testAccount.password
      }
    };

    return api.login(req).then(response => {
      // console.log('Login Response');
      // console.dir(response);
      expect(response).to.have.lengthOf(2);
      expect(response[0].method).to.be.equal('cookie');
      expect(response[1].method).to.be.equal('redirect');
    });
  });
});
