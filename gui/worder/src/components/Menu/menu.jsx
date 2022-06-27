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
      { label: '表示flg', name: 'visible_st' },
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
    sort: false,
    pagination: false
  }

  return (
    <>
      <Header />
      <div style={{ textAlign:"left", width: "100%" }}>
        <MUIDataTable
          title="Menu"
          data={menuData}
          columns={columns}
          options={options}
        />
      </div>
    </>
  )
}

export default About;