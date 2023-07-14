import ExtPay from "./node_modules/extpay/dist/ExtPay.module.js";

const extpay = ExtPay('writerapp-plus');

extpay.startBackground();

var GLOBALUSER;

extpay.getUser().then(user => {
    GLOBALUSER = user;
})
// try importing normally
export {extpay, GLOBALUSER};
