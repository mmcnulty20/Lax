import React, { Component } from "react";
import UserSearchList from "./user_search_list";

class UserSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchString: "",
        }

        this.onInputChange = this.onInputChange.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
    }

    onInputChange(e){
        console.log(e.target)
        this.setState({ searchString: e.target.value })
    }

    filterUsers(){
        return this.props.users.filter( user => {
            const search = this.state.searchString.toLowerCase();
            return user.username.toLowerCase().includes(search) ||
                user.email.toLowerCase().includes(search)
        } ).sort()
    }

    handleBlur(e){
        e.target.className = e.target.className.split(" ").filter( c => c !== "focus-blue" ).join(" ");
        this.setState({ searchString: "" })
    }


    render(){
        return(
            <UserSearchList
                click={ this.props.handleSearchClick }
                focus={ this.props.focus }
                blur={ this.handleBlur }
                filtered={ this.filterUsers() }
                onInputChange={ this.onInputChange }
                inputValue={ this.state.searchString } />
        )
    }
}

export default UserSearch;