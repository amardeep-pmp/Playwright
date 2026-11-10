function fetchData(callback)
{
setTimeout(()=>{
    console.log("Im here at 1");
    callback();
},2000);

}
function processData()
{console.log("Im here at 2")}

fetchData(processData);

