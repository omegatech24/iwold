
const app = require('./app');

app.listen(5500, (error) => {
    if(error) {
        console.error('server not started');
        return error;
    }
    console.log(`
        server started on port 5500
    `);
});

