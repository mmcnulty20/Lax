import React, { Component } from "react";
import UserSearchList from "./user_search_list";

class UserSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchString: "",
            focused: false,
        }

        this.onInputChange = this.onInputChange.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.handleFocus = this.handleFocus.bind(this)
    }

    onInputChange(e){
        this.setState({ searchString: e.target.value })
    }

    filterUsers(){
        const search = this.state.searchString.toLowerCase();
        return this.props.users.filter( user => {
            return user.username.toLowerCase().includes(search) ||
                user.email.toLowerCase().includes(search)
        } ).sort()
    }

    handleBlur(e){
        e.persist();
        this.timeout = setTimeout( () => {
            const id = e.target.id
            const focus = this.state.focused
            if ( focus ) {
                this.setState({ focused: false, searchString: ""})
            }         
        },0)
    }

    handleFocus(e){
        e.persist();
        clearTimeout(this.timeout);
        if ( this.state.focused !== e.target.id ) {
            this.setState({ focused: e.target.id })
            this.props.focus(e)
        }
    }


    render(){
        return(
            <UserSearchList
                members={ this.props.members }
                height={ this.props.height }
                focused={ this.state.focused  }
                focus={ this.handleFocus }
                blur={ this.handleBlur }
                filtered={ this.filterUsers() }
                onInputChange={ this.onInputChange }
                inputValue={ this.state.searchString } />
        )
    }
}

export default UserSearch;