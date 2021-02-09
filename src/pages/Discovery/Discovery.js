import React, {useState} from "react";
import { useStores } from "../../hooks/useStores";
import { useObserver } from "mobx-react-lite";
import style from "./Discovery.module.css";
import Select from 'react-select';
import LOCATIONS from '../../consts/locations'
import ProjectCard from "../../components/ProjectCard/projectCard";

const Discovery = () => {
  const {projectStore, uiStore} = useStores();
  const [filterLocation, setFilterLocation] = useState('');
  const [filterType, setFilterType] = useState('Alle types');
  const [filterSort, setFilterSort] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const [searchParameter, setSearchParameter] = useState('All');

  const [projects, setProjects] = useState(projectStore.projects);
  const [originalProjects, setOriginalProjects] = useState(projects);

  const filter = async ({sort = filterSort, type = filterType, location = filterLocation}) => {
    let projectstmp = projectStore.getProjects;

    switch(type) {
      case 'Alle types':
            break;
      case 'Stemmen':
            projectstmp = projectStore.filterVoting(projectstmp)
            break;
      case 'Funding':
            projectstmp = projectStore.filterFunding(projectstmp)
            break;
      case 'Afgelopen':
            projectstmp = projectStore.filterArchived(projectstmp)
            break;
      default:
            break;      

  }


  if(location !== '')projectstmp = projectStore.filterByLocation(projectstmp, location)
    switch (sort) {
        case 'Trending':
              projectstmp = projectstmp.slice().sort((a, b) => (a.upvotes < b.upvotes) ? 1 : -1)
              break;
        case 'Datum':
              projectstmp = projectstmp.slice().sort((a, b) => (a.creationDate > b.creationDate) ? 1 : -1)
              break;
        case 'Aanbevolen':
              if(uiStore.currentUser)projectstmp = (projectstmp.slice().sort((a, b) => (a.tags.some(elem => uiStore.currentUser.interestedTags.includes(elem))) ? 1 : -1)).reverse()
              break;
       default:
         break;       
    }

    

    //only show approved ones
    projectstmp = projectStore.getApprovedProjects(projectstmp);
    setProjects([...projectstmp])
    setSearchValue('')
    setOriginalProjects(projectstmp)
  }

  const inputFilter = async (value = searchValue, searchParam = searchParameter) => {
    
    let tmp = originalProjects;
    if(searchParam === 'Projecten' && value !== ''){
      tmp = tmp.filter(project => project.title.toLowerCase().includes(value.toLowerCase()))
    }
    if(searchParam === 'People' && value !== ''){
      tmp = tmp.filter(project => project.coWorkers.some(coworker => (`${coworker.name} ${coworker.surname}`).toLowerCase().includes(value.toLowerCase())))
    }
    if(searchParam === 'Tags' && value !== ''){
      tmp = tmp.filter(project => project.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase())))
    }
    if(searchParam === 'All' && value !== ''){
      let tmp1 = tmp.filter(project => project.title.toLowerCase().includes(value.toLowerCase()))
      let tmp2 = tmp.filter(project => project.coWorkers.some(coworker => (`${coworker.name} ${coworker.surname}`).toLowerCase().includes(value.toLowerCase())))
      let tmp3 = tmp.filter(project => project.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase())))
      tmp = (tmp1.concat(tmp2).concat(tmp3)).reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [] );
    }

    setProjects([...tmp])
  }


  return useObserver(() => (
   <div className={style.discoveryWrap}>
     
      <div className={`${style.filterWrap}`}>
        <Select 
        placeholder={'Regio'}
        isClearable={true}
        className={`${style.dropdown} ${filterLocation !== '' ? style.dropdownActive : ''}`}
        onChange={(e) => {filter({location: e ? e.value:  ''});setFilterLocation(e ? e.value:  ''); }}
        options={LOCATIONS}
        name={"location"}
        id={"location"}/>

        <dl className={style.filter__options}>
          <dt>Sorteer</dt>
          <dd 
          onClick={() => {
            setFilterSort(filterSort !== 'Trending' ? 'Trending' : '');
            filter({sort: (filterSort !== 'Trending' ? 'Trending' : '')});
          }}
          className={`${filterSort === 'Trending' ? style.active: ''}`}><img alt={'icon'} src={`/assets/icons/discovery/trending${filterSort === 'Trending' ? 'Active' : ''}.svg`} />Trending</dd>

          {uiStore.currentUser ?
          <dd 
          onClick={() => {
            setFilterSort(filterSort !== 'Aanbevolen' ? 'Aanbevolen' : '');
            filter({sort: (filterSort !== 'Aanbevolen' ? 'Aanbevolen' : '')});
          }}
          className={`${filterSort === 'Aanbevolen' ? style.active: ''}`}><img alt={'icon'} src={`/assets/icons/discovery/recommended${filterSort === 'Aanbevolen' ? 'Active' : ''}.svg`} />Aanbevolen</dd>
          : ''
          
          }
          
          <dd 
          onClick={() => {
            setFilterSort(filterSort !== 'Datum' ? 'Datum' : '');
            filter({sort: (filterSort !== 'Datum' ? 'Datum' : '')});
          }}
          className={`${filterSort === 'Datum' ? style.active: ''}`}><img alt={'icon'} src={`/assets/icons/discovery/date${filterSort === 'Datum' ? 'Active' : ''}.svg`} />Datum</dd>


          <dt>Type</dt>
          <dd 
          onClick={() => {
            setFilterType(filterType !== 'Alle types'? 'Alle types' : 'Alle types');
            filter({type: (filterType !== 'Alle types'? 'Alle types' : 'Alle types')});
          }}
          className={`${filterType === 'Alle types' ? style.active: ''}`}><img alt={'icon'} src={`/assets/icons/discovery/types${filterType === 'Alle types' ? 'Active' : ''}.svg`} />Alle types</dd>

          <dd 
          onClick={() => {
            setFilterType(filterType !== 'Stemmen' ? 'Stemmen' : 'Alle types');
            filter({type: (filterType !== 'Stemmen' ? 'Stemmen' : 'Alle types')});
          }}
          className={`${filterType === 'Stemmen' ? style.active: ''}`}><img alt={'icon'} src={`/assets/icons/discovery/votes${filterType === 'Stemmen' ? 'Active' : ''}.svg`} />Stemmen</dd>

          <dd 
          onClick={() => {
            setFilterType(filterType !== 'Funding' ? 'Funding' : 'Alle types');
            filter({type: (filterType !== 'Funding' ? 'Funding' : 'Alle types')});
          }}
          className={`${filterType === 'Funding' ? style.active: ''}`}><img alt={'icon'} src={`/assets/icons/discovery/funding${filterType === 'Funding' ? 'Active' : ''}.svg`} />Funding</dd>

          <dd 
          onClick={() => {
            setFilterType(filterType !== 'Afgelopen' ? 'Afgelopen' : 'Alle types');
            filter({type: (filterType !== 'Afgelopen' ? 'Afgelopen' : 'Alle types')});
          }}
          className={`${filterType === 'Afgelopen' ? style.active: ''}`}><img alt={'icon'} src={`/assets/icons/discovery/finished${filterType === 'Afgelopen' ? 'Active' : ''}.svg`} />Afgelopen</dd>

        </dl>
      </div>

    <section className={style.headFilter}>
        <div>
            <h2 className={style.headFilter__title}>Alle projecten</h2>
            {filterSort === 'Trending' ?
            <p className={style.headFilter__subtitle}><img alt={'icon'} src={`/assets/icons/discovery/trending.svg`} />Trending</p>
            : filterSort === 'Aanbevolen' ?
            <p className={style.headFilter__subtitle}><img alt={'icon'} src={`/assets/icons/discovery/recommended.svg`} />Aanbevolen</p>
            : filterSort === 'Datum' ?
            <p className={style.headFilter__subtitle}><img alt={'icon'} src={`/assets/icons/discovery/date.svg`} />Datum</p>
            : ''}
        </div>  

        <div className={style.headFilter__filter}>
          <img className={style.headFilter__filter__decoration} height={88} width={44} alt={'decoration'} src={'/assets/uiElementen/discoveryDec.svg'} />
          

          <div className={style.headFilter__filter__inputWrap}>
          <img height={24} width={24} alt={'icon'} src={`/assets/icons/search.svg`} />
          <input onChange={e => {
            setSearchValue(e.currentTarget.value);
            inputFilter(e.currentTarget.value)
          }} 
          value={searchValue}
          className={style.headFilter__filter__input} type="text"/>
          </div>
          
          
          <ul className={style.headFilter__filter__options}>
            <p  onClick={() => { setSearchParameter(searchParameter !== 'Projecten' ? 'Projecten' : 'All'); inputFilter(searchValue, searchParameter !== 'Projecten' ? 'Projecten' : 'All');}}  className={`${searchParameter === 'Projecten' ? style.searchActive : ''}`}>Projecten</p>
            <p  onClick={() => { setSearchParameter(searchParameter !== 'People' ? 'People' : 'All'); inputFilter(searchValue, searchParameter !== 'People' ? 'People' : 'All');}} className={`${searchParameter === 'People' ? style.searchActive : ''}`}>Personen / organisaties</p>
            <p  onClick={() => { setSearchParameter(searchParameter !== 'Tags' ? 'Tags' : 'All'); inputFilter(searchValue, searchParameter !== 'Tags' ? 'Tags' : 'All');}} className={`${searchParameter === 'Tags' ? style.searchActive : ''}`}>Tags</p>
          </ul>
        </div>
    </section>

    <section>
      <h2 style={{visibility: 'hidden'}}>Zoekresultaten</h2>

      <div className={`${style.ProjectWrap} ${projects.length === 0 ? style.projectWrapCenter : ''}`}>
          {projects.map((project, index) => {
            return <ProjectCard key={`Project_${index}`} project={project}/>
          })}
            {projects.length === 0 ? 
            <p className={style.ProjectWrap__noResults}>Geen projecten gevonden</p>
            :
            ''}
      </div>
    </section>

   </div>
  ));
};

export default Discovery;
