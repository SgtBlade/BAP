import React from "react";
import { useStores } from "../../hooks/useStores";
//import { useObserver } from "mobx-react-lite";
import moduleStyle from "./home.module.css";
import globalStyle from "../globalStyles/main.module.css";
//import COLORS from "../globalStyles/colors";
//import ProjectCard from "../../components/ProjectCard/projectCard";
import ProjectPreview from "../../components/ProjectPreview/projectPreview";
import { Link } from "react-router-dom";
//import { Switch, Route, Redirect, useHistory, Link } from "react-router-dom";

const style = { ...moduleStyle, ...globalStyle };

const Home = () => {
  const { uiStore } = useStores();

  console.log(uiStore.currentUser);

  return (
    <main className={style.homeMain}>
      <h1 className="hidden">Durf2030 - Home</h1>
      <section
        className={`${style.section} ${style.sectionContainer} ${style.intro}`}
      >
        <div className={style.introTextContainer}>
          <div className={style.introText}>
            <h2 className={`${style.title} ${style.introTitle}`}>
              Voor de{" "}
              <span className={style.introTitleHighlight}>durvers.</span>
            </h2>
            <p className={style.introParagraph}>
              Durf2030 zet zich in voor de durvers. We willen zoveel mogelijk
              mensen uit Kortrijk en regio stimuleren om creatieve ideeën te
              bedenken en uit te voeren. Stem of ondersteun de projecten die je
              het meeste aanspreken, of je eigen creatief project toevoegen.
            </p>
          </div>
          <div className={style.introButtonContainer}>
            <Link className={`${style.introButton} ${style.mainButton}`} to="/">
              Bekijk de projecten
            </Link>
            <Link className={`${style.introButton} ${style.altButton}`} to="/">
              Heb jij een idee?
            </Link>
          </div>
        </div>
        <div className={`${style.introProjectCard}`}>
          <ProjectPreview type="funding"></ProjectPreview>
        </div>
      </section>

      <section className={`${style.section} ${style.how}`}>
        <div className={style.container}>
          <h2 className={style.howTitle}>
            Hoe werkt h<span className={style.howTitleHighlight}>et?</span>
          </h2>
          <div className={style.howSections}>
            <section className={style.howSection}>
              <div className={style.howSectionTextContainer}>
                <h3 className={style.howSectionTitle}>
                  Projectidee is aangevraagd
                </h3>
                <p className={style.howSectionParagraph}>
                  Iemand (of jezelf) voegt een creatief project toe na het
                  invullen van alle nodige informatie.
                </p>
              </div>
              <img
                className={style.howSectionImg}
                src="assets/images/lamp.svg"
                alt="lamp die een projectidee weergeeft"
                width="115"
                height="130"
              />
            </section>
            <section className={style.howSection}>
              <div className={style.howSectionTextContainer}>
                <h3 className={style.howSectionTitle}>Er wordt gestemd</h3>
                <p className={style.howSectionParagraph}>
                  Het project wordt zichtbaar en Iedereen kan erop stemmen
                  indien ze het graag zouden zien verwezelijkt.
                </p>
              </div>
              <img
                className={style.howSectionImg}
                src="assets/images/button.svg"
                alt="likebutton met hartjes"
                width="130"
                height="130"
              ></img>
            </section>
            <section className={style.howSection}>
              <div className={style.howSectionTextContainer}>
                <h3 className={style.howSectionTitle}>
                  Er worden middelen verzameld
                </h3>
                <p className={style.howSectionParagraph}>
                  Naast middelen zoals vrijwilligers en materiaal, kunnen
                  geïntreseerden een donatie doen om het project te steunen.
                </p>
              </div>
              <img
                className={style.howSectionImg}
                src="assets/images/resources.svg"
                alt="geldinzamelpot met verfborstel"
                width="130"
                height="130"
              ></img>
            </section>
            <section className={style.howSection}>
              <div className={style.howSectionTextContainer}>
                <h3 className={style.howSectionTitle}>
                  Durf2030 steunt verder
                </h3>
                <p className={style.howSectionParagraph}>
                  Goedgekeurde projecten worden op verschillende manieren verder
                  ondersteund door Durf2030.
                </p>
              </div>
              <img
                className={style.howSectionImg}
                src="assets/images/steunverder.svg"
                alt="steunpilaren worden gebouwd"
                width="115"
                height="130"
              ></img>
            </section>
          </div>
        </div>
      </section>

      <section
        className={`${style.section} ${style.pillars} ${style.container}`}
      >
        <header className={style.pillarsHeader}>
          <h2 className={style.pillarsTitle}>
            De <span className={style.pillarsTitleSpan}>4</span>
            <br /> Durf pijlers
          </h2>
          <a
            className={style.linkButton}
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
            <img
              className={style.pillarsSectionImage}
              src="assets/images/connect.svg"
              alt="verbinden van verschillende vormen"
              width="130"
              height="130"
            ></img>
          </section>
          <section className={style.pillarsSection}>
            <h3 className={style.pillarsSectionTitle}>Durf2030 toont</h3>
            <p className={style.pillarSectionParagraph}>
              Jouw project staat in de kijker op onze website en onze sociale
              media kanalen.
            </p>
            <img
              className={style.pillarsSectionImage}
              src="assets/images/verrekijker.svg"
              alt="verrekijker die kijkt"
              width="150"
              height="130"
            ></img>
          </section>
          <section className={style.pillarsSection}>
            <h3 className={style.pillarsSectionTitle}>Durf2030 inspireert</h3>
            <p className={style.pillarSectionParagraph}>
              Met diverse events, pitchsessies, bootcamps, lezingen inspireren
              we iedereen die een project wil opzetten.
            </p>
            <img
              className={style.pillarsSectionImage}
              src="assets/images/inspireer.svg"
              alt="hersenen die geïnspireerd worden aan de hand van elektrische prikkels"
              width="130"
              height="130"
            ></img>
          </section>
          <section className={style.pillarsSection}>
            <h3 className={style.pillarsSectionTitle}>Durf2030 ondersteunt</h3>
            <p className={style.pillarSectionParagraph}>
              Waar mogelijk krijg je ondersteuning om je project te organiseren,
              financieren, communiceren.
            </p>
            <img
              className={style.pillarsSectionImage}
              src="assets/images/ondersteun.svg"
              alt="meerdere steunpilaren die de verschillende manieren van steun weergeven"
              width="130"
              height="130"
            ></img>
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
          <div className={style.highlightsCardBig}>
            <ProjectPreview type="funding"></ProjectPreview>
            <Link className={`${style.introButton} ${style.mainButton}`} to="/">
              Toon alle projecten
            </Link>
          </div>
          <ProjectPreview type="voting"></ProjectPreview>
          <ProjectPreview type="funding"></ProjectPreview>
        </div>
      </section>
      <section
        className={`${style.section} ${style.callToAction} ${style.container}`}
      >
        <div className={style.callToActionText}>
          <h2 className={style.callToActionTitle}>Doe mee met jouw project!</h2>
          <p className={style.callToActionParagraph}>
            Ben je gebeten door het maken van projecten? Of heb je een idee in
            je hoofd maar weet je niet hoe het uit te werken, of van waar je het
            financiële kan halen? Maak dan nu een account aan en ontdek de vele
            voordelen van het DURF platform en ondersteuning!
          </p>
          <Link className={`${style.introButton} ${style.mainButton}`} to="/">
            Ik heb een project!
          </Link>
        </div>
        <img
          src="assets/images/project.svg"
          alt="regiseurshanden die recht tegenover elkaar staan en een visie weergeven"
          width="485"
          height="445"
        ></img>
      </section>
    </main>
  );
};

export default Home;
