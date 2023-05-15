function countImages() {
  const imageCount = document.querySelectorAll('.image-item:not(.deleted)').length;
  const date = new Date();
  const formattedDate = `${padZero(date.getDate())}.${padZero(
    date.getMonth() + 1
  )}.${date.getFullYear()} ${padZero(date.getHours())}:${padZero(
    date.getMinutes()
  )}`;

  document.getElementById('image-count').textContent = `Images: ${imageCount}, Date: ${formattedDate}`;
}

function padZero(num) {
  return num.toString().padStart(2, '0');
}

const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal-image');
const closeButton = document.querySelector('.close-button');
const imageItems = document.querySelectorAll('.image-item');
const deleteButtons = document.querySelectorAll('.delete-button');
const restoreButton = document.createElement('button');
restoreButton.textContent = 'Restore';
restoreButton.classList.add('restore-button');
document.body.appendChild(restoreButton);

imageItems.forEach((imageItem, index) => {
  imageItem.addEventListener('click', () => {
    const imageSrc = imageItem.querySelector('img').src;
    modalImage.src = imageSrc;
    modal.classList.add('active');
  });

  deleteButtons[index].addEventListener('click', (event) => {
    event.stopPropagation();
    imageItem.classList.add('deleted');
    saveDeletedImage(index);
    countImages();
  });
});

closeButton.addEventListener('click', () => {
  modal.classList.remove('active');
});

restoreButton.addEventListener('click', () => {
  const deletedImages = getDeletedImages();
  imageItems.forEach((imageItem, index) => {
    if (deletedImages.includes(index)) {
      imageItem.classList.remove('deleted');
    }
  });
  restoreButton.style.display = 'none';
  countImages();
});

countImages();

function saveDeletedImage(index) {
  const deletedImages = getDeletedImages();
  deletedImages.push(index);
  localStorage.setItem('deletedImages', JSON.stringify(deletedImages));
  restoreButton.style.display = 'block';
}

function getDeletedImages() {
  const deletedImages = localStorage.getItem('deletedImages');
  return deletedImages ? JSON.parse(deletedImages) : [];
}
