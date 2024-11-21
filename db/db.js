// Création de la base de donnée ici
// Dans le cas d'un changement de la création de cet instance, ça serait plus facile car il serait accessible partout
//Puis l'exporter ensuite.

const db = new sqlite3.Database('./products.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the products database.');
});
