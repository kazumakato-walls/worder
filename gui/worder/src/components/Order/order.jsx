import * as React from 'react';
import { useState, useEffect } from "react";
import Header from '../Common/header';
import Button from '@mui/material/Button';
import axios from "axios";

// MUIDataTableを利用する
import MUIDataTable from "mui-datatables";



function About() {
  const baseURL = "http://127.0.0.1:8000";
  const [data, setData] = useState([])
  const [columns, setColumns] = useState()
  useEffect(() => {
    setColumns([{label: 'テーブル', name:'seat'},
                {label: 'メニュー', name:'menu'},                
                {label: '注文時間', name:'created_at'}])    
    GetOrder()
  },[])

  const GetOrder = () =>{
    console.log('test');
    axios.get(baseURL + '/orders').then(res =>{
      setData(res.data)
      console.log(res.data)

    })

  }
  return (
  <>
  <Header />
  <MUIDataTable
        title=""
        data={data}
        columns={columns}
      />
  <div><Button variant="solid" onClick={GetOrder}>更新</Button></div>
  </>
  )
}

export default About;