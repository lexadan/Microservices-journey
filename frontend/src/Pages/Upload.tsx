import React, {useState} from 'react';
import Cookies from 'universal-cookie';

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
		const cookies =  new Cookies();
		var requestOptions = {
		  method: "POST",
		  headers: new Headers({
			'Authorization': 'Bearer '+ cookies.get("token"), 
			'Content-Type': 'image/jpeg'
		}),
		  body: file,
		};
		fetch("http://localhost:8081/v1/image/add", requestOptions)
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