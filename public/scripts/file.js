const fileImageElement = document.getElementById("image");
const imagePreviewElement = document.getElementById("preview-image");

preview = () => {
  const files = fileImageElement.files;
  if (!files || files.length === 0) {
    imagePreviewElement.style.display = "none";
    return;
  }
 const pickFile = files[0];
 imagePreviewElement.src = URL.createObjectURL(pickFile);
 imagePreviewElement.style.display = "block";
};

fileImageElement.addEventListener("change", preview);
