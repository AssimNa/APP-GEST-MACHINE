from flask import Blueprint, request, jsonify
from models.machine_model import get_all_machines, add_machine

machine_bp = Blueprint('machine', __name__)

@machine_bp.route('/machines', methods=['GET'])
def get_machines():
    return jsonify(get_all_machines())

@machine_bp.route('/machines', methods=['POST'])
def create_machine():
    data = request.get_json()
    add_machine(data)
    return jsonify({"message": "Machine ajoutée avec succès"}), 201
