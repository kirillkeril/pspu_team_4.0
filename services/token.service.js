import jwt from "jsonwebtoken";
import TokenModel from "../models/token-model.js";
import tokenModel from "../models/token-model.js";

class TokenService {
    maxAge = 30;
    maxAgeForCookie = this.maxAge * 24 * 60 * 60 * 1000;

    async generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECKET, {expiresIn: '10m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_ACCESS_SECKET, {expiresIn: `${this.maxAge}d`});

        return {
            refreshToken,
            accessToken
        };
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({user: userId, refreshToken});
        return token.save();
    }

    async removeToken(refreshToken) {
        const tokenData = await TokenModel.deleteOne({refreshToken: refreshToken});
        return tokenData;
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECKET);
        } catch (e) {
            return null;
        }
    }
    async findToken(refreshToken){
        return await tokenModel.findOne({refreshToken: refreshToken});
    }

    async validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch (e) {
            return null;
        }
    }
}

export default new TokenService();