import { expect } from 'chai';
import sequelize from '../models';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';

const authController = require('../controllers/auth.controller');


describe('auth controller', function () {
    before(async function () {
        await sequelize.sync({ force: true })
            .then(() => console.log('Test database connection has been established'))
            .catch((err) => {
                console.log("Unable to connect to the database", err)
            });

        const password = 'test';
        const salt = await bcrypt.genSalt(10); //saltRounds
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email: 'test@test.pl',
            username: 'test',
            password: hashedPassword,
            avatar: ''
        })
    })


    it('should return 400 code with message if username is empty in signup method', async function () {
        const req = {
            body: {
                username: '',
                email: '',
                password: '',
                repeatedPassword: '',
                avatar: ''
            }
        };
        const res = {
            statusCode: 500,
            message: '',
            status: function (code: number) {
                this.statusCode = code;
                return this;
            },
            json: function (data: any) {
                this.message = data.message
                return this;
            }
        };
        await authController.signup(req, res, () => { })
            .then(() => {
                expect(res.statusCode).to.equal(400);
                expect(res.message).to.equal('Username is required')
            })
    });


    it('should return 400 code with message if email is not unique in signup method', async function () {
        const req = {
            body: {
                username: 'test',
                email: 'test@test.pl',
                password: '',
                repeatedPassword: '',
                avatar: ''
            }
        };
        const res = {
            statusCode: 500,
            message: '',
            status: function (code: number) {
                this.statusCode = code;
                return this;
            },
            json: function (data: any) {
                this.message = data.message
                return this;
            }
        };
        await authController.signup(req, res, () => { })
            .then(() => {
                expect(res.statusCode).to.equal(400);
                expect(res.message).to.equal('Cannot sign up with this email')
            })
    });

    it('should return 200 code with message if user has been successfully creted in signup method', async function () {
        const req = {
            body: {
                username: 'test2',
                email: 'test2@test.pl',
                password: 'test2',
                repeatedPassword: 'test2',
                avatar: ''
            }
        };
        const res = {
            statusCode: 500,
            message: '',
            status: function (code: number) {
                this.statusCode = code;
                return this;
            },
            json: function (data: any) {
                this.message = data.message
                return this;
            }
        };
        await authController.signup(req, res, () => { })
            .then(() => {
                expect(res.statusCode).to.equal(200);
                expect(res.message).to.equal('User test2 has been created successfully')
            })
    })



    after(async function () {
        await sequelize.close()
            .then(() => console.log('Test database connection has been closed'));
    })
})