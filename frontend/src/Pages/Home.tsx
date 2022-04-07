import React from "react";
class Home  extends React.Component<{}, { image: string, id:string }>{

    constructor(props : any) {
        super(props)
        this.state = {image: "", id: ""}
    }
    
    async fetchImage() {
        const res = await fetch('http://localhost:5000/get_file?id=qmbgxhakvuhlxitvseuy'/*+ this.state.id*/);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        this.setState({image: imageObjectURL})
      };

    render() : JSX.Element {
        return(
            <div> En attente de reception des image 
                    <input type="id" name="id" value={this.state.id}  onChange={(e) => { this.setState({id:  e.target.value})} } />
                    <button onClick={this.fetchImage}>On Click</button>
                <img src={this.state.image} alt=""/>


            </div>
            
        )
    }
}

export default Home;