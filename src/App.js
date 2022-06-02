import { useEffect, useState } from 'react';
import './App.css';
import data from './data/english.json';
import ciggareteImg from './img/cigarette_icon.png';

function App() {
  const [heroImage, setHeroImage] = useState('');
  const [heroTitle, setHeroTitle] = useState('');
  const [infoDate, setInfoDate] = useState('');
  const [category, setCategory] = useState('');
  const [cities, setCities] = useState([]);
  const [desc, setDesc] = useState('');
  const [selected, setSelected] = useState([]);

  // SET DATA
  const setData = () => {
    setHeroImage(data.hero_1_image);
    setHeroTitle(data.hero_1_title);
    setCategory(data['article-info_1_category']);
    setInfoDate(data['article-info_1_date']);
    setDesc(data['compare-tabs_1_method']);
    setCities(data.cities);
  }

  // CHANGE CITY
  const handleChange = (e) => {
    if (e.target.value !== null){
      var indexCity = e.target.value;
      var selectedArr = Object.values(cities[indexCity]);
      setSelected(selectedArr);
    }
  }

  // ON LOAD
  useEffect(() => {
    setData();
  });

  if (cities.length === 0) {
    return <div className="loader"></div>
  }

  return (
    <div className="container">
      <header>
        <img src={heroImage} width="100%"/>
        <h1>{heroTitle} <img src={ciggareteImg} width="20"/></h1>
        <p>{infoDate} | {category}</p>
        <hr/>
      </header>
      <section>
        <div className="section-left">
        <strong>Select City &nbsp;</strong>
        <select onChange={handleChange}>
          {
            cities.map((item, index) => {
              return (<option key={index} value={index}>{item['compare_tabs_1_city_'+(index+1)+'_name']}</option>)
            })
          }
        </select>
        </div>
        <div className="section-right">
          {selected !== "" ?
            (
              <>
                <h3>{selected[0]}</h3>
                <p>
                  Air quality index: <strong>{selected[1]}</strong><br/>
                  Cigarettes: <strong>{selected[2]}</strong>
                </p>
              </>
            )
          :
            (<div className="loader"></div>)
          }
        </div>
      </section>
      <footer>
        <p>{desc}</p>
      </footer>
    </div>
  );
}

export default App;
