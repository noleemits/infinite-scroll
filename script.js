//function to set attributes
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
//components
const imageContainer = document.querySelector(".image-container");
const imageLoader = document.querySelector(".loader");
let photosArray = [];

//function to dipslay the photos
function displayPhotos() {
  photosArray.forEach((photo) => {
    //create link
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    //create image
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //put img inside anchor
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Unsplash api

const count = 10;
const apiKey = "RLoQ73zWZ7NmfTQiOu1SW6tRBOOzxfYgYC4zAAr1bWQ";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Get photos from unsplash api

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    console.log("hellos");
  } catch (error) {
    //error
  }
}

//on load
getPhotos();
