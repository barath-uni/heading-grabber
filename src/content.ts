chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab) {
        chrome.tabs.executeScript(activeTab.id!, { code: 'document.querySelectorAll("h1, h2, h3")' }, (result) => {
            if (result && result[0]) {
                const headings = Array.from(result[0]) as HTMLElement[];
                const formattedHeadings = headings.map((heading) => {
                    return {
                        level: heading.tagName.toLowerCase(),
                        text: heading.innerText.trim(),
                    };
                });
                console.log(formattedHeadings);
                // You can now use the formatted headings as needed
            }
        });
    }
});