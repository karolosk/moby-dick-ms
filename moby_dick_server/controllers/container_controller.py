import docker
from services import container_service
from config import host_config as hc
from flask import Flask, render_template, jsonify, make_response,request, Blueprint

api = Blueprint('containers_controller', 'containers_controller', url_prefix='/api')

@api.route('/containers')
def container_list():
    try:
        return make_response(jsonify(container_service.retrieve_containers()), 200)
    except docker.errors.APIError as e:
        return make_response(jsonify({"error":"Server error", "details": str(e)}), 500)

@api.route('/containers', methods=['POST'])
def run_default_container():
    try:
        return make_response(jsonify(container_service.run_container()), 201)
    except docker.errors.ImageNotFound as e:
        return make_response(jsonify({"error":"Image Not Found", "details": str(e)}), 500) # Maybe should be 4xx code
    except docker.errors.APIError as e:
        return make_response(jsonify({"error":"Server error", "details": str(e)}), 500)

@api.route('/containers/<id>/start', methods=['PUT'])
def start_container(id):
    try:
        return make_response(jsonify(container_service.start_container(id)), 201)
    except docker.errors.ImageNotFound as e:
        return make_response(jsonify({"error":"Image Not Found", "details": str(e)}), 500) # Maybe should be 4xx code
    except docker.errors.APIError as e:
        return make_response(jsonify({"error":"Server error", "details": str(e)}), 500)

@api.route('/containers/<id>/stop', methods = ['PUT'])
def stop_container(id):
    try:
        return make_response(jsonify(container_service.stop_container(id)), 202) # Accepted response code, maybe 200 here as well
    except docker.errors.APIError as e:
        return make_response(jsonify({"error":"Server error", "details": str(e)}), 500)

@api.route('/containers/<id>/remove', methods = ['DELETE'])
def remove_container(id):
    try:
        return make_response(jsonify(container_service.remove_container(id)), 200)
    except docker.errors.APIError as e:
        return make_response(jsonify({"error":"Server error", "details": str(e)}), 500)
