from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from datetime import datetime

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="app_gestion"
    )

# Machine Routes
@app.route('/machines', methods=['GET'])
def get_machines():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute('SELECT * FROM Machine')
        machines = cursor.fetchall()
        return jsonify(machines)
    finally:
        cursor.close()
        conn.close()

@app.route('/machines', methods=['POST'])
def add_machine():
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        data = request.json
        sql = """INSERT INTO Machine 
                (Description, Nserie, constructeur, Nmachine, poids, 
                Dimension, machine_name, status, health) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        values = (
            data['Description'], data['Nserie'], data['constructeur'],
            data['Nmachine'], data['poids'], data['Dimension'],
            data['machine_name'], data['status'], data['health']
        )
        cursor.execute(sql, values)
        conn.commit()
        return jsonify({'message': 'Machine added successfully', 'id': cursor.lastrowid})
    finally:
        cursor.close()
        conn.close()

# Additional Machine Routes
@app.route('/machines/<int:id>', methods=['DELETE'])
def delete_machine(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('DELETE FROM Machine WHERE id = %s', (id,))
        conn.commit()
        if cursor.rowcount:
            return jsonify({'message': 'Machine deleted successfully'})
        return jsonify({'message': 'Machine not found'}), 404
    finally:
        cursor.close()
        conn.close()

@app.route('/machines/<int:id>', methods=['PUT'])
def update_machine(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        data = request.json
        sql = """UPDATE Machine SET 
                Description = %s, Nserie = %s, constructeur = %s,
                Nmachine = %s, poids = %s, Dimension = %s,
                machine_name = %s, status = %s, health = %s
                WHERE id = %s"""
        values = (
            data['Description'], data['Nserie'], data['constructeur'],
            data['Nmachine'], data['poids'], data['Dimension'],
            data['machine_name'], data['status'], data['health'], id
        )
        cursor.execute(sql, values)
        conn.commit()
        if cursor.rowcount:
            return jsonify({'message': 'Machine updated successfully'})
        return jsonify({'message': 'Machine not found'}), 404
    finally:
        cursor.close()
        conn.close()

# User Routes
@app.route('/users', methods=['POST'])
def add_user():
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        data = request.json
        sql = "INSERT INTO Utilsateurs (username, password_hash, role) VALUES (%s, %s, %s)"
        values = (data['username'], data['password_hash'], data['role'])
        cursor.execute(sql, values)
        conn.commit()
        return jsonify({'message': 'User added successfully', 'id': cursor.lastrowid})
    finally:
        cursor.close()
        conn.close()

# Maintenance Task Routes
@app.route('/maintenance-tasks', methods=['GET'])
def get_maintenance_tasks():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute('SELECT * FROM maintenance_task')
        tasks = cursor.fetchall()
        return jsonify(tasks)
    finally:
        cursor.close()
        conn.close()

@app.route('/maintenance-tasks', methods=['POST'])
def add_maintenance_task():
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        data = request.json
        sql = """INSERT INTO maintenance_task 
                (Task_Title, Machine, Task_Type, Priority, 
                Scheduled_Date, Estimate_Hours, `Assigned To`) 
                VALUES (%s, %s, %s, %s, %s, %s, %s)"""
        values = (
            data['Task_Title'], data['Machine'], data['Task_Type'],
            data['Priority'], data['Scheduled_Date'], 
            data['Estimate_Hours'], data['Assigned_To']
        )
        cursor.execute(sql, values)
        conn.commit()
        return jsonify({'message': 'Maintenance task added successfully'})
    finally:
        cursor.close()
        conn.close()

# Intervention Routes
@app.route('/interventions', methods=['POST'])
def add_intervention():
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        data = request.json
        sql = """INSERT INTO intervention 
                (id_machine, `date-intervention`, responsable, description) 
                VALUES (%s, %s, %s, %s)"""
        values = (
            data['id_machine'], data['date_intervention'],
            data['responsable'], data['description']
        )
        cursor.execute(sql, values)
        conn.commit()
        return jsonify({'message': 'Intervention added successfully', 'id': cursor.lastrowid})
    finally:
        cursor.close()
        conn.close()

# Additional User Routes
@app.route('/users/login', methods=['POST'])
def login():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        data = request.json
        cursor.execute('SELECT * FROM Utilsateurs WHERE username = %s', (data['username'],))
        user = cursor.fetchone()
        if user and user['password_hash'] == data['password_hash']:
            return jsonify({
                'message': 'Login successful',
                'user': {
                    'id': user['id_user'],
                    'username': user['username'],
                    'role': user['role']
                }
            })
        return jsonify({'message': 'Invalid credentials'}), 401
    finally:
        cursor.close()
        conn.close()

# Maintenance Schedule Routes
@app.route('/maintenance-schedules', methods=['GET'])
def get_maintenance_schedules():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute('SELECT * FROM maintenance_schedule')
        schedules = cursor.fetchall()
        return jsonify(schedules)
    finally:
        cursor.close()
        conn.close()

@app.route('/maintenance-schedules', methods=['POST'])
def add_maintenance_schedule():
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        data = request.json
        sql = """INSERT INTO maintenance_schedule 
                (Schedule_Name, Machine, Frequency, Assign_To, Start_Date, End_Date) 
                VALUES (%s, %s, %s, %s, %s, %s)"""
        values = (
            data['Schedule_Name'], data['Machine'], data['Frequency'],
            data['Assign_To'], data['Start_Date'], data['End_Date']
        )
        cursor.execute(sql, values)
        conn.commit()
        return jsonify({'message': 'Maintenance schedule added successfully'})
    finally:
        cursor.close()
        conn.close()

# Report Routes
@app.route('/reports', methods=['GET'])
def get_reports():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute('SELECT * FROM rapport')
        reports = cursor.fetchall()
        return jsonify(reports)
    finally:
        cursor.close()
        conn.close()

@app.route('/reports', methods=['POST'])
def add_report():
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        data = request.json
        sql = "INSERT INTO rapport (periode, coçntenu) VALUES (%s, %s)"
        values = (data['periode'], data['contenu'])
        cursor.execute(sql, values)
        conn.commit()
        return jsonify({'message': 'Report added successfully', 'id': cursor.lastrowid})
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)