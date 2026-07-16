async function insertStyle() {
  const { fontName } = await chrome.storage.sync.get("fontName");
  if (!fontName) return;

  const style = `
    <style id="nomeiryo">
      @font-face {
        font-family: "Meiryo";
        src: local("${fontName}");
      }
      @font-face {
        font-family: "メイリオ";
        src: local("${fontName}");
      }
    </style>
  `;
  document.head.insertAdjacentHTML("beforeend", style);
}

const observer = new MutationObserver(() => {
  if (document.head) {
    insertStyle();
    observer.disconnect();
  }
});

observer.observe(document, {
  childList: true,
  subtree: true
});
