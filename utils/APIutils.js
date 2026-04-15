class APIutils
{
    //create constructer for req1
    constructor(req1, reqpayload)
    {
      this.req1 = req1;  // Inside here in api we call "this"
      this.reqpayload = reqpayload;
    }

    async getToken()
    {
        //const req1 = await request.newContext();
        const rload = await this.req1.post("	https://rahulshettyacademy.com/api/ecom/auth/login", {data: this.reqpayload});
        // expect(rload.ok()).toBeTruthy();  //to check http response of 200
        
        const rjson = await rload.json();  // to get in json format
        const rtoken = rjson.token;
        console.log(rtoken);
        return rtoken;  //always add it - Mandatory
    }

    async createOrder(reqorderload)
    {
        let response ={}; 
        response.rtoken = await this.getToken();

const oload = await this.req1.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
    data: reqorderload,
    headers: {
    'Authorization' : response.rtoken, 
    'Content-Type': 'application/json' 
}})
const orespnse = await oload.json();
const odata = await orespnse.orders[0];  //response data to be added
console.log(odata);
response.odata = odata;
return response;
    }

}
module.exports = {APIutils}; //To export the class