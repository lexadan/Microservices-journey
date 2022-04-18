import React, {useState} from 'react';
import Cookies from 'universal-cookie';

interface information {
	photoId : string,
	userId : string,
	_id : string,
	__v : string 

}

export default function Upload(){
	const [selectedFile, setSelectedFile] = useState();
	const [information, setinformation] = useState<information | undefined>();
	const changeHandler = (event : any) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleSubmission = (event : any) => {
		event.preventDefault();
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
		  .then(response => response.json())
		  .then(result => setinformation(result))
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
			
			{
				information?.userId ? <div> Id of your album: {information.userId} </div> : <div></div>
				}
			{
				information?.photoId ? <div> Id of the photo: {information.photoId} </div> : <div></div>
			}
		</div>
	);
}