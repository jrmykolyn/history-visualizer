const script = document.createElement('script');
script.src = chrome.runtime.getURL('./main.js');

(document.head || document.documentElement).appendChild(script);
