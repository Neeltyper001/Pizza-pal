import server from "../utils/server.js";
/*async*/ function makeNetworkCall(/*URL*/){
   try{
      // const response =  await fetch(URL);
      // const data = await response.json();   
      const data = server
      console.log(data)   
      return data;

   }
   catch(err){
      console.log("Error")
   }
   // promise.then((response)=>{
   //    const promise2 = response.json();
   //    promise2.then(data => {}).catch(err=>{
   //      // invalid url
   //    })
   // }).catch((err)=>{
   //      // problem with network call
   // }).catch((err)=>{

   // })
}
export default makeNetworkCall;