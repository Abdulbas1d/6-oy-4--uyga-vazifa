import React, { useEffect, useState } from 'react'
import './App.css'
import logoPicture from './assets/images/logo-picture.svg'
import circlePicture from './assets/images/circle.svg'
import mapPicture from './assets/images/map.svg'
import instagramPicture from './assets/images/instagram.svg'
import telegramPicture from './assets/images/telegram.svg'
import faseBookPicture from './assets/images/fasebook.svg'
import gitHubPicture from './assets/images/github.svg'

function App() {
  const [picture, setPicture] = useState(null)
  const [form, setForm] = useState({})
  const [users, setUsers] = useState([])

  function validate(data) {
    if (data.companyName.length < 3 && /^\d/.test(companyName)) {
      alert("Kompaniya nomi kamida 3 ta harfdan iborat bo'lishi kerak");
      return false;
    }

    if (!data.email) {
      alert("Email addressni noto'g'ri kitingiz iltimos qayta urinib ko'rin")
      return false
    }

    if (data.phone.length < 8) {
      alert("Telefon raqamni noto'g'ri kitingiz iltimos qayta urinib ko'rin")
      return false
    }

    if (data.country.length < 4) {
      alert("Davlatni noto'g'ri kitingiz iltimos qayta urinib ko'rin")
      return false
    }

    if (data.city.length < 3) {
      alert("Shaharni noto'g'ri kitingiz iltimos qayta urinib ko'rin")
      return false
    }

    if (data.location.length < 4) {
      alert("Addressingiz noto'g'ri kitingiz iltimos qayta urinib ko'rin")
      return false
    }

    if (data.staff.length <= 1) {
      alert("Hodimlar sonini noto'g'ri kitingiz iltimos qayta urinib ko'rin")
      return false
    }

    return true
  }

  return (
    <div className='container'>
      <header className="header header_container">
        <img src={logoPicture} alt="" />
        <div className="data">
          <a href="#">Vakansiyalar</a>
          <a href="#">Kandidatlar</a>
          <a href="#">Kompaniyalar</a>
          <a href="#">Xizmatlar</a>
          <a href="#">Ta’lim</a>
        </div>
        <select className="select">
          <option value="O'zb">O'zb</option>
          <option value="Eng">Eng</option>
          <option value="Rus">Rus</option>
        </select>
        <button className="btn">Boshlash</button>
      </header>

      <form className="form" onSubmit={(e) => {
        e.preventDefault();
        const formInformation = new FormData(e.target);
        const formObject = Object.fromEntries(formInformation.entries());

        const isValid = validate(formObject);
        if (!isValid) {
          return;
        }

        const pictures = { ...formObject, picture };
        setUsers((prevUsers) => [...prevUsers, pictures]);

        setForm({});
        setPicture(null);
        e.target.reset();
      }}>
        <h1>Kompaniya ma’lumotlari</h1>
        <h4>Kompaniya haqidagi ma’lumotlarni kiriting</h4>
        <div className="forPicture">
          <img src={circlePicture} alt="" />
          <label>
            Yuklash
            <input type="file" onChange={(e) => {
              const image = e.target.files[0]
              if (image) {
                const imageUrl = URL.createObjectURL(image)
                setPicture(imageUrl)
                setForm((prev) => ({ ...prev, picture: imageUrl }))
              }
            }} />
          </label>
        </div>

        <div className="informations">
          <label>Kompaniya nomi <span>*</span></label>
          <input type="text" name='companyName' placeholder='Kompaniya nomi' />

          <label>Email <span>*</span></label>
          <input type="email" name='email' placeholder='Email' />

          <label>Telefon raqami <span>*</span></label>
          <input type="tel" name='phone' placeholder='UZ +9989' />
        </div>

        <div className="links">
          <label>Linklar <span>*</span></label>
          <div className="buttons">
            <button>
              <img src={mapPicture} alt="" />
            </button>
            <button>
              <img src={instagramPicture} alt="" />
            </button>
            <button>
              <img src={telegramPicture} alt="" />
            </button>
            <button>
              <img src={faseBookPicture} alt="" />
            </button>
            <button>
              <img src={gitHubPicture} alt="" />
            </button>
          </div>
        </div>

        <div className="dataAddress">
          <div className="city">
            <div className="city-one">
              <label>Davlat <span>*</span></label>
              <select name='country'>
                <option value="Davlat">Davlat</option>
                <option value="Amerika">Amerika</option>
                <option value="Rassiya">Rassiya</option>
                <option value="London">London</option>
                <option value="Polsha">Polsha</option>
                <option value="Germaniya">Germaniya</option>
                <option value="Fransiya">Fransiya</option>
                <option value="O'zbekiston">O'zbekiston</option>
              </select>
            </div>

            <div className="city-one">
              <label>Shahar <span>*</span></label>
              <select name='city'>
                <option value="Shahar">Shahar</option>
                <option value="Andijon">Andijon</option>
                <option value="Namangan">Namangan</option>
                <option value="Farg'ona">Farg'ona</option>
                <option value="Qoqon">Qoqon</option>
                <option value="Samarqand">Samarqand</option>
                <option value="Nukus">Nukus</option>
                <option value="Buxoro">Buxoro</option>
                <option value="Toshkent">Toshkent</option>
              </select>
            </div>
          </div>

          <label>Yashash joyi <span>*</span></label>
          <input type="text" name='location' placeholder='Joy' />

          <label>Hodimlar soni <span>*</span></label>
          <input type="number" name='staff' placeholder='Hodimlar soni' />

          <label>Izoh <span>*</span></label>
          <textarea className='comment' name='description' placeholder='Kompaniya haqida izoh qoldiring'></textarea>
        </div>

        <div className="btns">
          <button className='one'>ORTGA</button>
          <button className='two'>KEYINGISI</button>
        </div>
      </form>

      <div className="cards">
        {users.map((user, index) => (
          <div className="card" key={index}>
            <img src={user.picture || circlePicture} alt="Company Logo" />
            <p><strong>Kompaniya nomi: </strong> {user.companyName}</p>
            <p><strong>Email Address: </strong> {user.email}</p>
            <p><strong>Telefon Number: </strong> {user.phone}</p>
            <p><strong>Davlat: </strong> {user.country}</p>
            <p><strong>Shahar: </strong> {user.city}</p>
            <p><strong>Yashash joyi: </strong> {user.location}</p>
            <p><strong>Hodimlar soni: </strong> {user.staff}</p>
            <p className='commit'><strong>Izoh: </strong> {user.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
