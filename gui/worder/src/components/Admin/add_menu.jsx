import * as React from 'react';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from "axios";

import Header from '../Common/header';

const style = {
  width: 300,
  height: 150,
  border: "1px dotted #888",
};

function AddMenu() {
  const baseURL = "http://127.0.0.1:8000";
  const [Category, setCategory] = useState('')
  const [menu, setMenu] = useState('')
  const [price, setPrice] = useState('')
  const [view_no, setView_no] = useState('')  
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log('acceptedFiles:', acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
  const InsertMenu = () => {
    console.log(menu)
    console.log(price)    
    axios.put(baseURL + '/menus?category_id=' + Category
                        + '&menu=' + menu
                        + '&price=' + price
                        + '&view_no=' + view_no).then(res =>{
                          if (res.status == 200) {
                            console.log('ステータス:200')
                          }
    })
  }

  return (
    <>
      <Header />
      <h2>メニューの追加 </h2>
      <div><TextField id="outlined-basic" label="カテゴリーID" variant="outlined" onChange={(event) => setCategory(event.target.value)}/></div>
      <div><TextField id="outlined-basic" label="メニュー" variant="outlined" onChange={(event) => setMenu(event.target.value)}/></div>
      <div><TextField id="outlined-basic" label="金額" variant="outlined" onChange={(event) => setPrice(event.target.value)}/></div>
      <div><TextField id="outlined-basic" label="順番" variant="outlined" onChange={(event) => setView_no(event.target.value)}/></div>
      <div><Button /></div>

      <div {...getRootProps()} style={style}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>この画像を追加</p> :
            <p>ここに画像をドラッグ＆ドロップ</p>
        }
      </div>
      <div><Button variant="solid" onClick={InsertMenu}>登録</Button></div>
    </>
  )
}

export default AddMenu;