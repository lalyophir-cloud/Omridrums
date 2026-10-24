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

  // תמונה ראשית. הכי טוב PNG בלי רקע (גזור), למשל: "images/hero.png"
  // אם ריק, יוצג איור של מערכת תופים
  heroImage: "",

  // מספרים שמופיעים בראש העמוד ובכרטיס
  stats: [
    { num: "10+", en: "YEARS", label: "שנים מאחורי התופים" },
    { num: "200+", en: "SHOWS", label: "הופעות" },
    { num: "30+", en: "SESSIONS", label: "הקלטות באולפן" }
  ],

  // מופיעים בפס הכתום שזז
  genres: ["ROCK", "FUNK", "JAZZ", "POP", "FUSION", "הופעות חיות", "סשנים", "אולפן"],

  about: {
    portrait: "",  // "images/portrait.jpg"  תמונת פנים / פרופיל
    fullBody: "",  // "images/full.jpg"      תמונה לאורך, גוף מלא
    paragraphs: [
      "היי, אני עמרי. מתופף מתל אביב שמנגן כבר יותר מעשר שנים.",
      "גדלתי על רוק ופאנק, ובדרך התאהבתי בג'אז ובגרוב. היום אני מנגן עם כמה הרכבים, בהופעות חיות ובאולפן, ותמיד מחפש את הסאונד הזה שגורם לקהל לזוז.",
      "פה תמצאו הקלטות, הופעות קרובות ודרך מהירה לדבר איתי."
    ],
    card: [
      { en: "Name",   label: "שם",     value: "עמרי" },
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
    // לינק לפלייליסט / אמן / שיר בספוטיפיי. ריק = לא יוצג נגן
    spotify: "",
    platforms: [
      { name: "Spotify",   url: "" },
      { name: "YouTube",   url: "" },
      { name: "Instagram", url: "" }
    ]
  },

  // הופעות. התאריך בפורמט שנה-חודש-יום.
  // האתר מחלק לבד ל"קרובות" ו"קודמות" לפי התאריך של היום.
  shows: [
    { date: "2026-11-13", time: "21:30", venue: "הבארבי",       city: "תל אביב", project: "עם הלהקה",       ticketUrl: "" },
    { date: "2026-11-27", time: "22:00", venue: "לבונטין 7",     city: "תל אביב", project: "ערב ג'אז",       ticketUrl: "" },
    { date: "2026-12-18", time: "21:00", venue: "זאפה",          city: "ירושלים", project: "אורח מיוחד",     ticketUrl: "" },
    { date: "2026-09-05", time: "21:00", venue: "האוזן השלישית", city: "תל אביב", project: "השקת סינגל",     ticketUrl: "" },
    { date: "2026-07-22", time: "20:30", venue: "פסטיבל קיץ",    city: "חיפה",    project: "במה פתוחה",      ticketUrl: "" },
    { date: "2026-05-10", time: "22:00", venue: "הגדה השמאלית",  city: "תל אביב", project: "פאנק נייט",      ticketUrl: "" }
  ],

  // גלריה. shape אפשרי: "pill" (עגלגל), "tall" (גבוה), "wide" (רחב), "" (רגיל)
  gallery: [
    { src: "", caption: "בארבי, 2026",   shape: "tall" },
    { src: "", caption: "בחזרות",        shape: "pill" },
    { src: "", caption: "סאונדצ'ק",      shape: "wide" },
    { src: "", caption: "סשן באולפן",    shape: "" },
    { src: "", caption: "מקלות",         shape: "pill" },
    { src: "", caption: "על הבמה",       shape: "wide" },
    { src: "", caption: "אחרי ההופעה",   shape: "" },
    { src: "", caption: "הסט אפ",        shape: "tall" }
  ],

  contact: {
    email: "omri@example.com",
    instagram: "",  // לינק מלא לפרופיל, למשל https://instagram.com/...
    // מספר בפורמט בינלאומי בלי + ובלי 0 בהתחלה. לדוגמה: 972501234567
    whatsapp: ""
  }
};
