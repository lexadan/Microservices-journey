import React, {useState} from 'react';

export default function Upload(){
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event : any) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleSubmission = () => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "image/jpeg");

		var file = selectedFile;

		var requestOptions = {
		  method: 'POST',
		  headers: myHeaders,
		  body: file,
		};

		fetch("http://localhost:5000/store_img", requestOptions)
		  .then(response => response.text())
		  .then(result => console.log(result))
		  .catch(error => console.log('error', error));
	};

	return(
        <div>
			<form>
			<input type="file" name="file" onChange={changeHandler} />
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
			</form>
		</div>
	);
}