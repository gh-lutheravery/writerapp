import ExtPay from "extpay";

const extpay = ExtPay('writerapp-plus');

extpay.startBackground();

let user = extpay.getUser().then(user => {
    return user
})


chrome.storage.local.get('foo', function() {
    var extpay = ExtPay('sample-extension');
    // ...
})

// use callback to get user object out of promise from getUser() (.then is callback, get user out of then)

export default {
    USER: user
}