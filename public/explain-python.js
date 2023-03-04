const cform = document.querySelector('#cform');
const codeInput = document.querySelector('#code');
const cresultDiv = document.querySelector('#cresult');
const cbutton = document.querySelector('#cbutton');
const loadingImg = document.querySelector('#loading-img');

cform.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    // Disable the button and show the loading image
    cbutton.disabled = true;
    loadingImg.style.display = 'inline';

    // Get the Python code from the text area
    const code = codeInput.value.trim();
console.log (JSON.stringify(code))
    // Check if the code is empty
    if (code === '') {
      cresultDiv.innerHTML = '<p>Please enter some code.</p>';
      return;
    }

    // Call the server to explain the code
    const tresponse = await fetch('/explain-python', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (tresponse.ok) {
      // Parse the tresponse and display the result
      const data = await tresponse.json();
      const result = data.data.trim();

      // Display the result in the result div
      cresultDiv.innerHTML = `<h4>>${result}</h4>`;
    } else {
      // Display an error message
      const data = await tresponse.json();
      const error = data.error.trim();

      // Display the error message in the result div
      cresultDiv.innerHTML = `<p>Error: ${error}</p>`;
    }
  } catch (error) {
    // Display a generic error message
    cresultDiv.innerHTML = `<p>An error occurred. Please try again later.</p>`;
  } finally {
    // Hide the loading image and enable the button
    loadingImg.style.display = 'none';
    cbutton.disabled = false;
  }

  return false
});