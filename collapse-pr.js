// Function to collapse all files in the Azure DevOps PR review
function autoCollapseFiles() {
  // Select all buttons that can collapse/expand files
  const buttons = document.querySelectorAll('button[aria-expanded="true"]');

  // Iterate over each button and click it to collapse the file
  buttons.forEach(button => {
    button.click();
  });

  console.log(`Collapsed ${buttons.length} files.`);
}

// Add Collapse Button
function addCollapseButton() {
  // Find the target element
  const targetElement = document.querySelector('.repos-compare-filter.bolt-filter.bolt-dropdown-expandable');
  
  // Check if the Collapse Files button already exists
  const existingCollapseButton = targetElement.nextElementSibling;
  if (existingCollapseButton && existingCollapseButton.textContent.trim() === 'Collapse Files') {
    // Button already exists, no need to add it again
    return;
  }

  if (targetElement) {
    // Create the new button
    const collapseButton = document.createElement('button');
    collapseButton.textContent = 'Collapse Files';
    collapseButton.className = 'bolt-button bolt-icon-button enabled bolt-focus-treatment';
    collapseButton.setAttribute('type', 'button');
    collapseButton.style.marginLeft = '8px'; // Add some spacing between buttons

    // Add click event listener
    collapseButton.addEventListener('click', function() {
      autoCollapseFiles();
    });

    // Insert the new button after the target element
    targetElement.parentNode.insertBefore(collapseButton, targetElement.nextSibling);
  } else {
    console.error('Target element not found');
  }
}

// Because the content is loaded dynamically, run it periodically
// Call the function to add the button
setInterval(addCollapseButton, 5000); // Run every 5 seconds

// Work Item Classes
function addWorkItemClasses() {
    // Select all top-level work item divs
    const workItems = document.querySelectorAll('div[id^="vss_"][role="group"].board-tile');

    workItems.forEach(workItem => {
      // Clear previously added classes
        workItem.classList.remove(...Array.from(workItem.classList).filter(className => 
            className.startsWith('assigned-to-') ||
            className.startsWith('type-') ||
            className.startsWith('state-') ||
            className.startsWith('tag-') ||
            className === 'hotfix'
        ));

        // Find the assigned user element
        const assignedUserElement = workItem.querySelector('.identity-picker-resolved-name');
        if (assignedUserElement) {
            const userName = assignedUserElement.textContent.trim();
            // Create a className from the user name (remove spaces, lowercase)
            const userClassName = 'assigned-to-' + userName.toLowerCase().replace(/\s+/g, '-');
            workItem.classList.add(userClassName);
        } else {
          workItem.classList.add('assigned-to-unassigned');
        }

        // Add class for work item type
        const workItemTypeIcon = workItem.querySelector('.work-item-type-icon');
        if (workItemTypeIcon) {
            const workItemType = workItemTypeIcon.getAttribute('aria-label');
            const workItemTypeClass = 'type-' + workItemType.toLowerCase().replace(/\s+/g, '-');
            workItem.classList.add(workItemTypeClass);
        }

        // Add class for state
        const stateElement = workItem.querySelector('.workitem-state-value');
        if (stateElement) {
            const state = stateElement.textContent.trim();
            const stateClass = 'state-' + state.toLowerCase().replace(/\s+/g, '-');
            workItem.classList.add(stateClass);
        }

        // Add classes for tags
        const tagElements = workItem.querySelectorAll('.tag-box');
        tagElements.forEach(tagElement => {
            const tag = tagElement.textContent.trim();
            const tagClass = 'tag-' + tag.toLowerCase().replace(/\s-\s/g, '-').replace(/\s+/g, '-');
            workItem.classList.add(tagClass);
        });
        
        // Add class for hotfix
        const label = workItem.getAttribute('aria-label');
        if (label && (label.toLowerCase().includes('hotfix')
          || label.toLowerCase().includes('hot fix')
          || label.toLowerCase().includes('hot hancement')
          || label.toLowerCase().includes('hot-hancement')
          || label.toLowerCase().includes('hothancement'))
        ) {
            workItem.classList.add('hotfix');
        }
    });
}

// Because the content is loaded dynamically, run it periodically
setInterval(addWorkItemClasses, 5000); // Run every 5 seconds
