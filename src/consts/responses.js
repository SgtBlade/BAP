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
    fileSizeOver5MB: "De foto moet kleiner zijn dan 5 Megabyte",
    NotAnImage: "Dit is geen jpg/png foto bestand",
    emailVerificationPrompt: "Gelieve uw email opnieuw in te voeren ter bevestiging",


    //Project creation errors:
    NoprojectName: 'Er is geen project naam opgegeven',
    NoBudget: 'Er is geen budget ingesteld',
    budgetTooHigh: 'U mag maximaal een budget instellen van 3000 Euro',
    NoTags: 'Er zijn geen tags gekozen',
    NoOwner: 'Er is geen eigenaar ingesteld',
    NoPictures: 'Er moet minimum 1 foto zijn',
    NoPreview: 'Er moet een korte beschriijving gegeven worden',
    NoDescription: 'Zorg dat er een beschrijving gegeven is en alles aangevinked is',
  };
  
  export { RESPONSE };
  