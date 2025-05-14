//generate random device id
module.exports = function generateDeviceId(){
    return `DEV-${Date.now()}`;
}