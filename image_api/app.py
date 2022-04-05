
from crypt import methods
import json
import os
from flask import Flask, jsonify, request, send_file

from tools.api_response import json_response
from tools.hash_generator import create_hash
from tools.storage import *

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
    with open(f"./storage/{filename}", "wb") as fh:
        fh.write(payload)
        msg = {
            "filename": filename,
            "id": file_id,
            "extention": extention
        }
    return json_response('success', msg)



@app.route('/get_file', methods=['GET'])
def get_file():
    file_id = request.args.get('id')
    filename_list = get_file_list()
    if file_id not in filename_list:
        return json_response('error', 'Error: unknown file id.')
    ext = get_file_ext(file_id)
    mime = ext_to_mime[ext]
    file_name = f"{file_id}{ext}"
    path = get_file_path(file_id)
    return send_file(path,
                     mimetype=mime,
                     attachment_filename=file_name,
                     as_attachment=True)




@app.route('/', methods=['GET'])
def welcome():
    return json_response('success', "welcome")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.getenv('PORT'))