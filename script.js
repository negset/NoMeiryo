const getFontName = () => new Promise(resolve => {
  chrome.storage.sync.get(['fontName'], options => {
    if (options.fontName != null) {
      resolve(options.fontName);
    } else {
      import(chrome.extension.getURL('default_options.js'))
        .then(module => {
          chrome.storage.sync.set(module.default);
          resolve(module.default.fontName);
        });
    }
  })
});

const insertStyle = async () => {
  const fontName = await getFontName();
  const style = `
    <style>
      @font-face {
        font-family: 'Meiryo';
        src: local('${fontName}');
      }
      @font-face {
        font-family: 'メイリオ';
        src: local('${fontName}');
      }
      body {
        font-family: 'メイリオ', sans-serif; /* Use the specified font  */
      }
    </style>
  `;
  document.head.insertAdjacentHTML('beforeend', style);
};

const observer = new MutationObserver(() => {
  if (document.head != null) {
    observer.disconnect();
    insertStyle();
  }
});

observer.observe(document, {
  attributes: false,
  attributeOldValue: false,
  characterData: false,
  characterDataOldValue: false,
  childList: true,
  subtree: true
});
