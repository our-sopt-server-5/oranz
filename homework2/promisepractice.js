let isMomHappy = true;
let phone = {
    brand: "Samsung",
    color: "black"
};

var willGetNewPhone = new Promise((resolved, rejected) => {
    if (isMomHappy) {
        resolved(phone);
    }
    else {
        rejected(new Error("mom is not happy"));
    }
});

willGetNewPhone
    .then((x) => console.log(x))
    .catch(console.error);