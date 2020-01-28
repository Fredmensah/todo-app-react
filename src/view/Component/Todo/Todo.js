import React from 'react';
import Switch from "react-switch";

const todo = (props) => {
    const boxStyle = {
        minHeight: '100px'
    };

    const trashIcon = {
        fontSize: '24px',
        cursor: 'pointer'
    };

    const _handleDelete = id => {
        props._handleDelete(id);
    };

    const _handleSwitch = id => {
        props._handleSwitch(id);
    };

    const _editList = (id , event) => {
       props._editList(id , event);
    };

    return (
        <div style={boxStyle} className="border border-secondary mb-3 rounded">
            {props.todoList.length > 0 ? props.todoList.map((item , index) => <div key={index} className="p-2 m-3 border border-secondary rounded"><div className="col-12 col-md-12"><div className="row"><input autoFocus={item.checked} className="col-7 col-md-8 border-0 bg-white" onChange={_editList.bind(this, item.id)} value={ item.name } disabled={!item.checked} /> <div className="col-4 col-md-3 pl-0"><span className="my-2">Edit</span><Switch onChange={_handleSwitch.bind(this, item.id)} checked={item.checked} /></div><div className="col-1 col-md-1 px-0 text-center"><i onClick={_handleDelete.bind(this, item.id)} className="fa fa-trash my-1" style={trashIcon}></i></div></div> </div></div>) : <div>Items nor dey</div>}
        </div>
    );
};

export default todo;