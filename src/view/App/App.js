import React, {Component} from 'react';
import './App.css';

/*Other components for the APP...*/
import Todo from '../Component/Todo/Todo';
import UserInput from "../Component/UserInput/UserInput";

class App extends Component{
    //Get todo list from localStorage...
    setTodoList = () => {
        return localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : [];
    };

    //Set initial state for the APP container..
    state = {
        todoList: this.setTodoList(),
        btnState: true,
        inputText: ''
    };

    /*Onchange of input box...
    * 1. Check if text is > 2
    * 2. Activate button if true
    * 3. Disable if false...
    * */
    onChangeInputHandler = (event) => {
        this.setState({
            inputText: event.target.value
        });
        return event.target.value.length > 2 ? this.setState( {btnState: false} ) : this.setState( {btnState: true} );
    };

    /*
    * Add a new list to the todos..
    * Reset the localStorage data...
    * */
    addTodoList = () => {
        let old_list = this.state.todoList;

        let item = {
            id: (this.state.todoList.length + 1),
            name: this.state.inputText,
            checked: false
        };

        (old_list).push(item);
        localStorage.setItem('todoList' , JSON.stringify(old_list));

        this.setState({
            todoList: this.setTodoList(),
            inputText: '',
            btnState: true
        });
    };

    /*
    * Delete a todo item and reset the localStorage...
    * */
    deleteTodoList = itemId => {
        let old_list = [...this.state.todoList];

        const result = old_list.filter(item => item.id !== itemId);

        localStorage.setItem('todoList' , JSON.stringify(result));

        this.setState({
            todoList: this.setTodoList(),
            inputText: ''
        });
    };

    /*
    * Change the switch handler for a todo item...
    * This updates the list and set value to true
    * */
    changeSwitchHandler = itemId => {
        let old_list = this.state.todoList;

        //Find index of specific object using findIndex method.
        let objIndex = old_list.findIndex((obj => obj.id === itemId));

        //Update object's name property.
        old_list[objIndex].checked = !old_list[objIndex].checked;

        localStorage.setItem('todoList' , JSON.stringify(old_list));

        this.setState({
            todoList: this.setTodoList(),
            inputText: ''
        });
    };

    /*
    * Edit an item...
    * Pass item id and event
    * */
    editItemHandler = (itemId , event) => {
        let old_list = this.state.todoList;

        //Find index of specific object using findIndex method.
        let objIndex = old_list.findIndex((obj => obj.id === itemId));

        //Update object's name property.
        old_list[objIndex].name = event.target.value;

        localStorage.setItem('todoList' , JSON.stringify(old_list));

        this.setState({
            todoList: this.setTodoList(),
            inputText: ''
        });
    };

    render(){
        return (
            <div className="container px-3 mt-5">
                <UserInput initialInput={this.state.inputText} addtoList={ this.addTodoList } btnState={ this.state.btnState } buttonStat={ this.onChangeInputHandler } />
                <Todo _editList={this.editItemHandler.bind(this)} _handleSwitch={this.changeSwitchHandler.bind(this)} _handleDelete={this.deleteTodoList.bind(this)} todoList={ this.state.todoList } />
            </div>
        );
    }
}

export default App;
