import * as React from 'react';
import { useState, useEffect } from "react";
import Header from '../Common/header';
import Button from '@mui/material/Button';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
//import CheckIcon from '@mui/icons-material/Check';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

// MUIDataTableを利用する
import MUIDataTable from "mui-datatables";



function About() {
  const baseURL = "http://127.0.0.1:8000";
  const [data, setData] = useState([])
  const [columns, setColumns] = useState()
  useEffect(() => {
    setColumns([{label: 'テーブル', name:'seat'},
                {label: 'メニュー', name:'menu'},             
                {label: '注文時間', name:'created_at'},
                {label: '提供', name:'order_st',options: {
                  customBodyRender: () => {
                    return (
                      <Button variant="solid" onClick={GetOrder}><ShoppingCartCheckoutIcon/></Button>
                    );
                  }
                }},
                {label: 'キャンセル', name:'order_st',options: {
                  customBodyRender: () => {
                    return (
                      <Button variant="solid" onClick={GetOrder}><DeleteIcon/></Button>
                    );
                  }
                }}
              ]) 
    GetOrder()
  },[])

  const GetOrder = () =>{
    console.log('test');
    axios.get(baseURL + '/orders').then(res =>{
      setData(res.data)
      console.log(res.data)

    })
  }

  const options = {
    selectableRowsHeader: false,
    selectableRowsHideCheckboxes:true,
    search:false,
    download:false,
    print:false,
    viewColumns:false,
    filter:false, 
    sort: false
  }

  return (
  <>
  <Header />
  <MUIDataTable
        title=""
        data={data}
        columns={columns}
        options={options}
      />
  <div><Button variant="solid" onClick={GetOrder}>更新</Button></div>
  </>
  )
}

export default About;