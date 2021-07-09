import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [aktivitas, setAktivitas] = useState('');
  const [waktu, setWaktu] = useState('');
  const [hari, setHari] = useState('');
  const [aktivitasList, setAktivitasList] = useState([]);
  const [newAktivitas, setNewAktivitas] = useState('');
  const [newWaktu, setNewWaktu] = useState('');
  const [newHari, setNewHari] = useState('');

  useEffect(() => {
    Axios.get("http://localhost:5000/todo/ambil").then((response) => {
      setAktivitasList(response.data);
    })
  }, [])

  const submitData = () => {
    Axios.post("http://localhost:5000/todo/tambah",
      {
        aktivitas: aktivitas,
        waktu: waktu,
        hari: hari
      });
    setAktivitasList([
      ...aktivitasList,
      {
        aktivitas: aktivitas,
        waktu: waktu,
        hari: hari
      },
    ]);
  }

  const deleteData = (id_kegiatan) => {
    Axios.delete(`http://localhost:5000/todo/hapus/${id_kegiatan}`, { id_kegiatan: id_kegiatan })
  }

  const editData = (id_kegiatan) => {
    Axios.patch("http://localhost:5000/todo/edit", {
      id_kegiatan: id_kegiatan,
      aktivitas: newAktivitas,
      waktu: newWaktu,
      hari: newHari

    });
    setNewAktivitas("")
  }
  return (
    <div className="App">
      <div className="form">
        <h1>TODO</h1>
        <label>Aktivitas : </label>
        <input type="text" name="aktivitas" onChange={(e) => { setAktivitas(e.target.value) }} />
        <label>Waktu : </label>
        <input type="date" name="waktu" onChange={(e) => { setWaktu(e.target.value) }} />
        <label>Hari : </label>
        <input type="text" name="hari" onChange={(e) => { setHari(e.target.value) }} />
        <button onClick={submitData}>Kirim</button>
        {aktivitasList.map((val) => {
          return <div className="card">
            <h1>{val.aktivitas}</h1>
            <h3>Tanggal : {val.waktu} | Hari: {val.hari} </h3>
            <button onClick={() => { deleteData(val.id_kegiatan) }}>Delete</button>
            <input type="text" id="updateinput" onChange={(e) => {
              setNewAktivitas(e.target.value)
            }} />
            <input type="date" id="updateinput" onChange={(e) => {
              setNewWaktu(e.target.value)
            }} />
            <input type="text" id="updateinput" onChange={(e) => {
              setNewHari(e.target.value)
            }} />
            <button onClick={() => { editData(val.id_kegiatan) }}>Update</button>
          </div>
        })}
      </div>
    </div>
  );
}

export default App;
