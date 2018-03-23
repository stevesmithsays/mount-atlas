INSERT INTO carts ( id, description, price, product_id, qty)
VALUES ($1, $2, $3, $4, 1) 
RETURNING *;