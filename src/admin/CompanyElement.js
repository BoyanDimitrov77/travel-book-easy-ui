import React from 'react';
import { Badge, ListGroupItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom'

const CompanyElement = (props) =>{

  return (
    <tr>
      <th scope="row">{props.idx +1}</th>
      <td>{props.company.name}</td>
      <td>
      <Link to={'/admin/edit/company/' + props.company.id}>
        <Button color="success">Edit</Button>
      </Link>
      </td>
    </tr>
  )

}

export default CompanyElement;
