import ExtPay from "extpay";

const extpay = ExtPay('writerapp-plus');

extpay.startBackground();

(async () => {
    let user = await extpay.getUser().then(user => {
        return user
    })
})


export {extpay, user};
