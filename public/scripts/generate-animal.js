const button = document.getElementById("gen-animal");
const result = document.getElementById("result-animal-random");

button.addEventListener("click", async () => {
  try {
    // Add the 'loading' text and hide the button
    button.style.display = "none";
    result.innerText = "Loading...";

    result.classList.add("fade-in");

    // Call the endpoint to generate the animals and images
    const response = await fetch("/generate-animal", { method: "POST" });
    const data = await response.json();

    // Add the images to the page
    const images = data.imageUrls;
    const imageContainer = document.createElement("div");
    imageContainer.style.display = "flex";
    imageContainer.style.flexDirection = "row";
    imageContainer.style.justifyContent = "center";
    imageContainer.style.alignItems = "center";
    imageContainer.style.gap = "1rem";
    for (let i = 0; i < images.length; i++) {
      const img = document.createElement("img");
      img.src = images[i];
      img.classList.add("fade-in");
      img.style.width = "256px";
      img.style.height = "256px";
      imageContainer.appendChild(img);
    }
    result.innerHTML = "";
    result.appendChild(imageContainer);

    // Show the button again
    button.style.display = "block";
  } catch (error) {
    console.log(error);
  }
});