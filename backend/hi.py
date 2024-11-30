from sqlalchemy import create_engine, inspect

# Create the engine for the SQLite database
engine = create_engine("sqlite:///./test.db")

# Use the inspector to get table details
inspector = inspect(engine)

# List all tables
tables = inspector.get_table_names()
print("Tables:", tables)

# Get detailed information for each table
for table in tables:
    print(f"Table: {table}")
    columns = inspector.get_columns(table)
    for column in columns:
        print(f"  Column: {column['name']}, Type: {column['type']}")

# with engine.connect() as connection:
#     # Example: Querying the 'users' table
#     result = connection.execute("SELECT * FROM users LIMIT 5;")
#     rows = result.fetchall()
    
#     print("Data in 'users' table:")
#     for row in rows:
#         print(row)