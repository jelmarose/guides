# Testing Considerations

## Frontend

### Responsiveness
Is your site mobile friendly? If possible, develop for mobile first then larger screens later on.

### Character limit and input overflow

Components that accept user input should have character limits, especially if the input will be displayed in the screen in another component. Pasting the entire *lorem ipsum* will break the UI unless it has proper catchers for long text.

### Sanitizing user input

Any user input without proper validation can be used to execute SQL injection.

## Backend

### Items with parent and child connections

For example, the app keeps records of a company's departments, and the employees under those departments. This makes the **department** a parent item, and the **department members** its children. If a parent is deleted from the database, what happens to its children? If there is a table tracking the relationship of these two items, their entries should be removed as well. This is to prevent abandoned items from being returned by the API.
