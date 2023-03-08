// Add event listener for form submission
const form = document.querySelector('form');
const textarea = document.querySelector('#function');
const resultDiv = document.querySelector('#result');
const compbtn = document.querySelector('#compbutton');
const loadingImg3 = document.querySelector('#loading-img3');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    // Get the function from the text area
    const func = textarea.value.trim();
    compbtn.style.display = "none";
    loadingImg3.style.display = 'flex';

    // Call the server to get the time complexity of the function
    const response = await fetch('/find-complexity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ function: func }),
    });
console.log(response)
    if (response.ok) {
      // Parse the response and display the result
      const data = await response.json();
      const result = data.data.trim();
      resultDiv.innerHTML = '';
      resultDiv.classList.add('typing');

      // Loop through each word in the result and display it one by one
      const words = result.split(' ');
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const delay = i * 500;

        // Use setTimeout to delay the display of each word
        setTimeout(() => {
          resultDiv.innerHTML += `<span class="typed"> The Time Complexity of this function is: ${word} </span>`;
          const span = resultDiv.querySelector('span:last-child');
          const spanWords = span.textContent.split(' ');
          span.textContent = '';
          span.classList.add('typing');

          // Loop through each word in the span and display it one by one
          for (let j = 0; j < spanWords.length; j++) {
            const spanWord = spanWords[j];
            const spanDelay = delay + j * 200;

            // Use setTimeout to delay the display of each word
            setTimeout(() => {
              span.innerHTML += `${spanWord} `;
            }, spanDelay);
          }
        }, delay);
      }
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
  } finally {
    compbtn.style.display = "block";
    loadingImg3.style.display = 'none';
  }

  return false;
});