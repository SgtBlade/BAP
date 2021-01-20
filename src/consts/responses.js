const RESPONSE = {
    //Static URL's
    resetPasswordURL: "https://localhost:3000/reset",
    loginURL: "https://localhost:3000/login",
    
    //Responses
    resetPasswordSucces: 'Er is een mail versuurd om u wachtwoord te resetten.',
    resetPasswordFail: 'Zorg dat u het juiste email adress ingetyped heeft.',
    loginWrongPasswordError: 'U heeft een onjuist wachtwoord ingegeven.',
    createAccountDuplicateMail: "Er bestaat al een account met dit E-mail adres.",
    loginNonExistingMail: "Er bestaat nog geen account met dit E-mail adres.",
    fileSizeOver2MB: "De foto moet kleiner zijn dan 2 Megabyte",
    NotAnImage: "Dit is geen jpg/png foto bestand"
  };
  
  export { RESPONSE };
  