import React, {Component} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import axios from 'axios';



class TravelForm extends Component {

    constructor(props) {
        super(props);
        this.state = { inHalt: 'Kaduwela', outHalt: '',outPrice:0,inPrice:0, identification:'',balance:0,
        idUrl:"http://localhost:3001/api/cards/",data:[], res:'a',validCard:false,validBalance:false,
        submited:false};
        this.handleChange = this.handleChange.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.validateIdFromServer=this.validateIdFromServer.bind(this);
    }

    validateIdFromServer=(event) =>{
        console.log("asder")
        this.setState({submited: true});
        axios.get("http://localhost:3001/api/cards/"+this.state.identification)
            .then(res => {
                //this.setState({ data: res.data });
                console.log(res.data);
                if(res.data[0]==undefined){
                    console.log("as")
                    this.setState({validCard:false});
                }else {
                    //this.setState({data:res.data[0]})
                    console.log("asasas")
                    this.setState({validCard: true});
                    this.setState({balance: res.data[0].balance});
                    console.log(this.state.balance);
                    if(this.state.balance>=100){
                        this.setState({validBalance: true});
                    }
                    console.log("baance",this.state.validBalance)
                }
            })
    }

    handleChange = (selectedInHalt) => {
        this.setState({ inHalt:selectedInHalt });
        console.log(`Selected: ${selectedInHalta.label}`);
    }

    handleIdChange = (id)=>{
        this.setState({identification:id.target.value});
    }


    render() {
        if(!this.state.validCard && !this.state.submited) {
            return (
                <div>
                    <div className="col-md-7 col-md-offset-3">
                        <h1> Welcome To Travel Card</h1>
                    </div>

                    <div className="col-md-4">
                        <Select
                            name="form-field-name"
                            value={this.state.inHalt}
                            onChange={this.handleChange}
                            options={[
                                {value: 'Kaduwela', label: 'Kaduwela'},
                                {value: 'Malabe', label: 'Malabe'},
                                {value: 'Bataramulla', label: 'Battaramulla'},
                                {value: 'Rajagiriya', label: 'Rajagiriya'},
                                {value: 'Borella', label: 'Borella'},
                                {value: 'Kollupitiya', label: 'Kollupitiya'},
                            ]}
                        />
                    </div>

                    <div>
                        <br></br>
                        <p>Enter Your Card:</p>
                    </div>


                    <label>
                        Name:
                        <textarea value={this.state.identification} onChange={this.handleIdChange}/>
                    </label>
                    <input type="submit" value="Submit" onClick={this.validateIdFromServer}/>


                </div>
            );
        }else{
            if(this.state.submited && !this.state.validCard){
                <div>
                    <h2>card is invalid</h2>
                </div>
            }
            return(
                <div>
                <h1>card is valid</h1>
                </div>
            )
        }
    }
}

export default TravelForm;
