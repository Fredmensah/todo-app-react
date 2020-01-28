import React, {Component} from 'react';
import './App.css';

/*Other components for the APP...*/
import Todo from '../Component/Todo/Todo';
import UserInput from "../Component/UserInput/UserInput";

class App extends Component{
    setTodoList = () => {
        return localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : [];
    };

    state = {
        todoList: this.setTodoList(),
        btnState: true,
        inputText: ''
    };

    onChangeInputHandler = (event) => {
        this.setState({
            inputText: event.target.value
        });
        return event.target.value.length > 2 ? this.setState( {btnState: false} ) : this.setState( {btnState: true} );
    };

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
            inputText: ''
        });
    };

    deleteTodoList = itemId => {
        let old_list = this.state.todoList;

        const result = old_list.filter(item => item.id !== itemId);

        localStorage.setItem('todoList' , JSON.stringify(result));

        this.setState({
            todoList: this.setTodoList(),
            inputText: ''
        });
    };

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

    //changeButtonState = () => this.setState( {btnState: false} );

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
