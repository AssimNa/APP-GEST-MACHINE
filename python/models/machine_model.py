from config import get_db_connection

def get_all_machines():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Machine")
    machines = cursor.fetchall()
    conn.close()
    return machines

def add_machine(data):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO Machine (Description, Nserie, constructeur, Nmachine, poids, Dimension)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (data['Description'], data['Nserie'], data['constructeur'], data['Nmachine'], data['poids'], data['Dimension']))
    conn.commit()
    conn.close()
