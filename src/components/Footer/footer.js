import React from "react";
import { Link } from "react-router-dom";
import style from "./footer.module.css";
import { ROUTES } from "../../consts";
//import COLORS from "../globalStyles/colors";

const Footer = () => {
    
  return(
    <footer>
        <div className={style.footerContainer}>
            <img src="./assets/logo-white.svg" className={style.footerImage} alt="footer DURF2030 logo"/>
            <div className={style.sitemap}>
                <p className={style.footerTitle}>Sitemap</p>
                <div className={style.sitemap__container}>
                    <Link className={style.footerText} to={ROUTES.overons}>Over ons</Link>
                    <Link className={style.footerText} to={ROUTES.projecten}>Projecten</Link>
                </div>
                <div className={style.sitemap__container}>
                    <Link className={style.footerText} to={ROUTES.login}>Aanmelden</Link>
                    <Link className={style.footerText} to={ROUTES.registreer}>Registreer</Link>
                </div>
                <div className={style.sitemap__container}>
                    <Link className={style.footerText} to={ROUTES.home}>Contacteer ons</Link>
                </div>
            </div>
            <div className={style.followUs}>
                <p className={style.footerTitle}>Volg ons op</p>
                <a href={window.location.href} className={style.footerSocial}>
                    <img src="./assets/socials/instagram.svg" className={style.footerSocial} alt="instagram"/>
                </a>
                <a href={window.location.href} className={style.footerSocial}>
                    <img src="./assets/socials/linkedin.svg" className={style.footerSocial} alt="linkedin"/>
                </a>
                <a href={window.location.href} className={style.footerSocial}>
                    <img src="./assets/socials/facebook.svg" className={style.footerSocial} alt="facebook"/>
                </a>
                
            </div>
            <div className={style.contactUs}>
                <p className={style.footerTitle}>Contacteer ons</p>
                <div className={style.sitemap__container}>
                    <p className={`${style.footerText} ${style.footerText__adres}`}>DURF2030</p>
                    <p className={`${style.footerText} ${style.footerText__adres}`}>Broelkaai 6</p>
                    <p className={`${style.footerText} ${style.footerText__adres}`}>8500 KORTRIJK</p>
                    <a href="mailto::hello@durf2030.eu" className={style.footerMail}>hello@durf2030.eu</a>
                </div>
                <a href={window.location.href} className={style.nieuwsbrief}>Schrijf je in voor de nieuwsbrief!</a>
            </div>
        </div>
        <p className={style.disclaimer}>© INTEGRATION PANDAS 2020 - ALLE RECHTEN VOORBEHOUDEN - GEBRUIKSVOORWAARDEN - PRIVACYVERKLARING - TOEGANKELIJKHEIDSVERKLARING</p>
    </footer>
  );
};

export default Footer;
