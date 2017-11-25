/**
 * Created by gathika on 11/24/17.
 */
import React, { Component } from 'react';
import style from './style';
import axios from 'axios';

class CardForm extends Component {
    constructor(props) {
        super(props);
        this.state = { identification: '', balance: '' };
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleBalanceChange = this.handleBalanceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleIdChange(e) {
        console.log("eeeee",e.target.value);
        this.setState({ identification: e.target.value });
    }
    handleBalanceChange(e) {
        this.setState({ balance: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        let identification = this.state.identification;
        let balance = this.state.balance;
        if (!identification || !balance) {
            return;
        }
        console.log("awe",identification);
        axios.post('http://localhost:3001/api/cards',{identification:identification,balance:balance})
        //this.props.onCommentSubmit({ author: author, text: text });
        this.setState({ identification: '', balance: 0 });
    }
    render() {
        return (
            <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
                <input
                    type='text'
                    placeholder='Identification'
                    style={ style.commentFormAuthor}
                    value={ this.state.identification }
                    onChange={ this.handleIdChange } />
                <input
                    type='text'
                    placeholder='Balance'
                    style={ style.commentFormText}
                    value={ this.state.balance }
                    onChange={ this.handleBalanceChange } />
                <input
                    type='submit'
                    style={ style.commentFormPost }
                    value='Post'/>
            </form>
        )
    }
}

export default CardForm;
