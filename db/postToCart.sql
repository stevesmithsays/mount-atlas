INSERT INTO carts ( id, description, price )
VALUES ($1, $2, $3) RETURNING * ;