import React from "react";
import { useStores } from "../../hooks/useStores";
//import { useObserver } from "mobx-react-lite";
import style from "./home.module.css";
//import Tag from "../../components/Tag/tag.js";
//import COLORS from "../globalStyles/colors";
import ProjectCard from "../../components/ProjectCard/projectCard";
import { Link } from "react-router-dom";
//import { Switch, Route, Redirect, useHistory, Link } from "react-router-dom";

const Home = () => {
  const { uiStore } = useStores();

  console.log(uiStore.currentUser);

  //intro

  return (
    <main>
      <h1 className={style.hidden}>Durf2030 - Home</h1>
      <section className={`${style.section} ${style.intro}`}>
        <h2 className={`${style.title} ${style.introTitle}`}>
          Voor de <span className={style.introTitleHighlight}>durvers.</span>
        </h2>
        <p className={style.introParagraph}>
          Durf2030 zet zich in voor de durvers. We willen zoveel mogelijk mensen
          uit Kortrijk en regio stimuleren om creatieve ideeën te bedenken en
          uit te voeren. Stem of ondersteun de projecten die je het meeste
          aanspreken, of je eigen creatief project toevoegen.
        </p>
        <Link className={style.introLink} to="/">
          Bekijk de projecten
        </Link>
        <Link className={`${style.introLink} ${style.introLinkAlt}`} to="/">
          Heb jij een idee?
        </Link>
        <div className={`${style.introProjectCard}`}>
          <ProjectCard></ProjectCard>
        </div>
      </section>

      <section className={`${style.section} ${style.how}`}>
        <h2 className={style.howTitle}>
          Hoe werkt <span className={style.howTitleHighlight}>het?</span>
        </h2>
        <div className={style.howSections}>
          <section className={style.howSection}>
            <img src="" alt=""></img>
            <h3 className={style.howSectionTitle}>
              Projectidee is aangevraagd
            </h3>
            <p className={style.howSectionParagraph}>
              Iemand (of jezelf) voegt een creatief project toe na het invullen
              van alle nodige informatie.
            </p>
          </section>
          <section className={style.howSection}>
            <img src="" alt=""></img>
            <h3 className={style.howSectionTitle}>Er wordt gestemd</h3>
            <p className={style.howSectionParagraph}>
              Het project wordt zichtbaar en Iedereen kan erop stemmen indien ze
              het graag zouden zien verwezelijkt.
            </p>
          </section>
          <section className={style.howSection}>
            <img src="" alt=""></img>
            <h3 className={style.howSectionTitle}>
              Er worden middelen verzameld
            </h3>
            <p className={style.howSectionParagraph}>
              Naast middelen zoals vrijwilligers en materiaal, kunnen
              geïntreseerden een donatie doen om het project te steunen.
            </p>
          </section>
          <section className={style.howSection}>
            <img src="" alt=""></img>
            <h3 className={style.howSectionTitle}>Durf2030 steunt verder</h3>
            <p className={style.howSectionParagraph}>
              Goedgekeurde projecten worden op verschillende manieren verder
              ondersteund door Durf2030.
            </p>
          </section>
        </div>
      </section>

      <section className={`${style.section} ${style.pillars}`}>
        <header className={style.pillarsHeader}>
          <h2 className={style.pillarsTitle}>
            De <span>4</span> pijlers
          </h2>
          <a
            href="https://www.durf2030.eu/over-durf2030"
            target="_blank"
            rel="noopener noreferrer"
          >
            Meer info over de 4 pijlers
          </a>
        </header>
        <div className={style.pillarsSections}>
          <section className={style.pillarsSection}>
            <h3 className={style.pillarsSectionTitle}>Durf2030 verbind</h3>
            <p className={style.pillarSectionParagraph}>
              Wij bekijken welke organisaties, bedrijven, kuwnstenaars,
              individuen jouw project vooruit kunnen helpen.
            </p>
            <img src="" alt=""></img>
          </section>
          <section className={style.pillarsSection}>
            <h3 className={style.pillarsSectionTitle}>Durf2030 toont</h3>
            <p className={style.pillarSectionParagraph}>
              Jouw project staat in de kijker op onze website en onze sociale
              media kanalen.
            </p>
            <img src="" alt=""></img>
          </section>
          <section className={style.pillarsSection}>
            <h3 className={style.pillarsSectionTitle}>Durf2030 inspireert</h3>
            <p className={style.pillarSectionParagraph}>
              Met diverse events, pitchsessies, bootcamps, lezingen inspireren
              we iedereen die een project wil opzetten.
            </p>
            <img src="" alt=""></img>
          </section>
          <section className={style.pillarsSection}>
            <h3 className={style.pillarsSectionTitle}>Durf2030 ondersteunt</h3>
            <p className={style.pillarSectionParagraph}>
              Waar mogelijk krijg je ondersteuning om je project te organiseren,
              financieren, communiceren.
            </p>
            <img src="" alt=""></img>
          </section>
        </div>
      </section>
      <section className={`${style.section} ${style.highlights}`}>
        <h2 className={style.highlightsTitle}>
          <span className={style.highlightsTitleHighlight}>Uitgelichte </span>
          projecten
        </h2>
        <div className={style.highlightsCards}>
          {/* Hier komen 3 projecten */}
          <ProjectCard></ProjectCard>
          <ProjectCard></ProjectCard>
          <ProjectCard></ProjectCard>
        </div>
      </section>
      <section className={`${style.section} ${style.callToAction}`}>
        <div className={style.callToActionText}>
          <h2>Doe mee met jouw project!</h2>
          <p>
            Ben je gebeten door het maken van projecten? Of heb je een idee in
            je hoofd maar weet je niet hoe het uit te werken, of van waar je het
            financiële kan halen? Maak dan nu een account aan en ontdek de vele
            voordelen van het DURF platform en ondersteuning!
          </p>
          <Link className={style.cta__link} to="/">
            Ik heb een project!
          </Link>
        </div>
        <img src="" alt=""></img>
      </section>
    </main>
  );
};

export default Home;
