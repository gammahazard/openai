const gform = document.querySelector('#gform');
const textInput = document.querySelector('#text3');
const gresultDiv = document.querySelector('#gresult');
const gbutton = document.querySelector('#gbutton');
const loadingImg2 = document.querySelector('#loading-img2');

gform.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    // Disable the button and show the loading image
    gbutton.style.display = "none"
    loadingImg2.style.display = 'flex';

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
      // Parse the response and display the result with typing effect
      const data = await gresponse.json();
      const result = data.data.trim()
      gresultDiv.innerHTML = '';
      gresultDiv.classList.add('typing');
    
    // Split the result into lines and display each line one by one
  const lines = result.split('. ');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const delay = i * 200;

    // Use setTimeout to delay the display of each line
    setTimeout(() => {
      gresultDiv.innerHTML += `<p><span class="typed2">${line}. </span></p>`;
    }, delay);
  }
    
    } else {
      // Display an error message with typing effect
      const data = await gresponse.json();
      const error = data.error.trim();
      gresultDiv.innerHTML = '';
      gresultDiv.classList.add('typing');
      
      // Loop through each word in the error message and display it one by one
      const words = error.split(' ');
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const delay = i * 200;

        // Use setTimeout to delay the display of each word
        setTimeout(() => {
          gresultDiv.innerHTML += `<span class="typed">${word}</span>`;
        }, delay);
      }
    }
  } catch (error) {
    // Display a generic error message with typing effect
    gresultDiv.innerHTML = '';
    gresultDiv.classList.add('typing');
    
    const errorMsg = "An error occurred. Please try again later.";
    const words = errorMsg.split(' ');
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const delay = i * 200;

      // Use setTimeout to delay the display of each word
      setTimeout(() => {
        gresultDiv.innerHTML += `<span class="typed">${word} </span>`;
      }, delay);
    }
  } finally {
    // Hide the loading image and enable the button
    loadingImg2.style.display = 'none';
    gbutton.style.display = 'block';
  }

  return false;
});