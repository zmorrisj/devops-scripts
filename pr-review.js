// Function to get the list of checked file names from the left-hand sidebar
function getCheckedFileNames() {
    const checkboxes = document.querySelectorAll('.bolt-checkbox[aria-checked="true"]');
    const fileNames = [];
    checkboxes.forEach(function(checkbox) {
        let fileName = '';
        const row = checkbox.closest('tr');
        if (row) {
            const fileNameSpan = row.querySelector('.text-ellipsis > span');
            if (fileNameSpan) {
                fileName = fileNameSpan.textContent.trim();
                // Extract just the file name without the path
                const nameOnly = fileName.split('/').pop();
                fileNames.push(nameOnly.toLowerCase());
            }
        } else {
            const rootRow = checkbox.closest('.bolt-table-row');
            if (rootRow) {
                const fileNameSpan = rootRow.querySelector('.repos-changes-explorer-tree-root-content .text-ellipsis');
                if (fileNameSpan) {
                    fileName = fileNameSpan.textContent.trim();
                    const nameOnly = fileName.split('/').pop();
                    fileNames.push(nameOnly.toLowerCase());
                }
            }
        }
    });
    return fileNames;
}

// Function to highlight the corresponding headers on the right-hand side
function highlightHeadersByFileName(fileNames) {
    // Reset all header styles first
    const headers = document.querySelectorAll('.repos-summary-header');
    headers.forEach(function(header) {
        // Remove 'file-reviewed' class if it exists
        header.classList.remove('file-reviewed');
    });

    headers.forEach(function(header) {
        const headerFileNameSpan = header.querySelector('.flex.flex-center.body-m.font-weight-semibold.text-ellipsis > .text-ellipsis');
        if (headerFileNameSpan) {
            let headerFileName = headerFileNameSpan.textContent.trim();
            // Extract just the file name without the path
            const nameOnly = headerFileName.split('/').pop().toLowerCase();
            if (fileNames.includes(nameOnly)) {
                // Add 'file-reviewed' class to the header
                header.classList.add('file-reviewed');
            }
        }
    });
}

// Function to update the highlights
function updateHighlights() {
    const checkedFileNames = getCheckedFileNames();
    highlightHeadersByFileName(checkedFileNames);
}

// Run the update on page load and periodically
updateHighlights();
setInterval(updateHighlights, 5000); // Run every 5 seconds
