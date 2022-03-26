import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

const URL = 'https://jsonplaceholder.typicode.com/users';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Table = () => {
  const [loading, setLoading] = useState(true);
  const [mockData, setMockData] = useState([]);
  const [CopyData, setCopyData] = useState([]);
  let [color, setColor] = useState('#ffffff');
  const [error, setError] = useState('');
  console.log(error,"19")
  console.log(mockData.length, '10');
  console.log(CopyData, '11');
  const FetchData = () => {
    try {
      axios.get(URL).then((res) => {
        setMockData(res.data), setCopyData(res.data);
      });
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
   setTimeout(()=>{
    FetchData();
   },3000)
  }, []);
  
  const Handlechange=(e)=>{
    console.log(e.target.value)
    let filter=CopyData.filter(obj=>Object.keys(obj).some(key=>obj[key].toString().toLocaleLowerCase().includes(e.target.value)))
    setMockData(filter)
    console.log(filter)
  }

  if (loading) {
    return (
      <ClipLoader color={color} loading={loading} css={override} size={50} />
    );
  }
  return (
    <>{
      mockData.length>0 ?
      <>
      <input type="text" onChange={Handlechange
      }/>
      <table border="2" width="300">
        <thead>
          <th>ID</th>
          <th>NAME</th>
          <th>Email</th>
          <th>City</th>
          <th>Strret</th>
          {mockData.map((items) => {
            return <tr>
                <td>{items.id}</td>
                <td>{items.name}</td>
                <td>{items.email}</td>
                <td>{items.address.city}</td>
                <td>{items.address.street}</td>
            </tr>;
          })}
        </thead>
      </table>
      </>
:<h1>Something went wrong--</h1>}
    </>
  );
};

export default Table;
