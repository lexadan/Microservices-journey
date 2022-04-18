import React,{useState} from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Home(){
	const [id, setid] = useState("");
    const  [datarow, setdatarow] = useState([])
	const changeHandler = (event : any) => {
		setid(event.target.files[0]);
	};

    async function  fetchImage()  {
        fetch(id.length > 0 ? 'http://localhost:8081/v1/image/'+ id :  "http://localhost:8081/v1/image/feed/20", {
            headers: new Headers({
                'Authorization': 'Bearer '+cookies.get("token"),
            }),
        }).then(response => {
            response.json().then(value => {
                console.log(value)
                setdatarow(value)
            })
        });
      };

        return(
            <div>You can search an image :
                <input type="text" name="id" value={id}  onChange={(e) => { setid(e.target.value)} } />
                <button onClick={fetchImage}>click to reload or search an image </button>
                <div>
                    {datarow.map((x,i) => {
                        return(
                            <div key={i}>
                                <img src={`data:image/jpeg;base64,${x}`}  alt="" />
                                <br/>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
            
        )
}
