import React from 'react';

const UserInput = (props) => {
    return (
        <div className="row mb-3">
            <div className="col-8 col-md-8">
                <div className="form-group">
                    <input value={props.initialInput} placeholder="What do you want to do next?" type="text" onChange={ props.buttonStat } className="form-control"/>
                </div>
            </div>
            <div className="col-4 col-md-4 pl-0">
                <button onClick={ props.addtoList } className="btn btn-primary w-100" disabled={ props.btnState }>Add</button>
            </div>
        </div>
    );
};

export default UserInput;