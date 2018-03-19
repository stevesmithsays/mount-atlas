UPDATE carts
SET qty = $1
WHERE order_id = $2;
