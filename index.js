const express = require('express');
const users = require('./backend/users');

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.json( users);
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});
