import os

avalaible_mime = ["png", "jpeg", "svg+xml", "gif"]

mime_to_ext = {"png": ".png", "jpeg": ".jpg", "svg+xml": ".svg", "gif": ".gif"}
ext_to_mime ={"png": "image/png", "jpg": "image/jpeg", "svg": "image/svg+xml", "gif": "image/gif"}

def get_file_list():
    res = []
    entries = os.scandir("./storage/")
    for entry in entries:
         if entry.is_file():
             if entry.name[0] != '.':
                res.append(entry.name.split('.')[0])
    return res

def get_file_path(filename):
    file_dict = get_file_dict()
    return f"./storage/{file_dict[filename]}"

def get_file_dict():
    res = {}

    entries = os.scandir("./storage/")
    for entry in entries:
         if entry.is_file():
             if entry.name[0] != '.':
                res[entry.name.split('.')[0]] = entry.name
    return res

def get_file_ext(filename):
    file_dict = get_file_dict()
    res = str(file_dict[filename])
    return res.split('.')[1]