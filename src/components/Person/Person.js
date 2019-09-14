import React from 'react';
import './Person.css';

const Person = (props) => {

  return (
    <>
      <div className="Person">
        <div className="name"><h4>{props.person.name}</h4></div>
        <div className="surname"><h4>{props.person.surname}</h4></div>
        <div className="department"><h4>{props.person.department === "Administracja" ? "Administration" :
          props.person.department === "Handlowiec" ? "Sales" : props.person.department}</h4>
        </div>
        <div className="salary"><h4>{props.person.salary} {props.person.currency}</h4></div>
        <div style={{ clear: "both" }} > </div>
      </div>
    </>
  );
}

export default Person;