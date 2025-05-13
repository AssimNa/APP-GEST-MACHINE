import mysql.connector
from config import db_config

def create_connection():
    return mysql.connector.connect(**db_config)

def insert_user(name, email, password_hash):
    conn = create_connection()
    cursor = conn.cursor()
    sql = "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)"
    cursor.execute(sql, (name, email, password_hash))
    conn.commit()
    cursor.close()
    conn.close()
