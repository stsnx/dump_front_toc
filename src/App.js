import './App.css';
import { Button } from "@material-tailwind/react";
import { useState, FormEvent } from 'react';
import { saveAs } from 'file-saver';
import axios from 'axios';

function App() {
  const [province,setProvince] = useState([])
  const [response, setResponse] = useState(null);
  const provinceTypeForm = {
    ROY: false,
    RAN: false,
    RAY: false,
    YAL: false,
 };
 const sendForm = async (e) => {
  e.preventDefault();
  const prov = []
  for(var key in provinceTypeForm){
    console.log(key)
    if (provinceTypeForm[key])
      prov.push(key)
  }
  const jason = JSON.stringify({
      responseType: 'blob',
      body: prov,
  });
  
  
  console.log(jason);
  console.log(prov);
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/gettemple',jason);
    console.log(response.data)
    const url = window.URL.createObjectURL(new Blob([`\ufeff${response.data}`], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    let name_for_file = "list_temple_of_"+prov.join('_')+'.csv'
    link.setAttribute('download', name_for_file);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error(error);
  }
  };
const clickall = async() =>{
  const prov = []
  for(var key in provinceTypeForm){
    prov.push(key)
    const jason = JSON.stringify({
      responseType: 'blob',
      body: prov,
  });
  console.log(jason);
  console.log(prov);
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/gettemple',jason);
    console.log(response.data)
    const url = window.URL.createObjectURL(new Blob([`\ufeff${response.data}`], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    let name_for_file = "list_temple_of_"+prov.join('_')+'.csv'
    link.setAttribute('download', name_for_file);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error(error);
  }
  }
  const jason = JSON.stringify({
      body: prov,
  });
  
  
  console.log(jason);
  console.log(prov);
  }
  return (
    <div className="App">
      <form
            className="md:text-lg sm:text-sm text-sm"
            onSubmit={(e) => {
              sendForm(e);
            }}
      >
       <div className="py-2 truncate">
          <label>
            <input
                type="checkbox"
                id="ROY"
                onChange={(event) => {
                    provinceTypeForm.ROY = event.target.checked
                }}
                  className=" md:w-4 md:h-4w-3 h-3 pt-2"
              />
              <a className="px-2">ร้อยเอ็ด</a>
            </label>
            <a className="sm:hidden">
              <br />
            </a>
            <label>
            <input
                type="checkbox"
                id="RAN"
                onChange={(event) => {
                  provinceTypeForm.RAN = event.target.checked
                }}
                  className=" md:w-4 md:h-4w-3 h-3 pt-2"
              />
              <a className="px-2">ระนอง</a>
            </label>
            <a className="sm:hidden">
              <br />
            </a>
            <label>
            <input
                type="checkbox"
                id="RAY"
                onChange={(event) => {
                  provinceTypeForm.RAY = event.target.checked
                }}
                  className=" md:w-4 md:h-4w-3 h-3 pt-2"
              />
              <a className="px-2">ระยอง</a>
            </label>
            <a className="sm:hidden">
              <br />
            </a>
            <label>
            <input
                type="checkbox"
                id="YAL"
                onChange={(event) => {
                  provinceTypeForm.YAL = event.target.checked
                }}
                  className=" md:w-4 md:h-4w-3 h-3 pt-2"
              />
              <a className="px-2">ยะลา</a>
            </label>
            <a className="sm:hidden">
              <br />
            </a>
        </div>
        <div className="py-2 flex justify-end">
              <a className="px-2 " href="">
                <button
                  type="submit"
                  className="md:w-20 w-16 text-sm text-white py-2 rounded-lg border-0 bg-gray-300 hover:bg-red-400"
                >
                  ยืนยัน
                </button>
              </a>
            </div>
      </form>
      <div>
      <Button onClick={clickall}>เอาหมด </Button>
      </div>              
    </div>
  );
}

export default App;
