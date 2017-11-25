import React, {Component} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import axios from 'axios';


class TravelForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inHalt: 'Kaduwela', outHalt: 'Kollupitiya', outPrice: 0, inPrice: 0, identification: '', balance: 0,
            idUrl: "http://localhost:3001/api/cards/", data: [], res: 'a', validCard: false, validBalance: false,
            submited: false,remainingBalance:0,travelCost:0,finished:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleCheckOutChange = this.handleCheckOutChange.bind(this);
        this.validateIdFromServer = this.validateIdFromServer.bind(this);
        this.calculatePriceFromServer = this.calculatePriceFromServer.bind(this);
    }

    validateIdFromServer = (event) => {
        console.log("asder")
        this.setState({submited: true});
        axios.get("http://localhost:3001/api/cards/" + this.state.identification)
            .then(res => {
                //this.setState({ data: res.data });
                console.log(res.data);
                if (res.data[0] == undefined) {
                    console.log("as")
                    this.setState({validCard: false});
                } else {
                    //this.setState({data:res.data[0]})
                    console.log("asasas")
                    this.setState({validCard: true});
                    this.setState({balance: res.data[0].balance});
                    console.log(this.state.balance);
                    if (this.state.balance >= 100) {
                        this.setState({validBalance: true});
                    }
                    console.log("baance", this.state.validBalance)
                }
            })
    }

    calculatePriceFromServer = (event) => {
        console.log("asder")
        this.setState({submited: true});
        console.log(this.state.inHalt)
        axios.get("http://localhost:3001/api/halts/" + this.state.inHalt)
            .then(res => {
                //this.setState({ data: res.data });
                console.log(res.data);
                this.state.inPrice=res.data[0].price;
                if(res.data[0]==undefined){
                    console.log("error")

                }else{
                    console.log(this.state.outHalt);
                    axios.get("http://localhost:3001/api/halts/" + this.state.outHalt).then(
                        res2=> {
                            console.log(res2.data);
                            this.setState({outPrice:res2.data[0].price});
                            console.log("bbbb")
                            console.log(this.state.inPrice);
                            console.log(this.state.outPrice);

                            this.state.outPrice = this.state.outPrice;
                            if (this.state.outPrice >= this.state.inPrice) {
                                console.log("hhttt");
                                this.state.travelCost = this.state.outPrice - this.state.inPrice;
                                this.state.remainingBalance = this.state.balance - this.state.travelCost;
                                this.state.finished =true;

                            }
                            else {
                                this.state.travelCost = this.state.inPrice - this.state.outPrice;
                                this.state.remainingBalance = this.state.balance - this.state.travelCost;
                                this.state.finished=true;
                            }
                        }
                    )
                }
                /*if (res.data[0] == undefined) {
                    console.log("as")
                    this.setState({validCard: false});
                } else {
                    //this.setState({data:res.data[0]})
                    console.log("asasas")
                    this.setState({validCard: true});
                    this.setState({balance: res.data[0].balance});
                    console.log(this.state.balance);
                    if (this.state.balance >= 100) {
                        this.setState({validBalance: true});
                    }
                    console.log("baance", this.state.validBalance)
                }*/
            })
    }

    handleChange = (selectedInHalt) => {
        this.setState({inHalt: selectedInHalt});

    }

    handleCheckOutChange = (selectedOutHalt) => {
        console.log(selectedOutHalt);
        this.setState({outHalt: selectedOutHalt.value});
        console.log("asasaaaa",this.state.outHalt);

    }

    handleIdChange = (id) => {
        this.setState({identification: id.target.value});
    }


    render() {
        if(this.state.finished){
            return(
                <div>
                    <h2>Your journey ends</h2>
                    <h3>From: {this.state.inHalt}</h3>
                    <h3>To: {this.state.outHalt}</h3>
                    <h3>Cost : {this.state.travelCost} </h3>
                    <h3>Remaining Balance : {this.state.remainingBalance}</h3>
                </div>
            )
        }
        else if (!this.state.validCard && !this.state.submited) {
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
                        <textarea value={this.state.identification} onChange={this.handleIdChange}/>
                    </label>
                    <input type="submit" value="Submit" onClick={this.validateIdFromServer}/>


                </div>
            );
        } else {
            if (this.state.submited && !this.state.validCard) {
                return(
                <div>

                    <div className="col-md-7 col-md-offset-3">
                        <h1> Welcome To Travel Card</h1>
                    </div>
                    <div>
                        <h2>card is invalid</h2>
                    </div>

                    <div className="col-md-4">
                        <Select
                            name="form-field-name"
                            value={this.state.inHalt}
                            onChange={this.handleChange}
                            options={[
                                {value: 'Kaduwela', label: 'Kaduwela'},
                                {value: 'Malabe', label: 'Malabe'},
                                {value: 'Battaramulla', label: 'Battaramulla'},
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
                    <input type="submit" value="Check In" onClick={this.validateIdFromServer}/>


                </div>
                )
            }else {
                return (
                    <div>
                        <h2>you are eligible to the journey</h2>
                        <h2></h2>
                        <h2>card id :{this.state.identification}</h2>
                        <h2></h2>
                        <h2>balance:Rs.+{this.state.balance}</h2>
                        <h2></h2>

                        <h3> Checkout Location:</h3>
                        <div className="col-md-4">
                            <Select
                                name="form-field-checkout"
                                value={this.state.outHalt}
                                onChange={this.handleCheckOutChange}
                                options={[
                                    {value: 'Kaduwela', label: 'Kaduwela'},
                                    {value: 'Malabe', label: 'Malabe'},
                                    {value: 'Battaramulla', label: 'Battaramulla'},
                                    {value: 'Rajagiriya', label: 'Rajagiriya'},
                                    {value: 'Borella', label: 'Borella'},
                                    {value: 'Kollupitiya', label: 'Kollupitiya'},
                                ]}
                            />
                        </div>
                        <input type="submit" value="Check Out" onClick={this.calculatePriceFromServer}/>

                    </div>

                )
            }
        }
    }
}

export default TravelForm;
