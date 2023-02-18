const expect = require('chai').expect;
const checkTokenMiddleware = require('../middleware/checkToken.ts')

describe('checkToken middleware', function () {
    it('should return 403 status code with message if authorization header is single string', async function () {
        const req = {
            headers: {
                authorization: 'Bearer'
            }
        };

        const res = {
            statusCode: 500,
            message: '',
            status: function (code: number) {
                this.statusCode = code;
                return this;
            },
            send: function (data: any) {
                this.message = data.message
                return this;
            }
        }

        await checkTokenMiddleware.checkToken(req, res, () => { })
            .then(() => {

                expect(res.statusCode).to.equal(403);
                expect(res.message).to.equal('Authorization failed');
            })
    });

    it('should return 403 status code with message if token cannot be verified', async function () {
        const req = {
            headers: {
                authorization: 'Bearer xxxxxxx'
            }
        };

        const res = {
            statusCode: 500,
            message: '',
            status: function (code: number) {
                this.statusCode = code;
                return this;
            },
            send: function (data: any) {
                this.message = data.message
                return this;
            }
        }

        await checkTokenMiddleware.checkToken(req, res, () => { })
            .then(() => {

                expect(res.statusCode).to.equal(403);
                expect(res.message).to.equal('Authorization failed');
            })
    })
})