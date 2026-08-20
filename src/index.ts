import 'dotenv/config';
import app from './app.js';

const port = parseInt(process.env.PORT ?? "8000", 10)

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})