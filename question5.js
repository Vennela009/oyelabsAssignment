
const request = require("request");

function getGoogleHomePage(finalCallBack){
  return new Promise((resolve,reject)=>{
    request('http://www.google.com',function(error,response,body){
      console.error('error:',error);
      finalCallBack(error);
      console.log('statusCode:',response && response.statusCode);
      consle.log('body:',body);
      finalCallBack(null,body);
    });
  });
};

getGoogleHomePage(result)
    .then(result=>console.log('RESULT==>',result))
    .catch(e=>console.log(e));
