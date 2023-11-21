function compressImage() {
      const fileInput = document.getElementById('fileInput');
      const file = fileInput.files[0];

      if (!file) {
        alert('Please select a PNG file.');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        const img = new Image();
        img.src = reader.result;
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const maxWidth = 800; // Set maximum width for the compressed image
          const maxHeight = 600; // Set maximum height for the compressed image

          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(function (blob) {
            const url = URL.createObjectURL(blob);
            const downloadLink = document.getElementById('downloadLink');
            downloadLink.href = url;
            downloadLink.style.display = 'block';
            const output = document.getElementById('output');
            output.innerHTML = '<img src="' + url + '" alt="Compressed Image">';

            // File size calculations
            const previousSize = (file.size / 1024).toFixed(2); // Previous file size in KB
            const newSize = (blob.size / 1024).toFixed(2); // New file size in KB
            const reduction = (((file.size - blob.size) / file.size) * 100).toFixed(2); // Reduction percentage

            const info = document.getElementById('info');
            info.innerHTML = `
              <p>Previous File Size: ${previousSize} KB</p>
              <p>New File Size: ${newSize} KB</p>
              <p>Reduction: ${reduction}%</p>
            `;
          }, 'image/png', 0.8); // Adjust compression quality here (0.8 is 80% quality)
        };
      };
    }
