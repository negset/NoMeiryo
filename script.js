const defaults = {
  fontName: 'Noto Sans JP Regular'
};

const getOptions = () => new Promise(resolve => {
  chrome.storage.sync.get(defaults, resolve);
});

const insertStyle = async () => {
  const options = await getOptions();
  const fontName = options.fontName;
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
    </style>
  `;
  document.head.insertAdjacentHTML('beforeend', style);
};

const observer = new MutationObserver(() => {
  if (document.body != null) {
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