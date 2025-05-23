# PostgreSQL Basics

## Table

### Create

```sql
CREATE TABLE profiles (
	id SERIAL NOT NULL PRIMARY KEY,
	userId VARCHAR(255),
	firstName VARCHAR(255),
	lastName VARCHAR(255)
);
```

### Read

### Update
```sql
-- Add column
ALTER TABLE profiles
ADD username VARCHAR(255);

-- Update column
-- some data types cannot be converted if the column has value
-- numbers can always be converted to text, but text cannot always be converted to numbers
ALTER TABLE profiles
ALTER COLUMN firstName TYPE VARCHAR(50);
```

### Delete
```sql
-- Delete column
ALTER TABLE profiles
DROP COLUMN lastName;

-- Delete table
DROP TABLE profiles;
```

--------------------------------------------------------

## Table Data

### Create

```sql
INSERT INTO profiles (userId, firstName, lastName)
VALUES
	('USER01', 'Qinghua', 'Shang'), 
	('USER02', 'Yuan', 'Shen'),
	('DISCIPLE01', 'Binghe', Luo'),
	('DISCIPLE02', 'Yingying', Ning'),
	('DISCIPLE03', 'Fan', Ming'),
	('DISCIPLE04', 'Mingyan', Liu'),
	('PEAKLORD01', 'Qingyuan', 'Yue'),
	('PEAKLORD02', 'Qingqi', 'Qi'),
	('PEAKLORD03', 'Qingge', 'Liu');
```

### Read

```sql
SELECT * FROM profiles;

SELECT firstName, lastName FROM profiles;
```

### Update

```sql
-- If WHERE clause is not included, all records will be updated
UPDATE profiles
SET username = 'airplane'
WHERE userId = 'USER01';

UPDATE profiles
SET username = 'cucumber', firstName = 'Qingqiu'
WHERE userId = 'USER02';
```

### Delete
```sql
-- Delete specific record
DELETE FROM profiles
WHERE userId = 'USER02';

-- Delete all records
DELETE FROM profiles;
TRUNCATE TABLE profiles;
-- the difference is that DELETE is logged while TRUNCATE does not, meaning you cannot roll back and get your data again when using TRUNCATE
-- apparently TRUNCATE also resets the identity seed 
```

# PostgreSQL Syntax

## WHERE clause operators

```sql
= -- equal to
< -- less than
> -- greater than
<= -- less than or equal to
>= -- greater than or equal to
<> -- not equal to
!= -- not equal to
LIKE -- (case sensitive) check if a value matches a pattern
ILIKE -- (case insensitive) check if a value matches a pattern
AND -- logical AND
OR -- logical OR
IN -- check if a value is in a defined list of values
BETWEEN -- check if a value is in between a specified range of values
IS NULL -- check if a value is null
NOT -- makes a negative result, e.g. NOT LIKE, NOT IN, NOT BETWEEN
```

### LIKE and ILIKE wildcards
Think of LIKE and ILIKE arguments as something similar to regex. You can supply an absolute value like 'Yuan', but you can also use a wildcard to define a pattern.

There are two wildcards often used with the LIKE/ILIKE operator:
- The percent sign (%) represents zero, one, or multiple characters.
- The underscore sign (_) represents one single character.

```sql
-- will return all firstName starting with Qing
SELECT * FROM profiles
WHERE firstName LIKE 'Qing%';

-- will return all firstName ending with n
SELECT * FROM profiles
WHERE firstName LIKE '%n';

-- will return all userId from DISCIPLE01 to DISCIPLE04
SELECT * FROM profiles
WHERE userId ILIKE 'disciple0_';
```

### IN and BETWEEN
```sql
-- will return data for Luo Binghe, Ning Yingying and Ming Fan
SELECT * FROM profiles
WHERE firstName IN ('Binghe', 'Yingying', 'Fan');

-- will return data for Luo Binghe, Ning Yingying, Ming Fan and Liu Mingyan
SELECT * FROM profiles
WHERE firstName IN (SELECT firstName FROM profiles WHERE userID LIKE 'DISCIPLE0_'); 

-- will return data for Shang Qinghua up to Yue Qingyuan
SELECT * FROM profiles
WHERE id BETWEEN 0 AND 6;

-- will return data in alphabetical order of lastName name for everyone except the disciples
SELECT lastName, firstName FROM profiles
WHERE userId BETWEEN 'PEAKLORD01' AND 'USER02' 
ORDER BY lastName;
```

