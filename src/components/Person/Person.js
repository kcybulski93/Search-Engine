import React from 'react';
import './Person.css';

const Person = (props) => {

  return (
    <>
      <div className="Person">
        <div className="name">{props.person.name}</div>
        <div className="surname">{props.person.surname}</div>
        <div className="department">{props.person.department === "Administracja" ? "Administration" :
          props.person.department === "Handlowiec" ? "Sales" : props.person.department}
        </div>
        <div className="salary">{props.person.salary} {props.person.currency}</div>
        <div style={{ clear: "both" }} > </div>
      </div>
    </>
  );
}

export default Person;