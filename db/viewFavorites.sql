SELECT favdprod_id, products.img, products.description, products.price 	
FROM products JOIN favorites ON products.id = favdprod_id WHERE favduser_id = $1;