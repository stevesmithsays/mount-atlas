INSERT INTO carts ( id, description, price, qty)
VALUES ($1, $2, $3, 1) 
RETURNING *;