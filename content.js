/* =========================================================
   כל התוכן של האתר נמצא כאן.
   משנים טקסטים, לינקים, הופעות ותמונות רק בקובץ הזה.
   שדה ריק ("") = יוצג מקום שמור (placeholder) מעוצב.
   ========================================================= */

window.SITE = {
  name: "עמרי",
  nameEn: "OMRI",
  tagline: "מתופף. מקליט. מופיע.",
  subline: "הופעות חיות, סשנים באולפן וגרוב שלא נגמר.",


  // מספרים שמופיעים בראש העמוד ובכרטיס
  stats: [
    { num: "10+", en: "YEARS", label: "שנים מאחורי התופים" },
    { num: "200+", en: "SHOWS", label: "הופעות" },
    { num: "30+", en: "SESSIONS", label: "הקלטות באולפן" }
  ],

  // מופיעים בפס הירוק שזז (באנגלית)
  genres: ["ROCK", "FUNK", "JAZZ", "POP", "FUSION", "LIVE SHOWS", "STUDIO SESSIONS", "DRUM LESSONS"],

  about: {
    portrait: "images/about-portrait.jpg",  // "images/portrait.jpg"  תמונת פנים / פרופיל
    fullBody: "images/about-full.jpg",  // "images/full.jpg"      תמונה לאורך, גוף מלא
    paragraphs: [
      "היי, אני עמרי. מתופף מתל אביב שמנגן כבר יותר מעשר שנים.",
      "גדלתי על רוק ופאנק, ובדרך התאהבתי בג'אז ובגרוב. היום אני מנגן עם כמה הרכבים, בהופעות חיות ובאולפן, ותמיד מחפש את הסאונד הזה שגורם לקהל לזוז.",
      "פה תמצאו הקלטות, הופעות קרובות ודרך מהירה לדבר איתי."
    ],
    card: [
      { en: "Name",   label: "שם",     value: "עמרי ברגר" },
      { en: "Role",   label: "תפקיד",  value: "מתופף / כלי הקשה" },
      { en: "Style",  label: "סגנון",  value: "רוק, פאנק, פיוז'ן" },
      { en: "Based",  label: "בסיס",   value: "תל אביב" },
      { en: "Status", label: "סטטוס",  value: "פנוי להופעות" }
    ]
  },

  music: {
    // מזהה של סרטון יוטיוב: מה שבא אחרי watch?v=
    // לדוגמה https://www.youtube.com/watch?v=abc123  ->  "abc123"
    featured: { youtubeId: "", title: "הופעה חיה / סולו תופים", tag: "LIVE" },
    videos: [
      { youtubeId: "", title: "Drum Cover #1", tag: "COVER" },
      { youtubeId: "", title: "סשן באולפן", tag: "STUDIO" },
      { youtubeId: "", title: "גרוב פאנק", tag: "GROOVE" },
      { youtubeId: "", title: "הופעה עם ההרכב", tag: "LIVE" }
    ],
    // העטיפה של התקליט שיוצא מהצד (התמונה במרכז התקליט = תמונת הפרופיל)
    cover: "images/live-red.jpg",
    // כפתורים לפלטפורמות. כפתור בלי לינק לא מוצג
    platforms: [
      { name: "YouTube",   url: "" },
      { name: "Instagram", url: "https://instagram.com/Omri_berger" }
    ]
  },

  // הופעות. התאריך בפורמט שנה-חודש-יום.
  // הופעות שהתאריך שלהן עבר יורדות מהאתר לבד.
  shows: [
    {
      date: "2026-12-17", time: "19:00", timeLabel: "פתיחת דלתות",
      venue: "גגארין", city: "תל אביב", address: "קיבוץ גלויות 13",
      project: "ארקטיק קרטיב - מחווה לארקטיק מאנקיז",
      ticketUrl: "https://zygo.co.il/event/440917234594708168"
    }
  ],

  // תמונה שמופיעה מתחת להופעות
  showsPhoto: { src: "images/band-gagarin.jpg", caption: "ארקטיק קרטיב בגגארין", credit: true },

  // גלריה. shape אפשרי: "pill" (עגלגל), "tall" (גבוה), "wide" (רחב), "" (רגיל)
  // קרדיט לצלם. תמונות עם credit: true מקבלות את הקרדיט הזה
  photoCredit: { name: "@eilonbphoto", url: "https://instagram.com/eilonbphoto" },

  gallery: [
    { src: "images/g-crowd.jpg",       caption: "ארקטיק קרטיב, גגארין" },
    { src: "images/g-offbit.jpg",      caption: "הופעה באוויר הפתוח" },
    { src: "images/spotlights.jpg",    caption: "באור הזרקורים",   credit: true },
    { src: "images/g-clap.jpg",        caption: "בין השירים" },
    { src: "images/band-gagarin.jpg",  caption: "גגארין, תל אביב", credit: true },
    { src: "images/g-bw-side.jpg",     caption: "מהצד של הבמה" },
    { src: "images/live-red.jpg",      caption: "על הבמה",         credit: true },
    { src: "images/sticks-bw.jpg",     caption: "מקלות למעלה",     credit: true },
    { src: "images/live-green.jpg",    caption: "רגע לפני הפזמון", credit: true },
    { src: "images/stage-view.jpg",    caption: "מאחורי התופים",   credit: true },
    { src: "images/arms-up-bw.jpg",    caption: "סוף ההופעה",      credit: true },
    { src: "images/pearl-kit-bw.jpg",  caption: "מאחורי ה-Pearl" },
    { src: "images/through-phone.jpg", caption: "מהקהל" },
    { src: "images/focus-bw.jpg",      caption: "פוקוס" }
  ],

  // "מה אני עושה". link: "whatsapp" = כפתור לוואטסאפ, או לינק רגיל, או ריק
  services: [
    { en: "Live shows",    he: "הופעות",       text: "מתופף בהופעות חיות עם הרכבים ואמנים, וגם מחליף לערב כשצריך.", link: "#shows",   cta: "להופעות הקרובות" },
    { en: "Recordings",    he: "הקלטות",       text: "סשנים באולפן ותופים להקלטות, משיר אחד ועד אלבום שלם.",      link: "whatsapp", cta: "לתאם סשן" },
    { en: "Drum lessons",  he: "שיעורי תופים", text: "שיעורים פרטיים למתחילים ולמתקדמים. גרוב, טכניקה ומה שבא לכם לנגן.", link: "whatsapp", cta: "לתאם שיעור" }
  ],

  contact: {
    email: "Omriberger123@gmail.com",
    instagram: "https://instagram.com/Omri_berger",
    // מספר בפורמט בינלאומי בלי + ובלי 0 בהתחלה. לדוגמה: 972501234567
    whatsapp: "972545379987"
  }
};
