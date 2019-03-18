/* eslint-env mocha */
import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../index';

const { expect } = chai;

chai.use(chaiHttp);

describe('Tests for all messages Endpoints', () => {
  let userToken;
  before(done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send({
        firstName: 'jon',
        lastName: 'bellion',
        email: 'bellion@gmail.com',
        password: 'simpleandweet'
      })
      .end(err => {
        done(err);
      });
  });

  before(done => {
    chai
      .request(app)
      .post('/api/v2/auth/login')
      .send({
        email: 'bellion@gmail.com',
        password: 'simpleandweet'
      })
      .end((err, res) => {
        const { token } = res.body.data[0];
        userToken = token;
        done(err);
      });
  });
  describe('POST api/v2/messages', () => {
    it('Should send message if user has Authorization to do so', done => {
      chai
        .request(app)
        .post('/api/v2/messages')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          to: 'shola@gmail.com',
          subject: 'Check out my new album',
          message: 'My new album, The definition is out in stores now'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0]).to.have.keys(
            'id',
            'createdOn',
            'subject',
            'message',
            'parentMessageId',
            'status',
            'receiverId',
            'senderId'
          );
          expect(res.body.data[0].status).to.be.equal('sent');
          done(err);
        });
    });
    it('Should send draft message if user has Authorization to do so', done => {
      chai
        .request(app)
        .post('/api/v2/messages')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          to: '',
          subject: 'draft for my new album newsletter',
          message: 'My new album, The definition is out in stores now'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0]).to.have.keys(
            'id',
            'createdOn',
            'subject',
            'message',
            'parentMessageId',
            'status',
            'receiverId',
            'senderId'
          );
          expect(res.body.data[0].status).to.be.equal('draft');
          done(err);
        });
    });
    it('Should send an error if user does not provide message body', done => {
      chai
        .request(app)
        .post('/api/v2/messages')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          to: '',
          subject: 'draft for my new album newsletter',
          message: ''
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.be.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'error', 'message');
          expect(res.body.error).to.be.equal('Invalid Message Provided.');
          expect(res.body.message).to.be.equal('Message subject/body can not be empty');
          done(err);
        });
    });
    it('Should send an error if user does not have Authorization to send message', done => {
      chai
        .request(app)
        .post('/api/v2/messages')
        .send({
          to: '',
          subject: 'draft for my new album newsletter',
          message: 'My new album, The definition is out in stores now'
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.be.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'error');
          expect(res.body.error).to.be.equal('Error. You do not have access to this page');
          done(err);
        });
    });
  });

  describe('GET api/v2/messages', () => {
    it('Should fetch all received messages for the current user if they have authorization', done => {
      chai
        .request(app)
        .get('/api/v2/messages')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0]).to.have.keys(
            'id',
            'createdOn',
            'subject',
            'message',
            'parentMessageId',
            'status',
            'receiverId',
            'senderId'
          );
          done(err);
        });
    });
    it('Should return an error if an unauthorized user tries to fetch all messages', done => {
      chai
        .request(app)
        .get('/api/v2/messages')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.be.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'error');
          expect(res.body.error).to.be.equal('Error. You do not have access to this page');
          done(err);
        });
    });
  });

  describe('GET api/v2/messages/sent', () => {
    it('Should fetch all sent messages for the current user if they have authorization', done => {
      chai
        .request(app)
        .get('/api/v2/messages/sent')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0]).to.have.keys(
            'id',
            'createdOn',
            'subject',
            'message',
            'parentMessageId',
            'status',
            'receiverId',
            'senderId'
          );
          expect(res.body.data[0].status).to.be.equal('sent');
          done(err);
        });
    });
    it('Should return an error if an unauthorized user tries to fetch sent messages', done => {
      chai
        .request(app)
        .get('/api/v2/messages/sent')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.be.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'error');
          expect(res.body.error).to.be.equal('Error. You do not have access to this page');
          done(err);
        });
    });
  });
  describe('GET api/v2/messages/unread', () => {
    it('Should fetch all unread messages for the current user if they have authorization', done => {
      chai
        .request(app)
        .get('/api/v2/messages/unread')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0]).to.have.keys(
            'id',
            'createdOn',
            'subject',
            'message',
            'parentMessageId',
            'status',
            'receiverId',
            'senderId'
          );
          expect(res.body.data[0].status).to.be.equal('unread');
          done(err);
        });
    });
    it('Should return an error if an unauthorized user tries to fetch unread messages', done => {
      chai
        .request(app)
        .get('/api/v2/messages/sent')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.be.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'error');
          expect(res.body.error).to.be.equal('Error. You do not have access to this page');
          done(err);
        });
    });
  });
  describe('GET api/v2/messages/:id', () => {
    it('Should fetch a specific message for the current user if they have authorization', done => {
      chai
        .request(app)
        .get('/api/v2/messages/22')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0]).to.have.keys(
            'id',
            'createdOn',
            'subject',
            'message',
            'parentMessageId',
            'status',
            'receiverId',
            'senderId'
          );
          done(err);
        });
    });
    it('Should return an error if an unauthorized user tries to fetch a specific message', done => {
      chai
        .request(app)
        .get('/api/v2/messages/22')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.be.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'error');
          expect(res.body.error).to.be.equal('Error. You do not have access to this page');
          done(err);
        });
    });
    it('Should return an error if a user tries to fetch a specific message that does not exist', done => {
      chai
        .request(app)
        .get('/api/v2/messages/9999')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.be.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'error', 'message');
          expect(res.body.error).to.be.equal('Message does not exist');
          done(err);
        });
    });
  });
  describe('DELETE api/v2/messages/:id', () => {
    it('Should delete a specific message for the current user if they have authorization', done => {
      chai
        .request(app)
        .delete('/api/v2/messages/22')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body).to.have.keys('status', 'data', 'message');
          expect(res.body.data[0].message).to.be.equal('Message deleted/retracted succesfully');
          done(err);
        });
    });
    it('Should return an error if an unauthorized user tries to delete a specific message', done => {
      chai
        .request(app)
        .delete('/api/v2/messages/22')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.be.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'error');
          expect(res.body.error).to.be.equal('Error. You do not have access to this page');
          done(err);
        });
    });
  });
});
