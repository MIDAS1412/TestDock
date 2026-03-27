const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

function readKeyFromEnv(name) {
    if (!process.env[name]) {
        return null;
    }

    return process.env[name].replace(/\\n/g, '\n');
}

function readKeyFromFile(fileName) {
    try {
        return fs.readFileSync(path.join(__dirname, '..', fileName), 'utf8');
    } catch (error) {
        return null;
    }
}

const privateKey = readKeyFromEnv('JWT_PRIVATE_KEY') || readKeyFromFile('private.pem');
const publicKey = readKeyFromEnv('JWT_PUBLIC_KEY') || readKeyFromFile('public.pem');

if (!privateKey || !publicKey) {
    throw new Error('Missing JWT keys. Set JWT_PRIVATE_KEY/JWT_PUBLIC_KEY or provide private.pem/public.pem.');
}

function generateToken(payload) {
    return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h' });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    } catch (err) {
        return null;
    }
}

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Token required' });
    }
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).send({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
}

module.exports = { generateToken, verifyToken, authenticate };
