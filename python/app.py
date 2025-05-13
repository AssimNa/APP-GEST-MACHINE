from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from routes.machine_routes import machine_bp
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
    role = "user"  # Valeur par défaut

    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    try:
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        existing_user = cursor.fetchone()
        if existing_user:
            return jsonify({"error": "Email already in use"}), 409

        cursor.execute("INSERT INTO users (name, email, password, role) VALUES (%s, %s, %s, %s)",
                       (name, email, password, role))
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

        if user and user[3] == password:  # Index 3 = password
            return jsonify({
                "message": "Login successful",
                "user": {
                    "id": user[0],
                    "name": user[1],
                    "email": user[2],
                    "role": user[4]  # 👈 rôle retourné
                }
            }), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500


    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

#machines
app.register_blueprint(machine_bp)

if __name__ == '__main__':
    app.run(debug=True)
