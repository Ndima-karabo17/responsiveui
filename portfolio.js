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
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("portfolio-form");
    const status = document.getElementById("form-status");
    const button = document.getElementById("submit-button");

    async function handleSubmit(event) {
        event.preventDefault();
        
        const data = new FormData(event.target);
        
    
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-circle-notch animate-spin"></i> Sending...';

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                
                status.style.display = "flex";
                form.reset();
            } else {
              
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert("Oops! There was a problem submitting your form");
                    }
                });
            }
        }).catch(error => {
            
            alert("Oops! There was a problem connecting to the server.");
        }).finally(() => {
            
            button.disabled = false;
            button.innerHTML = "Send Message";
        });
    }

    form.addEventListener("submit", handleSubmit);
});

//dark and light mode


  const themeToggleBtn = document.getElementById('theme-toggle');
        const darkIcon = document.getElementById('theme-toggle-dark-icon');
        const lightIcon = document.getElementById('theme-toggle-light-icon');

  
        if (localStorage.getItem('color-theme') === 'light' || (!('color-theme' in localStorage) && !window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.remove('dark');
            darkIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.add('dark');
            lightIcon.classList.remove('hidden');
        }

        themeToggleBtn.addEventListener('click', function() {
        
            document.documentElement.classList.toggle('dark');
            darkIcon.classList.toggle('hidden');
            lightIcon.classList.toggle('hidden');

        
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('color-theme', 'dark');
            } else {
                localStorage.setItem('color-theme', 'light');
            }
        });
