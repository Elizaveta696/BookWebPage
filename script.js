let pageSize = 1000; //initial number of characters
let currentPage = 0;
let bookText = "";

fetchBook();
async function fetchBook(){
    const response = await fetch('book.txt');
    bookText = await response.text();
    calculatePageSize();
    console.log(pageSize);
    
}

function calculatePageSize() {
    const textBox = document.getElementById('bookpage-container');
    const style = window.getComputedStyle(textBox);
    const lineHeight = style.lineHeight;
    const boxHeight = textBox.clientHeight;

    // Debugging: Check intermediate values
    console.log("lineHeight:", lineHeight);
    console.log("boxHeight:", boxHeight);

    const maxLines = Math.floor(boxHeight / lineHeight);

    // Create a temporary element to measure average character width
    const tempSpan = document.createElement('span');
    tempSpan.style.fontSize = style.fontSize;
    tempSpan.style.fontFamily = style.fontFamily;
    tempSpan.style.visibility = 'hidden'; // Ensure it doesn't affect layout
    tempSpan.innerText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    document.body.appendChild(tempSpan);
    const avgCharWidth = tempSpan.clientWidth / tempSpan.innerText.length;
    document.body.removeChild(tempSpan);

    // Debugging: Check average character width
    console.log("avgCharWidth:", avgCharWidth);

    const avgCharPerLine = Math.floor(textBox.clientWidth / avgCharWidth);

    // Debugging: Check number of characters per line
    console.log("avgCharPerLine:", avgCharPerLine);

    pageSize = maxLines * avgCharPerLine;

    // Debugging: Check pageSize
    console.log("pageSize:", pageSize);
}