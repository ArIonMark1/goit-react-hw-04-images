export default function controlPosition() {
  // getBoundingClientRect;
  const gallery = document.querySelector('#gallery');
  if (!gallery) {
    return;
  }
  const galleryParams = gallery.getBoundingClientRect(); // returns a object, providing info about the size and position of element

  window.scrollTo(0, galleryParams.height);
}
