const path = require('path');
const fs = require('fs');

let serverOptions = null;

try {
	serverOptions = {
		key: fs.readFileSync(path.resolve(__dirname, '..', '..', 'ssl-certification', 'key.pem')),
		cert: fs.readFileSync(path.resolve(__dirname, '..', '..', 'ssl-certification', 'cert.pem'))
	};
} catch (e) {}

module.exports = {
	serverOptions
};