const base = require('@playwright/test');

exports.test1 = base.test.extend(
    {
    testDataOrder: 
    {
    email : "g.rajanaidu49@gmail.com",
    pwd : "Awesome@123",
    pname : "iphone 13 pro"

    }
}
)