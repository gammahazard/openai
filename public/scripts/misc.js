function copyToClipboard(element) {
    // Create a temporary element to hold the text to copy
    const tempElement = document.createElement("textarea");
    tempElement.value = element.textContent;
    document.body.appendChild(tempElement);
  
    // Select and copy the text
    tempElement.select();
    document.execCommand("copy");
  
    // Remove the temporary element
    document.body.removeChild(tempElement);
  
    // Show the copied message
    const messageElement = document.createElement("div");
    messageElement.textContent = "Copied to clipboard!";
    messageElement.color = "white";
    messageElement.style.position = "fixed";
    messageElement.style.top = "50%";
    messageElement.style.left = "50%";
    messageElement.style.transform = "translate(-50%, -50%)";
    messageElement.style.padding = "1rem";
    messageElement.style.backgroundColor = "transparent";
    messageElement.style.border = "1px solid white";
    messageElement.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
    messageElement.style.zIndex = "9999";
    document.body.appendChild(messageElement);
  
    // Hide the message after 2 seconds
    setTimeout(() => {
      document.body.removeChild(messageElement);
    }, 750);
  }
  
  const answersElement = document.querySelector(".answers");
  answersElement.addEventListener("click", () => {
    copyToClipboard(answersElement);
  });