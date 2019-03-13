/* eslint-env mocha */
import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../index';

const { expect } = chai;

chai.use(chaiHttp);

describe('Tests for all Auth(signup and signin) Endpoints', () => {
  describe('POST api/v1/auth/signup', () => {
    it('Should successfully sign up a user and return a token', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'jon',
          lastName: 'bellion',
          email: 'jon@gmail.com',
          password: 'simpleandweet'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          expect(res.body.data[0]).to.have.key('token');
          expect(res.body.data[0].token).to.be.a('string');
          done();
        });
    });
    it('Should return an error if the user provides an invalid email', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'jon',
          lastName: 'bellion',
          email: 'wrongmailaddress',
          password: 'simpleandweet'
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.status).to.be.equal(403);
          expect(res.body.error).to.be.equal('Invalid email address');
          done();
        });
    });
    it('Should return an error if the user provides password that is less than 6 characters', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'jon',
          lastName: 'bellion',
          email: 'jon@gmail.com',
          password: 'simpl'
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.status).to.be.equal(403);
          expect(res.body.error).to.be.equal('Invalid password provided');
          expect(res.body.message).to.be.equal('Password must not be less than six(6) characters');
          done();
        });
    });
    it('Should return an error if the user provides no firstname', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: '',
          lastName: 'bellion',
          email: 'jon@gmail.com',
          password: 'simpleandsweet'
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.be.equal(422);
          expect(res.body.error).to.be.equal('Invalid name Provided.');
          done();
        });
    });
    it('Should return an error if the user provides no lastname', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'jon',
          lastName: '',
          email: 'jon@gmail.com',
          password: 'simpleandsweet'
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.be.equal(422);
          expect(res.body.error).to.be.equal('Invalid name Provided.');
          done();
        });
    });
    it('Should return an error if the user tries to sign up with an existing email', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'john',
          lastName: 'joe',
          email: 'jon@gmail.com',
          password: 'simpleandsweet'
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.status).to.be.equal(409);
          expect(res.body.error).to.be.equal('Email already in use');
          done();
        });
    });
  });
  describe('POST api/v1/auth/login', () => {
    it('Should successfully log in a user and return a token', done => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'jon@gmail.com',
          password: 'simpleandweet'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body.data[0]).to.have.key('token');
          expect(res.body.data[0].token).to.be.a('string');
          done();
        });
    });

    it('Should return an error if the user provides wrong login credentials', done => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'wrong@gmail.com',
          password: 'wrongpassword'
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.be.equal(401);
          expect(res.body.error).to.be.equal('Authentication Failed');
          done();
        });
    });
  });
});
