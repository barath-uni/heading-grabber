console.log("Hello from content script");

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabId = tabs[0]?.id ?? -1; // Provide a default value of -1 if tabId is undefined
    chrome.scripting.executeScript(
        {
            target: { tabId: tabId },
            func: getHeadings,
        },
        function (results) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            } else {
                console.log(results[0].result);
            }
        }
    );
});

function getHeadings() {
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const headingTexts = headings.map((heading) => (heading as HTMLElement).innerText);
  console.log("HEADINGGGGGGGGGGGGGGGGGGGG", headingTexts);
  return headingTexts;
}