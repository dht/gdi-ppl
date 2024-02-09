const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const inputDir = path.resolve(__dirname + '/../ppl-images/_raw');
const outputDir = path.resolve(__dirname + '/../ppl-images');

// Read the input directory
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Iterate over each file in the directory
  files.forEach((file) => {
    // Check if the file is an image (you can modify this condition based on your requirements)
    if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
      // Create a readable stream from the input file
      const inputPath = `${inputDir}/${file}`;
      console.log('inputPath ->', inputPath);

      // Create a writable stream for the output file
      const outputPath = `${outputDir}/${file}`;

      // Use sharp to resize and optimize the image
      sharp(inputPath)
        .resize(200) // Set the desired thumbnail width (you can modify this value)
        .jpeg({ progressive: true, quality: 80 }) // Use progressive encoding and set the quality (you can modify these options)
        .toFile(outputPath.replace('.png', '.jpg'));

      sharp(inputPath)
        .resize(100) // Set the desired thumbnail width (you can modify this value)
        .jpeg({ progressive: true, quality: 80 }) // Use progressive encoding and set the quality (you can modify these options)
        .toFile(outputPath.replace('.png', '_thumb.jpg'));
    }
  });
});
