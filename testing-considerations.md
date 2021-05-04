# Testing Considerations

## Frontend

### Sanitizing user input

Any user input without proper validation can be used to execute SQL injection.

## Backend

### Items with parent and child connections

For example, the app keeps records of a company's departments, and the employees under those departments. This makes the **department** a parent item, and the **department members** its children. If a parent is deleted from the database, what happens to its children? If there is a table tracking the relationship of these two items, their entries should be removed as well. This is to prevent abandoned items from being returned by the API.
