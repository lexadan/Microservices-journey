import {useState} from "react";
import Cookies from 'universal-cookie';
import Select from 'react-select'

const options = [
    { value: 'image', label: 'Specific image' },
    { value: 'album', label: 'Specific album' }
  ]
  
const cookies = new Cookies();

export default function Home(){
	const [id, setid] = useState("");
    const  [datarow, setdatarow] = useState([])
    const [specificSearch, setspecificSearch] = useState("image")

    async function  fetchImage()  {
        fetch(id.length > 0 ? (specificSearch === "image" ? 'http://localhost:8081/v1/image/'+ id : "http://localhost:8081/v1/image/all/") :  "http://localhost:8081/v1/image/feed/20", {
            headers: new Headers({
                'Authorization': 'Bearer '+cookies.get("token"),
            }),
        }).then(response => {
            response.json().then(value => {
                setdatarow(value)
            })
        });
      };

        return(
            <div>You can search an image :
                <input type="text" name="id" value={id}  onChange={(e) => { setid(e.target.value)} } />
                <Select options={options} defaultValue={options[0]} onChange={(e) => setspecificSearch(e ? e?.value : "image")} />
                <button onClick={fetchImage}>click to reload or search an image </button>
                <div>
                    {datarow.map((x,i) => {
                        if (x !== null && x !== "null") {
                            return(
                                <div key={i}>
                                    <img src={`data:image/jpeg;base64,${x}`}  alt="" />
                                    <br/>
                                </div>
                            )
                        } else {
                            return(<></>)
                        }
                    }
                    )}
                </div>
            </div>
            
        )
}
