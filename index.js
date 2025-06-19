const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
const upload = multer(); // in-memory file parser
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('✅ HTMLat API is running.');
});

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const text = req.file.buffer.toString('utf-8');
  const preview = text.slice(0, 300); // limit response size
  res.json({
    message: '✅ File received and processed.',
    filename: req.file.originalname,
    preview
  });
});

// Fallback route
app.use((req, res) => {
  res.status(404).json({ error: '❌ Not found' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
