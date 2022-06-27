import * as React from 'react';
import { useState, useEffect } from "react";
import Header from '../Common/header';
import Button from '@mui/material/Button';
import axios from "axios";
import MUIDataTable from "mui-datatables";

function About() {
  const baseURL = "http://127.0.0.1:8000";
  const [menuData, setMenusData] = useState([])
  const [columns, setColumns] = useState()

  useEffect(() => {
    setColumns([
      { label: '料理名', name: 'menu' },
      { label: '値段', name: 'price' },
      { label: '表示flg', name: 'visible_flg' },
      { label: 'カテゴリID', name: 'category_id' }
    ])
    GetMenus()
  }, [])

  const GetMenus = () => {
    axios.get(baseURL + '/menus').then(res => {
      setMenusData(res.data)
      console.log(menuData)
    })
  }

  const options = {
    selectableRowsHeader: false,
    selectableRowsHideCheckboxes: true,
    search: false,
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    sort: false
  }

  return (
    <>
      <Header />
      <MUIDataTable
        title=""
        data={menuData}
        columns={columns}
        options={options}
      />
    </>
  )
}

export default About;