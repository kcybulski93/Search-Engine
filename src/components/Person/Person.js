import React from 'react';
import './Person.css';

const Person = (props) => {

  return (
    <>
      <div className="Person">
        <div className="name">{props.person.imie}</div>
        <div className="surname">{props.person.nazwisko}</div>
        <div className="department">{props.person.dzial}</div>
        <div className="salary">{props.person.wynagrodzenieKwota} {props.person.wynagrodzenieWaluta}</div>
        <div style={{ clear: "both" }} > </div>
      </div>
    </>
  );
}

export default Person;