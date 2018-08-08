'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var customFormats = module.exports = function(zSchema) {
  // Placeholder file for all custom-formats in known to swagger.json
  // as found on
  // https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#dataTypeFormat

  var decimalPattern = /^\d{0,8}.?\d{0,4}[0]+$/;

  /** Validates floating point as decimal / money (i.e: 12345678.123400..) */
  zSchema.registerFormat('double', function(val) {
    return !decimalPattern.test(val.toString());
  });

  /** Validates value is a 32bit integer */
  zSchema.registerFormat('int32', function(val) {
    // the 32bit shift (>>) truncates any bits beyond max of 32
    return Number.isInteger(val) && ((val >> 0) === val);
  });

  zSchema.registerFormat('int64', function(val) {
    return Number.isInteger(val);
  });

  zSchema.registerFormat('float', function(val) {
    // better parsing for custom "float" format
    if (Number.parseFloat(val)) {
      return true;
    } else {
      return false;
    }
  });

  zSchema.registerFormat('date', function(val) {
    // should parse a a date
    return !isNaN(Date.parse(val));
  });

  zSchema.registerFormat('dateTime', function(val) {
    return !isNaN(Date.parse(val));
  });

  zSchema.registerFormat('password', function(val) {
    // should parse as a string
    return typeof val === 'string';
  });
};

customFormats(ZSchema);

var validator = new ZSchema({});
var supertest = require('supertest');
var api = supertest('http://localhost:10010'); // supertest init;
var expect = chai.expect;

describe('/cities', function() {
  describe('get', function() {
    it('should respond with 200 search results matching...', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "array",
        "items": {
          "type": "object",
          "required": [
            "country",
            "id",
            "lat",
            "lng",
            "name"
          ],
          "properties": {
            "id": {
              "type": "number",
              "example": 214
            },
            "name": {
              "type": "string",
              "example": "Brest"
            },
            "country": {
              "type": "string",
              "example": "BY"
            },
            "lat": {
              "type": "number",
              "example": 52.09755
            },
            "lng": {
              "type": "number",
              "example": 23.68775
            }
          },
          "example": {
            "country": "BY",
            "lng": 23.68775,
            "name": "Brest",
            "id": 214,
            "lat": 52.09755
          }
        }
      };

      /*eslint-enable*/
      api.get('/api/cities')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        expect(validator.validate(res.body, schema)).to.be.true;
        done();
      });
    });

    it('should respond with 500 something went wrong', function(done) {
      api.get('/api/cities')
      .set('Content-Type', 'application/json')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);

        expect(res.body).to.equal(null); // non-json response or no schema
        done();
      });
    });

  });

  describe('post', function() {
    it('should respond with 201 item created', function(done) {
      api.post('/api/cities')
      .set('Content-Type', 'application/json')
      .send({
        city: 'DATA GOES HERE'
      })
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);

        expect(res.body).to.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 400 invalid input, object...', function(done) {
      api.post('/api/cities')
      .set('Content-Type', 'application/json')
      .send({
        city: 'DATA GOES HERE'
      })
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        expect(res.body).to.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 409 an existing item already...', function(done) {
      api.post('/api/cities')
      .set('Content-Type', 'application/json')
      .send({
        city: 'DATA GOES HERE'
      })
      .expect(409)
      .end(function(err, res) {
        if (err) return done(err);

        expect(res.body).to.equal(null); // non-json response or no schema
        done();
      });
    });

  });

});
