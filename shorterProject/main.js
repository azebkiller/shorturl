// NOTE: Body
const form = document.querySelector('form');
const shortUrlInput = document.querySelector('.shortUrlInput');
const list = document.querySelector('.lists ul');
const error = document.querySelector('.error-message');
const done = document.querySelector('.done-message');
let urlsData = JSON.parse(localStorage.getItem("urlsData")) || [];
// NOTE: Main function
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!shortUrlInput.value || !shortUrlInput.value.startsWith('https://')) {
        errorFunction("ادخل رابط من فضلك");
        return;
    }

    try {
        const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(shortUrlInput.value)}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Failed to shorten the URL");
        }

        const shortUrl = await response.text();
        if (urlsData.some((urlFromArrayLoop => urlFromArrayLoop == shortUrl)) ? true : false) {
            errorFunction('تم تقصير هذا الرابط من قبل!')
            return;
        } 
        saveUrl(shortUrl);
        displayUrl(shortUrl);
        shortUrlInput.value = ''
        done.style.display = 'block'
        setTimeout(() => {
            done.style.display = 'none'
        },4000)
    } catch (err) {
        console.error(err);
        errorFunction("غيــر قادر علي تقصير هذا الرابــط");
    }
});

// NOTE: Function to save URL in localStorage
function saveUrl(url) {
    urlsData.push(url);
    localStorage.setItem("urlsData", JSON.stringify(urlsData));
}

// NOTE: Function to display URL in the list
function displayUrl(url) {
    list.innerHTML += `<li><a href="${url}" target="_blank">${url}</a></li>`;
}

// NOTE: Function to load saved URLs on page load
function showUrl() {
    urlsData.forEach(displayUrl);
}

// NOTE: Function to show error messages
function errorFunction(message) {
    error.textContent = message;
    error.style.display = "block";
    setTimeout(() => {
        error.style.display = "none";
    }, 3000);
}

// NOTE: Load stored URLs when the page loads
showUrl();
