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

-- will return all userId from USER01 to USER09
SELECT * FROM profiles
WHERE userId ILIKE 'user0_';
```

### IN and BETWEEN
```sql
-- will return data for Luo Binghe, Ning Yingying and Ming Fan
SELECT * FROM profiles
WHERE firstName IN ('Binghe', 'Yingying', 'Fan');

-- will return data for Shang Qinghua up to Yue Qingyuan
SELECT * FROM profiles
WHERE id BETWEEN 0 AND 6;
```

| products |
| uuid | product_code | product_category | product_name | price | qty |
| ---- | ------------ | ---------------- | ------------ | ----- | --- |
| DH02 | HFGJ664DSKOP | Headphones | Fifine H6 USB Dynamic RGB Gaming Headphones | 1560 | 99 |
| DH02 | AOPU664DSKOP | Headphones | Logitech H111 Wired Stereo Business Headset | 300 | 99 |
| DH02 | AL62664DSKOP | Microphones | Fifine F4 Plug & Play USB Mic | 969 | 99 |
| DH02 | MIPS664DSKOP | Cameras | Logitech StreamCam Full HD 1080p USB Webcam | 5757 | 99 |
| DH02 | RJSN664DSKOP | Cameras | OBSBOT Meet 2 AI-Powered 4K Webcam | 7500 | 99 |
| DH02 | 98SA664DSKOP | Storage | Western Digital WD My Passport Slim External HDD Storage | 3780 | 99 |
| DH02 | MABS664DSKOP | Printers | Epson EcoTank L5290 WiFi All in One Ink Tank Printer | 14030 | 99 |

## SELECT DISTINCT

## JOIN








