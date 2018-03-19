SELECT products.id, products.description, products.img,
carts.product_id
FROM products
INNER JOIN carts
ON products.id = carts.product_id;