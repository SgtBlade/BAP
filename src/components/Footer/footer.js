import React from "react";
import style from "./footer.module.css";
//import COLORS from "../globalStyles/colors";

const Footer = () => {
    
  return(
    <footer>
        <div className={style.footerContainer}>
            <img src="./assets/logo-white.svg" className={style.footerImage} alt="footer DURF2030 logo"/>
            <div className={style.sitemap}>
                <p className={style.footerTitle}>Sitemap</p>
                <div className={style.sitemap__container}>
                    <p className={style.footerText}>Over ons</p>
                    <p className={style.footerText}>Projecten</p>
                </div>
                <div className={style.sitemap__container}>
                    <p className={style.footerText}>Aanmelden</p>
                    <p className={style.footerText}>Registreer</p>
                </div>
                <div className={style.sitemap__container}>
                    <p className={style.footerText}>Contacteer ons</p>
                </div>
            </div>
            <div className={style.followUs}>
                <p className={style.footerTitle}>Sitemap</p>
                <img src="./assets/socials/instagram.svg" className={style.footerSocial} alt="instagram"/>
                <img src="./assets/socials/linkedin.svg" className={style.footerSocial} alt="linkedin"/>
                <img src="./assets/socials/facebook.svg" className={style.footerSocial} alt="facebook"/>
            </div>
            <div className={style.contactUs}>
                <p className={style.footerTitle}>Sitemap</p>
                <div className={style.sitemap__container}>
                    <p className={style.footerText}>DURF2030</p>
                    <p className={style.footerText}>Broelkaai 6</p>
                    <p className={style.footerText}>8500 KORTRIJK</p>
                    <a href="mailto::hello@durf2030.eu" className={style.footerMail}>Schrijf je in voor de nieuwsbrief!</a>
                </div>
                <a className={style.nieuwsbrief}>Schrijf je in voor de nieuwsbrief!</a>
            </div>
        </div>
        <p className={style.disclaimer}>© INTEGRATION PANDAS 2020 - ALLE RECHTEN VOORBEHOUDEN - GEBRUIKSVOORWAARDEN - PRIVACYVERKLARING - TOEGANKELIJKHEIDSVERKLARING</p>
    </footer>
  );
};

export default Footer;
