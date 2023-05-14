function countImages() {
      const imageCount = document.querySelectorAll('.image-item').length;
      const date = new Date();
      const formattedDate = `${padZero(date.getDate())}.${padZero(date.getMonth() + 1)}.${date.getFullYear()} ${padZero(date.getHours())}:${padZero(date.getMinutes())}`;

      document.getElementById('image-count').textContent = `Images: ${imageCount}, Date: ${formattedDate}`;
    }

    function padZero(num) {
      return num.toString().padStart(2, '0');
    }

    const modal = document.querySelector('.modal');
    const modalImage = document.querySelector('.modal-image');
    const closeButton = document.querySelector('.close-button');
    const imageItems = document.querySelectorAll('.image-item');

    imageItems.forEach((imageItem) => {
      imageItem.addEventListener('click', () => {
        const imageSrc = imageItem.querySelector('img').src;
        modalImage.src = imageSrc;
        modal.classList.add('active');
      });
    });

    closeButton.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    countImages();