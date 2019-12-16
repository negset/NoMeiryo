const defaults = {
  fontName: 'Noto Sans JP Regular'
};

function saveOptions() {
  const fontName = document.getElementById('font-name').value;
  chrome.storage.sync.set({
    fontName: fontName
  }, function() {
    changeStatus('オプションを保存しました。');
  });
}

function loadOptions() {
  chrome.storage.sync.get(defaults, function(items) {
    document.getElementById('font-name').value = items.fontName;
  });
}

function restoreOptions() {
  chrome.storage.sync.set(defaults, function() {
    document.getElementById('font-name').value = defaults.fontName;
    changeStatus('オプションを復元しました。');
  });
}

function changeStatus(msg) {
  const status = document.getElementById('status');
  status.textContent = msg;
  setTimeout(function() {
    status.textContent = '';
  }, 2000);
}

document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('restore').addEventListener('click', restoreOptions);