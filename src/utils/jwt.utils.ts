import jsonWebToken from 'jsonwebtoken';


const ACCESSTOKEN = process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOK_101_HASH_DATA';
const REFRESHTOKEN = process.env.REFRESH_TOKEN_SECRET || 'REFRESH_TOK_101_HASH_DATA';

const generateAccessToken = async (payload: any) => {

  return  await jsonWebToken.sign(payload, ACCESSTOKEN, { expiresIn: '15m' });
}

const generateRefressToken = async (payload: any) => {
  return await jsonWebToken.sign(payload, REFRESHTOKEN, { expiresIn: '7d' });
}


export { generateAccessToken, generateRefressToken }