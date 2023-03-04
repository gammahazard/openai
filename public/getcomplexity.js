// Add event listener for form submission
const form = document.querySelector('form');
const textarea = document.querySelector('#function');
const resultDiv = document.querySelector('#result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    // Get the function from the text area
    const func = textarea.value.trim();

    // Call the server to get the time complexity of the function
    const response = await fetch('/find-complexity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ function: func }),
    });

    if (response.ok) {
      // Parse the response and display the result
      const data = await response.json();
      const result = data.data.trim();

      // Display the result in the result div
      resultDiv.innerHTML = `<p>The time complexity of the function is ${result}</p>`;
    } else {
      // Display an error message
      const data = await response.json();
      const error = data.error.trim();

      // Display the error message in the result div
      resultDiv.innerHTML = `<p>Error: ${error}</p>`;
    }
  } catch (error) {
    // Display a generic error message
    resultDiv.innerHTML = `<p>An error occurred. Please try again later.</p>`;
  }

  return false
});