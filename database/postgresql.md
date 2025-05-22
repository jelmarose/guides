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
	('USER02', 'Yuan', 'Shen');
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
WHERE userId = 'USER01'

UPDATE profiles
SET username = 'cucumber', firstName = 'Qingqiu'
WHERE userId = 'USER02'
```

### Delete
```sql
-- Delete specific record
DELETE FROM profiles
WHERE userId = 'USER02';

-- Delete all records
DELETE FROM profiles;
TRUNCATE TABLE profiles
-- the difference is that DELETE is logged while TRUNCATE does not, meaning you cannot roll back and get your data again when using TRUNCATE
-- apparently TRUNCATE also resets the identity seed 
```

# PostgreSQL Syntax
