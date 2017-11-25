/**
 * Created by gathika on 11/25/17.
 */
import React, { Component } from 'react';
import style from './style';
import axios from 'axios';

class HaltForm extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', price: '' };
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleBalanceChange = this.handleBalanceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleIdChange(e) {
        console.log("eeeee",e.target.value);
        this.setState({ name: e.target.value });
    }
    handleBalanceChange(e) {
        this.setState({ price: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        let name = this.state.name;
        let price = this.state.price;
        if (!name || !price) {
            return;
        }
        console.log("awe",name);
        axios.post('http://localhost:3001/api/halts',{name:name,price:price})
        //this.props.onCommentSubmit({ author: author, text: text });
        this.setState({ name: '', price: 0 });
    }
    render() {
        return (
            <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
                <input
                    type='text'
                    placeholder='Halt name'
                    style={ style.commentFormAuthor}
                    value={ this.state.name }
                    onChange={ this.handleIdChange } />
                <input
                    type='text'
                    placeholder='Ticket Price'
                    style={ style.commentFormText}
                    value={ this.state.price }
                    onChange={ this.handleBalanceChange } />
                <input
                    type='submit'
                    style={ style.commentFormPost }
                    value='Post'/>
            </form>
        )
    }
}

export default HaltForm;