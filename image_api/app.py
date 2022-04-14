
from crypt import methods
import json
import os
from flask import Flask, jsonify, request, send_file

from tools.api_response import json_response
from tools.hash_generator import create_hash
from tools.get_last_files import get_last_files_path
from tools.storage import *


import base64


STORAGE_PATH="./storage/"
app = Flask(__name__)

@app.route('/store_img', methods=['POST'])
def post_image():
    payload = request.data
    mime = request.headers["Content-Type"].split('/')[1]
    if not payload:
        return json_response('error', 'Error: the is no file')
    if mime not in avalaible_mime:
        return json_response('error', f"Error: this mime type isn\'t suported, please choose one of these: {', '.join(avalaible_mime)}. See https://www.npmjs.com/package/mime-types to get mime type with filename")

    extention = mime_to_ext[mime]
    file_id = create_hash()
    filename = f"{file_id}{extention}"
    with open(f"{STORAGE_PATH}{filename}", "wb") as fh:
        fh.write(payload)
        msg = {
            "filename": filename,
            "id": file_id,
            "extention": extention
        }
    
    with open(f"{STORAGE_PATH}{filename}", "rb") as image_file:
        encoded_img = base64.b64encode(image_file.read())
    with open(f"{STORAGE_PATH}{filename}", "wb") as image_file:
        image_file.write(encoded_img)
    return json_response('success', msg)

def last_mode(nb):
    print("[LOG]: Get request last_mode", flush=True)
    try:
        n_nb = int(nb)
        if n_nb <= 0:
            raise ValueError
    except ValueError:
        return json_response('error', "Error: invalid arg for last")
    files_list = get_last_files_path(n_nb, STORAGE_PATH)
    return my_send_file(files_list)


def id_mode(file_id):
    print("[LOG]: Get request id_mode")
    file_id_list = file_id.split(',')
    path = []
    for f_id in file_id_list:
        path.append(get_file_path(f_id))

    return my_send_file(path)

def my_send_file(path_list):
    payload = {}
    res = []
    for file in path_list:
        if file == "error":
            res.append("null")
        else:
            with open(file, "rb") as fh:
                res.append(fh.read().decode("utf-8"))
    
    payload["files"]= res
    return json_response('success', payload)


@app.route('/get_file', methods=['GET'])
def get_file():
    print(f"[LOG] GET agrs {request.args.lists()}", flush=True)
    args =  request.args.items()
    arg = next(args)[0]


    if arg == 'last':
        nb = request.args.get('last')
        return last_mode(nb)
    elif arg == 'id':
        file_id = request.args.get('id')
        return id_mode(file_id)
    else:
        return json_response('error', 'Error unknow args')


@app.route('/', methods=['GET'])
def welcome():
    return json_response('success', "welcome")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.getenv('PORT'))