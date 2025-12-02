document.addEventListener('DOMContentLoaded', () => {
     const hireButton = document.getElementById('hire');
    
    const handleDownloadCV = () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = 'cv.pdf'; 
        downloadLink.download = 'Ndima_Mhangwani.pdf'; 
        
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
  
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

  
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let initialDarkMode = storedTheme === 'dark' || (!storedTheme && prefersDark);

    if (initialDarkMode) {
        htmlElement.classList.add('dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        htmlElement.classList.remove('dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');

          
            if (htmlElement.classList.contains('dark')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }


    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});
