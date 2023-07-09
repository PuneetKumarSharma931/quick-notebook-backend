const express = require('express');
require('./db');
const cors = require('cors');

const port = process.env.PORT || 2000;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', require("./routes/auth"));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, ()=>{

    console.log(`Server is running at port: ${port}`);
});

