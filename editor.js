//   ___    ____    ___    ___  \       ____    ____    ___	____
//  |   \  /    \  |   \  /	       /       /    \  |   \   |
//  |___/  |    |  |___/  \___        |	       |    |  |    |  |__
//  |      |    |  |	      \	      |	       |    |  |    |  |
//  |      \____/  |       ___/        \____   \____/  |___/   |____

require.config({
    paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }
});

require(['vs/editor/editor.main'], function () {

    window.htmlEditor = monaco.editor.create(
        document.getElementById('html'),
        {
            value: '',
            language: 'html',
            theme: 'hc-black',
            automaticLayout: true,
            minimap: { enabled: false }
        }
    );

    window.cssEditor = monaco.editor.create(
        document.getElementById('css'),
        {
            value: '',
            language: 'css',
            theme: 'hc-black',
            automaticLayout: true,
            minimap: { enabled: false }
        }
    );

    window.jsEditor = monaco.editor.create(
        document.getElementById('js'),
        {
            value: '',
            language: 'javascript',
            theme: 'hc-black',
            automaticLayout: true,
            minimap: { enabled: false }
        }
    );
});


function includeExtension(code, checkboxId) {
    const cb = document.getElementById(checkboxId);
    return cb && cb.checked ? code : '';
}

const page = document.getElementById('page');
const run = document.getElementById('run');
function runCode() {
    let htmlCode = htmlEditor.getValue();
    let cssCode = cssEditor.getValue();
    let jsCode = jsEditor.getValue().replace(/<\/script>/gi, '<\\/script>');
    const completeCode = `<html>
            <head>
	        <meta charset="UTF-8">
 	        <style>${cssCode}</style>
            </head>
            <body>
	        ${htmlCode}
		<script>${includeExtension(https://cdn.jsdelivr.net/gh/popsmcbanger/Hellcat-Extensions/files-extension.js, "filesExtensionCheckbox")}</script>
	        <script>${jsCode}</script>
            </body>
        </html>`;
    page.srcdoc = completeCode;
}

run.addEventListener('click', function() {
    runCode();
});

const collapsBtn = document.getElementById('collapsBtn');
let openClose = 1;
collapsBtn.addEventListener('click', function() {
    if (openClose === 0) {
	document.getElementById('code').style.display = 'flex';
	document.getElementById('sideBar').style.display = 'flex';
	document.getElementById('page').style.width = '70vw';
	openClose ++;
	collapsBtn.textContent = '<<<';
    }
    else if (openClose === 1) {
	document.getElementById('code').style.display = 'none';
	document.getElementById('sideBar').style.display = 'none';
	document.getElementById('settings').style.display = 'none';
	document.getElementById('page').style.width = '100vw';
	openClose = 0;
	collapsBtn.textContent = '</>';
    }
});

const downloadBtn = document.getElementById('downloadBtn');
let openClose2 = 0;
downloadBtn.addEventListener('click', function() {
    if (openClose2 === 0) {
	document.getElementById('downloadDropdown').style.display = 'flex';
	openClose2 ++;
    }
    else if (openClose2 === 1) {
	document.getElementById('downloadDropdown').style.display = 'none';
	openClose2 = 0;
    }
});
document.getElementById('downloadCode').addEventListener('click', function() {
    document.getElementById('downloadDropdown').style.display = 'none';
    openClose2 = 0;
});
document.addEventListener('keydown', function(event) {
    if (event.key.toLowerCase() === 's' && event.ctrlKey) {
        event.preventDefault();
        openClose2 = 1;
	document.getElementById('downloadDropdown').style.display = 'flex';
    }
});
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        event.preventDefault();
        openClose2 = 0;
	document.getElementById('downloadDropdown').style.display = 'none';
    }
});

function loadCode(code) {
    const list = code.split('⫯');

    htmlEditor.setValue(list[0] || '');
    cssEditor.setValue(list[1] || '');
    jsEditor.setValue(list[2] || '');
}

let codeFileContents = '';

document.getElementById('upload').addEventListener('change', function(e) {
    const file=e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function() {
	codeFileContents = reader.result;
	loadCode(codeFileContents);
    };

    reader.readAsText(file);
});

document.getElementById('codeBtn').addEventListener('click', function() {
    document.getElementById('files').style.display = 'none';
    document.getElementById('media').style.display = 'none';
    document.getElementById('settings').style.display = 'none';
    document.getElementById('upgrade').style.display = 'none';
    document.getElementById('code').style.display = 'flex';
    document.getElementById('bits').style.display = 'none';
    document.getElementById('ext').style.display = 'none';
});