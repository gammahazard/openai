const gform = document.querySelector('#gform');
const textInput = document.querySelector('#text');
const gresultDiv = document.querySelector('#gresult');
const gbutton = document.querySelector('#gbutton');
const loadingImg2 = document.querySelector('#loading-img2');

gform.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    // Disable the button and show the loading image
    gbutton.disabled = true;
    loadingImg2.style.display = 'inline';

    // Get the text from the text area
    const text3 = textInput.value.trim();

    // Call the server to check the grammar
    const gresponse = await fetch('/check-grammar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text3 }),
    });

    if (gresponse.ok) {
      // Parse the response and display the result
      const data = await gresponse.json();
      const result = data.data.trim();

      // Display the result in the result div
      gresultDiv.innerHTML = `<p>${result}</p>`;
    } else {
      // Display an error message
      const data = await gresponse.json();
      const error = data.error.trim();

      // Display the error message in the result div
      gresultDiv.innerHTML = `<p>Error: ${error}</p>`;
    }
  } catch (error) {
    // Display a generic error message
    gresultDiv.innerHTML = `<p>An error occurred. Please try again later.</p>`;
  } finally {
    // Hide the loading image and enable the button
    loadingImg2.style.display = 'none';
    gbutton.disabled = false;
  }

  return false;
});