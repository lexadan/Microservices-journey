import { Axios } from "axios";
import React, { Component } from "react";
import axios from "axios";
class Home  extends React.Component<{}, { value: string }>{

    constructor(props : any) {
        super(props)
        this.state = {value: "test"}
    }

    componentDidMount(): void {
        axios.create({
            baseURL: 'http://localhost:5000'
        }).get("get_file?id=qmbgxhakvuhlxitvseuy", {
        })
            .then(response => {
                this.setState({value: response.status.toString()})
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() : JSX.Element {
        return(
            <div> En attente de reception des image{this.state.value} </div>
        )
    }
}

export default Home;