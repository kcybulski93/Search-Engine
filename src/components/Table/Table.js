import React from 'react';
import './Table.css';
import Person from '../Person/Person';


const Table = (props) => {

  const staff = props.staff.map(person => <Person key={person.id} person={person} />)

  return (
    <>
      <div className="Table">
        <div className="header">
          <div className="name">NAME</div>
          <div className="surname">SURNAME</div>
          <div className="department">DEPARTMENT</div>
          <div className="salary">SALARY</div>
        </div>
        {staff}
      </div>
    </>
  );
}

export default Table;
