import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../app';

chai.use(chaiHttp);
chai.should();


const newUser = {
  email: 'raxqy5@gmail.com',
  first_name: 'Agbolade',
  last_name: 'Adeniyi',
  password: 'password',
  confirm_password: 'password',
  is_admin: false,
};

describe('Test user signup and login', () => {
  /**
   * Test for 404
   */
  describe('GET/POST for unavailable routes', () => {
    it('it should return 404 for unavailable routes', (done) => {
      chai
        .request(app)
        .get('/')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Sorry, we couldn\'t find that!');
          done();
        });
    });
  });
  /**
   * Test the POST /auth/signup endpoint
   */
  describe('POST /auth/signup', () => {

    
    it('it should create a new user', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.data.should.have.property('user_id');
          res.body.data.should.have.property('first_name');
          res.body.data.should.have.property('last_name');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('is_admin').eql(false);
          done();
        });
    });
   
    it('it should throw error because email is already taken', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Email is already in use');
          done();
        });
    });
    it('it should throw error because of missing first name', (done) => {
      const badRequest = {
        email: 'raadeniyi3@gmail.com',
        last_name: 'Adeniyi',
        password: 'password',
        confirm_password: 'password',
        is_admin: false,
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(badRequest)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('first_name is required');
          done();
        });
    });
    it('it should throw error because of missing last name', (done) => {
      const badRequest = {
        email: 'raadeniyi3@gmail.com',
        first_name: 'Agbolade',
        password: 'password',
        confirm_password: 'password',
        is_admin: false,
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(badRequest)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('last_name is required');
          done();
        });
    });
    it('it should throw error because of missing email', (done) => {
      const badRequest = {
        first_name: 'Agbolade',
        last_name: 'Adeniyi',
        password: 'password',
        confirm_password: 'password',
        is_admin: false,
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(badRequest)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('email is required');
          done();
        });
    });
    it('it should throw error because of wrong email type', (done) => {
      const badRequest = {
        email: 'raadeniyi3',
        first_name: 'Agbolade',
        last_name: 'Adeniyi',
        password: 'password',
        confirm_password: 'password',
        is_admin: false,
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(badRequest)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('email must be a valid email');
          done();
        });
    });
    it('it should throw error because of short password', (done) => {
      const badRequest = {
        email: 'raadeniyi3@gmail.com',
        first_name: 'Agbolade',
        last_name: 'Adeniyi',
        password: 'pass',
        confirm_password: 'pass',
        is_admin: false,
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(badRequest)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql(
              'password length must be at least 6 characters long',
            );
          done();
        });
    });
    it('it should throw error because of missing password', (done) => {
      const badRequest = {
        first_name: 'Agbolade',
        email: 'raadeniyi3@gmail.com',
        last_name: 'Adeniyi',
        confirm_password: 'password',
        is_admin: false,
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(badRequest)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('Your password and confirm password do not match');
          done();
        });
    });
    it('it should throw error because of missing confirm password', (done) => {
      const badRequest = {
        first_name: 'Agbolade',
        last_name: 'Adeniyi',
        email: 'raadeniyi3@gmail.com',
        password: 'password',
        is_admin: false,
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(badRequest)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('Your password and confirm password do not match');
          done();
        });
    });
    it('it should signin a user', (done) => {
      const payload = {
        email: 'raadeniyi3@gmail.com',
        password: '123456'
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(payload)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have
            .property('user_id');
          res.body.data.should.have
            .property('first_name');
          res.body.data.should.have
            .property('last_name');
          res.body.data.should.have
            .property('token');
          done();
        });
    });
    it('it should throw error because of wrong email', (done) => {
      const payload = {
        password: 'password',
        email: 'raadeniyi@gmail.com',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(payload)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('Invalid credentials');
          done();
        });
    });
    it('it should throw error because of wrong password', (done) => {
      const payload = {
        password: 'password123',
        email: 'raadeniyi3@gmail.com',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(payload)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('Invalid credentials');
          done();
        });
    });
    it('it should throw error because of params not valid', (done) => {
      const payload = {
        password: 'password1',
        email: 'raadeniyi3@gmail.com',
      };
      chai
        .request(app)
        .post('/api/v1/auth/%%%%...#$$')
        .send(payload)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql(
              'Failed to decode param: /api/v1/auth/%%%%...',
            );
          done();
        });
    });
  });
});