```products table```
| uuid | product_code | product_category | product_name | price | qty |
| ---- | ------------ | ---------------- | ------------ | ----- | --- |
| DH02 | HFGJ664DSKOP | Headphones | Fifine H6 USB Dynamic RGB Gaming Headphones | 1560 | 99 |
| DH02 | AOPU664DSKOP | Headphones | Logitech H111 Wired Stereo Business Headset | 300 | 99 |
| DH02 | AL62664DSKOP | Microphones | Fifine F4 Plug & Play USB Mic | 969 | 99 |
| DH02 | MIPS664DSKOP | Cameras | Logitech StreamCam Full HD 1080p USB Webcam | 5757 | 99 |
| DH02 | RJSN664DSKOP | Cameras | OBSBOT Meet 2 AI-Powered 4K Webcam | 7500 | 99 |
| DH02 | 98SA664DSKOP | Storage | Western Digital WD My Passport Slim External HDD Storage | 3780 | 99 |
| DH02 | NULL | Storage | (OUT OF STOCK) Kingston USB Flash Drive 2TB | NULL | NULL
| DH02 | MABS664DSKOP | Printers | Epson EcoTank L5290 WiFi All in One Ink Tank Printer | 14030 | 99 |

### SELECT DISTINCT and SELECT COUNT(DISTINCT)
```SELECT DISTINCT``` is used to return unique only values, same with ```SELECT COUNT(DISTINCT)```.

```sql
-- will return [ Headphones, Microphones, Cameras, Storage, Printers ] 
SELECT DISTINCT product_category FROM products;

-- will return 5
SELECT COUNT(DISTINCT) product_category FROM products;
```

### Sort Data using ORDER BY
```sql
-- sorts by ascending by default, add DESC at the end to signify descending order
SELECT * FROM products ORDER BY price; 

-- sorts alphabetical
SELECT * FROM products ORDER BY product_code DESC;
```

### Pagination using LIMIT
```sql
-- returns the first 5 results 
SELECT * FROM products LIMIT 5;

-- returns 5 results, starting from the 11th record
SELECT * FROM products LIMIT 5 OFFSET 10;
```

### Numeric column functions: MIN, MAX, COUNT, SUM, AVG
```sql
-- returns the smallest value
SELECT MIN(price) FROM products;

-- returns the largest value
SELECT MAX(price) FROM products;

-- returns the number of entries excluding NULL values
SELECT COUNT(product_code) FROM products;

-- returns the total sum excluding NULL values
SELECT SUM(qty) FROM products;

-- returns the average excluding NULL values
SELECT AVG(price) FROM products;

-- returns the average price with the decimals rounded off to 2 digits
SELECT AVG(price)::NUMERIC(10,2) FROM products;
-- i'm guessing the 10 is for base 10 while 2 is the round off for decimal
```

### Aliases
```sql
SELECT productCode AS code FROM products;

-- can skip the AS keyword actually but i prefer to keep it for readability
SELECT productCode code FROM products;

-- can combine column values using || and even format them
-- this one will return "Qi Qinggi"
SELECT lastName || ' ' || firstName AS fullName FROM profiles WHERE userId = 'PEAKLORD02';

-- this one will return "HFGJ664DSKOP - Fifine H6 USB Dynamic RGB Gaming Headphones"
SELECT product_code || ' - ' || product_name AS product FROM products WHERE product_code = 'HFGJ664DSKOP';

-- can also use a string as an alias
SELECT product_name AS "My Products" FROM products;
```

## JOIN

No matter which join you use, remember that the left table is the one declared in the FROM clause while the right table is the one declared in the JOIN clause.

Left table: products
| product_id | product_name | category_id |
| ---------- | ------------ | ----------- |
| 1          | Webcam       | 1           |
| 2          | DSLR         | 1           |
| 3          | Thermal Printer | 3        |
| 4          | Condenser Mic   | 2        |


Right table: categories
| category_id | category_name |
| ----------- | ------------- |
| 1           | Camera        |
| 2           | Microphone    |


```sql
-- Inner Join
-- selects only the data that matches from both tables

SELECT <LT column>, <RT column> FROM <left table> INNER JOIN <right table> ON <left table>.<LT column> = <right table>.<RT column>;
SELECT product_name, category_name FROM products INNER JOIN categories ON products.category_id = categories.category_id;

-- Left Join
-- selects all data from the left table while returning only the matched ones from the right table
SELECT product_name, category_name FROM products LEFT JOIN categories ON products.category_id = categories.category_id;

-- Right Join
-- selects all data from the right table while returning only the matched ones from the left table
SELECT product_name, category_name FROM products RIGHT JOIN categories ON products.category_id = categories.category_id;

-- Full Join
-- selects all data from both tables, returning NULL if the records don't match
SELECT product_name, category_name FROM products FULL JOIN categories ON products.category_id = categories.category_id;

-- Cross Join
-- matches each record from the left table with every record from the right table. i think this is used to populate tables.
SELECT product_name, category_name FROM products CROSS JOIN categories;
```






