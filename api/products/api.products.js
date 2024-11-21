//Opérations crud Concernant les produits ici.

app.get('/products', (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
        } else {
            res.send(rows);
        }
    });
});


// POST new product
app.post('/products', (req, res) => {
    console.log(req.body)
    const { name, price } = req.body;
    if (!name || !price) {
        res.status(400).send('Name and price are required');
    } else {
        const sql = 'INSERT INTO products(name, price) VALUES (?, ?)';
        db.run(sql, [name, price], function(err) {
            if (err) {
                console.error(err.message);
                res.status(500).send('Internal server error');
            } else {
                const id = this.lastID;
                res.status(201).send({ id, name, price });
            }
        });
    }
});

// PUT update product by ID
app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    if (!name || !price) {
        res.status(400).send('Name and price are required');
    } else {
        const sql = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
        db.run(sql, [name, price, id], function(err) {
            if (err) {
                console.error(err.message);
                res.status(500).send('Internal server error');
            } else if (this.changes === 0) {
                res.status(404).send('Product not found');
            } else {
                res.status(200).send({ id, name, price });
            }
        });
    }
});

// DELETE product by ID
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
        } else if (this.changes === 0) {
            res.status(404).send('Product not found');
        } else {
            res.status(204).send();
        }
    });
});