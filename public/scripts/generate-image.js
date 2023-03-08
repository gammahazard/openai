const javaform = document.querySelector('#javaform');
const codejavaInput = document.querySelector('#codejava');
const javaresultDiv = document.querySelector('#javaresult');
const javabutton = document.querySelector('#javabutton');
const loadingImgja = document.querySelector('#loading-imgja');

javaform.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    // Disable the button and show the loading text
    javabutton.style.display = "none";
    const loadingText = document.createElement('span');
    loadingText.innerText = 'Loading...';
    loadingText.classList.add('loading-text');
    loadingImgja.parentNode.insertBefore(loadingText, loadingImgja.nextSibling);

    // get input
    const codejava = codejavaInput.value.trim();

    // Call the server to explain the code
    const jaresponse = await fetch('/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({codejava}),
    });

    if (jaresponse.ok) {
      // Get the response data as JSON
      const responseData = await jaresponse.json();

      // Extract the data and URLs from the response
      const data = responseData.data;
      const urls = data.data.map(item => item.url);

      // Display the URLs on the webpage
      // Get the container element for the generated images
      const urlsContainer = document.getElementById('javaresult');

      // Fade out and remove any existing images from the container
      const existingImages = urlsContainer.querySelectorAll('img');
      existingImages.forEach(img => {
        img.style.opacity = 0;
        setTimeout(() => {
          urlsContainer.removeChild(img);
        }, 500); // Change this duration to adjust the fade-out time
      });

      // Generate new images and add them to the container
      urls.forEach(url => {
        const imgElement = document.createElement('img');
        imgElement.src = url;
        imgElement.style.opacity = 0;
        urlsContainer.appendChild(imgElement);
        setTimeout(() => {
          imgElement.style.opacity = 1;
        }, 500); // Change this duration to adjust the fade-in time
      });
    } else {
      // Display an error message
      const data = await jaresponse.json();
      const error = data.error.trim();

      // Display the error message in the result div
      javaresultDiv.innerHTML = `<p>Error: ${error}</p>`;
    }
  } catch (error) {
    // Display a generic error message
    javaresultDiv.innerHTML = `<p>An error occurred. Please try again later.</p>`;
  } finally {
    // Hide the loading text and enable the button
    javabutton.style.display = "flex";
    const loadingText = document.querySelector('.loading-text');
    if (loadingText) {
      loadingText.remove();
    }
  }

  return false;
});