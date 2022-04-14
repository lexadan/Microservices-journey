# Image API documentation

## Upload an image
### Route

`http://localhost:5000/store_img`

### Method:

**POST**

### Example:

```js
var myHeaders = new Headers();
myHeaders.append("Content-Type", "image/jpeg"); # SEE ERROR HANDLING PART

var file = "<file contents here>";

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: file,
  redirect: 'follow'
};

fetch("http://localhost:5000/store_img", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

### Return Value

```
{
    "payload": {
        "extention": ".jpg",
        "filename": "xfqbgaribternxnhaldm.jpg",
        "id": "xfqbgaribternxnhaldm"
    },
    "status": "success"
}
```

### Error Handling

- Check if there is a file
- Check the mime type 
    - png
    - jpeg
    - svg
    - gif  
 
 Check https://www.npmjs.com/package/mime-types to find how deal with.
 
---
 
## Get an image

### Route

`http://localhost:5000/get_file?id={file_id}`

### Method:

**GET**

### With id arg

### Usage

Use this arg if you want to retrieve a list of images

### Example:

```js
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:5000/get_file?id=fqnwvsxcbukxenerxccr", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

### Return Value

```json
{
  "payload": {
    "files": [list of base 64 encoded image]
   }
   "status": "success"
}
```

### Error Handling
 
- If the file id is unknown the base 64 will me null

-----

### With last arg

### Usage

Use this arg if you want the n last images

#### Example:

```js
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:5000/get_file?last=2", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

### Return Value

```json
{
  "payload": {
    "files": [list of base 64 encoded image]
   }
   "status": "success"
}
```

### Error Handling

- Will only send available image
