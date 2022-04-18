import React,{useState} from "react";
interface listImages {
	files : string[];
}

interface data {
	payload: listImages;
	status: string;
}


export default function Home(){
	const [id, setid] = useState("");
    const  [dataresponse, setdataresponse] = useState<data | undefined>()
	const changeHandler = (event : any) => {
		setid(event.target.files[0]);
	};

    async function  fetchImage()  {
        fetch(id.length > 0 ? 'http://localhost:5000/get_file?id='+ id :  "http://localhost:5000/get_file?last=2").then(response => {
            response.json().then(test => {
                setdataresponse(test);
            })
        });
      };

        return(
            <div>You can search an image :
                <input type="text" name="id" value={id}  onChange={(e) => { setid(e.target.value)} } />
                <button onClick={fetchImage}>click to reload or search an image </button>
                {dataresponse?.payload.files.map((x,i) =>
                    <img src={`data:image/jpeg;base64,${x}`} key={i} alt="" />
                )}
            </div>
            
        )
}
