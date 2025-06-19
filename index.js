const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

app.post("/extract", upload.single("file"), async (req, res) => {
  const content = req.file.buffer.toString("utf-8");
  const dummyTitle = content.slice(0, 50);
  const marc = `=245  10$a${dummyTitle} /$cExtracted.`;
  res.json({ marc });
});

app.listen(3000, () => console.log("✅ API is live on port 3000"));
