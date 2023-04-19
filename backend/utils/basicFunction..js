const { v4: uuidv4 } = require('uuid');

exports.generateRandomToken = () => {
    const id = uuidv4().replace(/-/g, '').slice(0, 12);
    return id;
}