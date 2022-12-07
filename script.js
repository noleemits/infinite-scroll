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
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
//check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    imageLoader.style.display = "none";
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}
//function to dipslay the photos
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

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
    //check when every image is finished loading
    img.addEventListener("load", imageLoaded);
  });
}

//Unsplash api

const count = 5;
const apiKey = "RLoQ73zWZ7NmfTQiOu1SW6tRBOOzxfYgYC4zAAr1bWQ";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Get photos from unsplash api

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //error
  }
}

//Check to see scrolled

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    //  ready = false;
    getPhotos();
  }
});

//on load
getPhotos();
