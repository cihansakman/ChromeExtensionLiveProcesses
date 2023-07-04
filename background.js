chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("Page Updated...", tab)
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

  
    chrome.tabs.sendMessage(tabId, 
      message = {
      type: "NEW",
      videoId: tab.url,
      message: "The page is reloaded"

    },
    );
});



/*
  function getCurrentTabId(callback){
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
          const currentTabId = tabs[0].id;
          callback(currentTabId);     
    });
  }
  
  //Get the processes information livevly using Chrome Processes API
  chrome.processes.onUpdatedWithMemory.addListener(processes => {

    getCurrentTabId(currentTabId => {
      chrome.tabs.sendMessage(currentTabId, 
        message = {
        type: "PROCESSES",
        processes: processes,
        message: "Processes recieved"
  
      },
      );
    });
      

  });
*/


let isEnabled = true;

chrome.action.onClicked.addListener(tab => {
  isEnabled = !isEnabled;

  // Toggle the icon based on the extension's enabled/disabled state
  const iconPath = isEnabled ? "assets/ext-icon.png" : "assets/play.png";
  chrome.action.setIcon({ path: iconPath });

  // Enable or disable the extension based on the state
  if (isEnabled) {
    chrome.action.enable(tab.id);
  } else {
    chrome.action.disable(tab.id);
  }
});

function getCurrentTabId(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const currentTabId = tabs[0].id;
    callback(currentTabId);
  });
}

function sendProcessesToContentScript(processes) {
  getCurrentTabId(currentTabId => {
    chrome.tabs.sendMessage(currentTabId, {
      type: "PROCESSES",
      processes: processes,
      message: "Processes received"
    });
  });
}

chrome.processes.onUpdatedWithMemory.addListener(processes => {
  if (isEnabled) {
    sendProcessesToContentScript(processes);
  }
});


