import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import Header from '../Common/header';

const style = {
  width: 300,
  height: 150,
  border: "1px dotted #888",
};

function AddMenu() {

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log('acceptedFiles:', acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
  const InsertMenu = () => {
    console.log('testaa')
    
  }
  return (
    <>
      <Header />
      <h2>メニューの追加 </h2>
      <div><TextField id="outlined-basic" label="メニュー" variant="outlined" /></div>
      <div><TextField id="filled-basic" label="金額" variant="filled" /></div>
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