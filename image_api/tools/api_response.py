from flask import jsonify

def json_response(status, msg):
    return_value = 200
    if status == "error":
        return_value = 400
    response = {
        "status": status,
        "payload": msg
    }
    return jsonify(response), return_value