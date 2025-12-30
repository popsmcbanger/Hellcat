function downloadFileC(content, filename) {
    if (!filename) return; // user canceled, we respect that

    // Ensure .html extension like a professional
    if (!filename.endsWith('.html')) {
        filename += '.html';
    }

    const blob = new Blob([content], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

function downloadFileH(content, filename) {
    if (!filename) return;

    // Strip any extension and force .hellcat
    filename = filename.replace(/\.[^/.]+$/, '');
    filename += '.hellcat';

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

document.getElementById('downloadCode').addEventListener('click', function() {
    function determine() {
        let number = 0;
        const fileExt = document.getElementById('fileExt');
        let isCode = document.getElementById('saveAsCode').checked;
        let isHellcat = document.getElementById('saveAsText').checked;
        if (isCode) {
	    number = 0;
        }
        if (isHellcat) {
            number = 1;
        }
        return number;
    }
    let type = determine();
    switch (type) {
        case 0:
	    let htmlCode = htmlEditor.getValue();
	    let cssCode = cssEditor.getValue();
	    let jsCode  = jsEditor.getValue();
	
	    let completeCode2 = `<!DOCTYPE html>
	<html>
	<head>
	    <meta charset="UTF-8">
	    <style>${cssCode}</style>
	    <title>${document.getElementById('pgTitle').value}</title>
	    <link rel="icon" href="${document.getElementById('pgIcon').value}" />
	</head>
	<body>
	${htmlCode}
	<script>${jsCode.replace(/<\/script>/gi, '<\\/script>')}</script>
	</body>
	</html>`;
	
	    let fileName2 = document.getElementById('fileNameBox').value;
	    downloadFileC(completeCode2, fileName2);
	    break;

        case 1:
	    let htmlCode2 = htmlEditor.getValue();
	    let cssCode2 = cssEditor.getValue();
	    let jsCode2  = jsEditor.getValue();
	    let completeCode3 = htmlCode2 + '⫯' + cssCode2 + '⫯' + jsCode2;
	    let fileName3 = document.getElementById('fileNameBox').value;
	    downloadFileH(completeCode3, fileName3);
	    break;
    }
});
