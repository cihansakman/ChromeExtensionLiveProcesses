chrome.runtime.onInstalled.addListener(() => {
    chrome.processes.getProcessInfo(null, true, (processes) => {
      console.log(processes); // Log the processes data
    });
  });
  