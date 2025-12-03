document.addEventListener('DOMContentLoaded', () => {
   
    const hireButton = document.getElementById('hire');
    
    const handleDownloadCV = () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = 'cv.pdf'; 
        downloadLink.download = 'cv.pdf'; 
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        console.log("Attempting to download cv.pdf...");
    };

    if (hireButton) {
        hireButton.addEventListener('click', handleDownloadCV);
    } else {
        console.warn("Element with ID 'hire' not found. Download button functionality disabled.");
    } 

    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
});
