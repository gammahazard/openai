const aform = document.querySelector('#aform');
const questionInput = document.querySelector('#question');
const aresultDiv = document.querySelector('#aresult');
const abutton = document.querySelector('#abutton');
const loadingImg4 = document.querySelector('#loading-img4');

aform.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    // Disable the button and show the loading image
    abutton.style.display = "none"
    loadingImg4.style.display = 'flex';

    // Get the question from the text area
    const question = questionInput.value.trim();

    // Call the server to get the answer
    const aresponse = await fetch('/ask-anything', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (aresponse.ok) {
      // Parse the response and display the answer
      const answer = await aresponse.data.choices[0].text.trim();
      // Display the answer in the result div
      aresultDiv.innerHTML = `<p class="answertext">Answer: ${answer}</p>`;

    } else {
      // Display an error message
      const data = await aresponse.json();
      const error = data.error.trim();
console.log(error)
console.log(response)
      // Display the error message in the result div
      aresultDiv.innerHTML = `<p>Error: ${error}</p>`;
    }
  } catch (error) {
    // Display a generic error message
    aresultDiv.innerHTML = `<p>An error occurred. Please try again later.</p>`;
  } finally {
    // Hide the loading image and enable the button
    loadingImg4.style.display = 'none';
    abutton.style.display = 'block';
  }

  return false;
});