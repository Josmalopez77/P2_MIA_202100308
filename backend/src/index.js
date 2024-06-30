const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();
const{PORT} = process.env;


app.listen(PORT, () => {
    console.log(`Server is running en http://localhost:${PORT}`)
})