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

function hasJwtKeys() {
    return Boolean(privateKey && publicKey);
}

function createMissingKeysError() {
    const error = new Error('JWT keys are not configured on the server.');
    error.statusCode = 503;
    return error;
}

if (!hasJwtKeys()) {
    console.warn('JWT keys are missing. Auth routes will be unavailable until JWT_PRIVATE_KEY/JWT_PUBLIC_KEY are configured.');
}

function generateToken(payload) {
    if (!hasJwtKeys()) {
        throw createMissingKeysError();
    }

    return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h' });
}

function verifyToken(token) {
    if (!hasJwtKeys()) {
        return null;
    }

    try {
        return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    } catch (err) {
        return null;
    }
}

function authenticate(req, res, next) {
    if (!hasJwtKeys()) {
        return res.status(503).send({ message: 'JWT keys are not configured on the server.' });
    }

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

module.exports = { generateToken, verifyToken, authenticate, hasJwtKeys };
