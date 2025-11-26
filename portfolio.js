document.addEventListener('DOMContentLoaded', () => {
    const hireButton = document.getElementById('hire');
    
    const handleDownloadCV = () => {
        const downloadLink = document.createElement('a');
      
        downloadLink.href = 'cv.pdf'; 
        
        
        downloadLink.download = 'Ndima_Mhangwani_CV.pdf'; 
        
        document.body.appendChild(downloadLink);
        
      
        downloadLink.click();
        
       
        document.body.removeChild(downloadLink);

        console.log("Attempting to download cv.pdf...");
    };

    
    if (hireButton) {
        hireButton.addEventListener('click', handleDownloadCV);
    } else {
        console.error("Hire Me button with ID 'hire' not found.");
    }
});
