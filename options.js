const defaultOptions = {
  fontName: "",
};

function loadOptions() {
  chrome.storage.sync.get(defaultOptions, options => {
    document.getElementById("font-name").value = options.fontName;
  });
}

function saveOptions() {
  const fontName = document.getElementById("font-name").value;
  chrome.storage.sync.set({ fontName }, () => {
    changeStatus("設定を保存しました。");
  });
}

function changeStatus(msg) {
  const status = document.getElementById("status");
  status.textContent = msg;
  setTimeout(() => status.textContent = "", 2000);
}

loadOptions();
document.getElementById("save").addEventListener("click", saveOptions);
