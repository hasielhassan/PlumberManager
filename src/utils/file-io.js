/**
 * Helper to download text content as a file in the browser.
 */
export function downloadFile(content, fileName, contentType = 'application/json') {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

/**
 * Helper to trigger file upload selection dialog and return file text content.
 */
export function uploadFile(accept = '.gph, .json') {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) {
        resolve(null);
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve({
          name: file.name,
          content: event.target.result
        });
      };
      reader.onerror = (err) => reject(err);
      reader.readAsText(file);
    };

    input.click();
  });
}
