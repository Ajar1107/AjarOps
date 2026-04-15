
import {test as base} from '@playwright/test';
interface TestDataOrder {
email : String;
pwd: String;
pname: String;
}
export const test1 = base.extend<{testDataOrder: TestDataOrder}>(
    {
    testDataOrder: 
    {
    email : "g.rajanaidu49@gmail.com",
    pwd : "Awesome@123",
    pname : "iphone 13 pro"

    }
}
)