const SelfieModel = require('../models/selfie');
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const pool = require('../modules/pool');
const MSG = require('../modules/responseMessage');

module.exports = {
    updateSelfies: async (req, res) => {
        const userIdx = req.decoded.userIdx;
        let selfieImg;
        for (var i = 0; i < 4; i++) {
            selfieImg = req.files[i].location;
            if (selfieImg === undefined || !userIdx) {
                return res.status(CODE.OK).send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
            }
            const type = req.files[i].mimetype.split('/')[1];
            if (type !== 'jpeg' && type !== 'jpg' && type !== 'png') {
                return res.status(CODE.OK).send(util.fail(CODE.OK, MSG.UNSUPPORTED_TYPE));
            }
            result = await SelfieModel.updateSelfie(userIdx, selfieImg);
        }
        query = `SELECT * FROM selfies WHERE userIdx="${userIdx}"`;
        result = await pool.queryParam(query);
        console.log("RESULT: ", result);
        
        res.status(CODE.OK).send(util.success(CODE.OK, MSG.UPDATE_SELFIE_SUCCESS, result));
    }
}