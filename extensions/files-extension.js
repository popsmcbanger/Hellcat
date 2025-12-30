window.downloadFile = function(content, filename, extension) {
    if (!filename) return;

    // Strip any extension and force the correct one
    filename = filename.replace(/\\.[^/.]+$/, '');
    filename += '.' + extension;

    const blob = new Blob([content], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}

window.readTextFile = function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function() {
        // 1. Declare the variable properly
        const content = reader.result;
        
        // 2. Access the 'loadCode' function from the PARENT window
        if (window.parent && window.parent.loadCode) {
            window.parent.loadCode(content);
        } else {
            console.error("loadCode function not found in parent window.");
        }
    };

    reader.readAsText(file);
}
