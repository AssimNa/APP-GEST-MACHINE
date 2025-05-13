from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
# import bcrypt

app = Flask(__name__)
CORS(app)

# Connexion à la base de données MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",          # Ton utilisateur MySQL
    password="",          # Ton mot de passe MySQL
    database="app_gestion"      # Le nom de ta base
)
cursor = db.cursor()
#signup
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    try:
        # Vérifie si l'utilisateur existe déjà
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        existing_user = cursor.fetchone()
        if existing_user:
            return jsonify({"error": "Email already in use"}), 409

        # Enregistrement sans hash
        sql = "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)"
        values = (name, email, password)
        cursor.execute(sql, values)
        db.commit()

        return jsonify({"message": "User registered and saved in database"}), 201

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500




#login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    try:
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()

        if user:
            stored_password = user[3]  # Le mot de passe en clair depuis la BDD
            if password == stored_password:
                return jsonify({
                    "message": "Login successful",
                    "user": {
                        "id": user[0],
                        "name": user[1],
                        "email": user[2]
                    }
                }), 200
            else:
                return jsonify({"error": "Invalid email or password"}), 401
        else:
            return jsonify({"error": "Invalid email or password"}), 401

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500




if __name__ == '__main__':
    app.run(debug=True)
