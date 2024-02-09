const fs = require('fs');

const run = async () => {
  const files = fs.readdirSync('../ppl-jsons/raw');

  console.log('files ->', files);

  const output = [];

  files.forEach((file) => {
    const inputPath = `../ppl-jsons/raw/${file}`;
    const content = fs.readFileSync(inputPath, 'utf8');
    const data = JSON.parse(content).map((item) => {
      const { firstName, lastName } = item;

      const name = `${firstName} ${lastName}`.replace(/ /g, '.');

      const thumbUrl = `${name}_thumb.jpg`.toLowerCase();
      const imageUrl = `${name}.jpg`.toLowerCase();

      const imageExists = fs.existsSync(`../ppl-images/${imageUrl}`);

      return {
        ...item,
        thumbUrl,
        imageUrl,
        imageExists,
      };
    });

    output.push(data);
  });

  const outputPath = `../ppl-jsons/all.json`;
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
};

run();
