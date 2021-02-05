import React, {useState} from "react";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import style from "./Discovery.module.css";
import Select from 'react-select';
import LOCATIONS from '../../consts/locations'

const Discovery = () => {
  const [filterLocation, setFilterLocation] = useState('');

  return useObserver(() => (
   <>

      <div>
        <Select 
        className={`${style.dropdown}`}
        onChange={(e) => setFilterLocation(e.value)}
        options={LOCATIONS}
        name={"location"}
        id={"location"}
        />

        <dl>
          <dt>Sorteer</dt>
          <dd>Trending</dd>
          <dd>Aanbevolen</dd>
          <dd>Datum</dd>

          <dt>Type</dt>
          <dd>Alle types</dd>
          <dd>Stemmen</dd>
          <dd>Funding</dd>
          <dd>Afgelopen</dd>
        </dl>
      </div>

    <section>
        <div>
            <h2>Alle projecten</h2>
            <p>Aanbevolen</p>
            <p>Gepersonaliseerd aan de hand van jouw tags</p>
        </div>  

        <div>
          <div>dec</div>
          
          <input type="text"/>
          <ul>
            <p>Projecten</p>
            <p>Personen / organisaties</p>
            <p>Tags</p>
          </ul>
        </div>
    </section>

    <section>
      <h2 style={{visibility: 'hidden'}}>Zoekresultaten</h2>
    </section>

   </>
  ));
};

export default Discovery;
