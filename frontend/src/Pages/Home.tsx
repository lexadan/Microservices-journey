import React,{useState} from "react";


export default function Home(){
	const [id, setid] = useState("");
	const [url, seturl] = useState("");

	const changeHandler = (event : any) => {
		setid(event.target.files[0]);
	};

    async function  fetchImage()  {
        const res = await fetch('http://localhost:5000/get_file?id='+ id);
        const imageBlob = await res.blob();
        seturl(URL.createObjectURL(imageBlob))
      };

        
        return(
            <div> En attente de reception des image
                
                    <input type="text" name="id" value={id}  onChange={(e) => { setid(e.target.value)} } />
                    <button onClick={fetchImage}>click </button>
                <img src={url} alt=""/>


            </div>
            
        )
}
