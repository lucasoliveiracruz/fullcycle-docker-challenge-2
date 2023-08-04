const express = require('express');

const db = require('./db');
const config = require('./config');

const app = express();

const randomName = () => {
    const names = ['Wesley', 'Lucas', 'Julia', 'Maria', 'José', 'Luciano'];
    const key = Math.floor(Math.random() * names.length);
    return names[key];
}

app.get('/', async (_req, res) => {
    db.createTable();
    await db.addPerson(randomName());
    const people = await db.list();
    const list = people.map(p => `<li>(${p.id}) ${p.name}</li>`).join('');

    res.send(`
        <h1>Full Cycle Rocks!</h1>
        <ul>${list}</ul>
    `);
});

app.listen(config.PORT, () => {
    console.log(`App is running at port ${config.PORT}`)
})