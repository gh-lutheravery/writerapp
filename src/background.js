import ExtPay from "extpay";

const extpay = ExtPay('writerapp-plus');

extpay.startBackground();

var GLOBALUSER;

extpay.getUser().then(user => {
    GLOBALUSER = user;
})

export {extpay, GLOBALUSER};
