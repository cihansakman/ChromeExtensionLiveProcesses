(() => {
    console.log("I'm script.js")


    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        //const { type, value, message, videoId } = obj;
        console.log("Message: ", obj.message)
        if (obj.type === "NEW") {
           console.log("Type is new")
           console.log("The URL of the web is:", obj.videoId)   
        }
        if (obj.type === "PROCESSES") {
            console.log("Type is new")
            //To see how many processes running.
            console.log(Object.keys(obj.processes).length)
             
         }
    });
})();

