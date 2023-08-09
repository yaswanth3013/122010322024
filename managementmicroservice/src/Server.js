const express = require('express');
const axios = require('axios');
const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
  const urlList = req.query.url || [];
  const promises = urlList.map(async (url) => {
    try {
      const response = await axios.get(url, { timeout: 500 });
      return response.data.numbers;
    } catch (error) {
      console.error(`Error fetching from ${url}: ${error.message}`);
      return [];
    }
  });

  const results = await Promise.all(promises);
  const mergedNumbers = results.flat().filter((number, index, self) => self.indexOf(number) === index).sort((a, b) => a - b);

  res.json({ numbers: mergedNumbers });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
