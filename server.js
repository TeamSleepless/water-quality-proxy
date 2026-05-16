import express from 'express';

const app = express();

const WATER_API_BASE_URL =
  'https://water-data-api-xfkvd.ondigitalocean.app';

const WATER_API_KEY = process.env.WATER_API_KEY;

app.get('/water-quality', async (req, res) => {
  try {
    const { zip } = req.query;

    if (!zip) {
      return res.status(400).json({ error: 'zip query parameter is required' });
    }

    const apiRes = await fetch(
      `${WATER_API_BASE_URL}/v1/zip/${zip}`,
      {
        headers: {
          Authorization: `ApiKey ${WATER_API_KEY}`,
          Accept: 'application/json',
        },
      }
    );

    const data = await apiRes.json();

    if (!apiRes.ok) {
      return res.status(apiRes.status).json(data);
    }

    res.json(data);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: 'Failed to fetch water data',
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
