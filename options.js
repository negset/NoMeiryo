import defaultOptions from './default_options.js';

function loadOptions() {
  chrome.storage.sync.get(defaultOptions, items => {
    document.getElementById('font-name').value = items.fontName;
  });
}

function saveOptions() {
  const fontName = document.getElementById('font-name').value;
  chrome.storage.sync.set({ fontName: fontName }, () => {
    changeStatus('オプションを保存しました。');
  });
}

function restoreOptions() {
  chrome.storage.sync.set(defaultOptions, () => {
    document.getElementById('font-name').value = defaultOptions.fontName;
    changeStatus('オプションを復元しました。');
  });
}

function changeStatus(msg) {
  const status = document.getElementById('status');
  status.textContent = msg;
  setTimeout(() => status.textContent = '', 2000);
}

document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('restore').addEventListener('click', restoreOptions);