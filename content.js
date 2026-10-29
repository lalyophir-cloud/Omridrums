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
    { num: "∞", en: "HITS", label: "אין סוף מכות בתוף" },
    { num: "200+", en: "HOURS", label: "שעות הקלטה באולפן" }
  ],

  // מופיעים בפס הירוק שזז (באנגלית)
  genres: ["ROCK", "FUNK", "JAZZ", "POP", "FUSION", "LIVE SHOWS", "STUDIO SESSIONS", "DRUM LESSONS"],

  about: {
    portrait: "images/about-portrait.jpg",  // "images/portrait.jpg"  תמונת פנים / פרופיל
    fullBody: "images/about-full.jpg",  // "images/full.jpg"      תמונה לאורך, גוף מלא
    paragraphs: [
      "היי, אני עמרי. מתופף מתל אביב שמנגן כבר יותר מעשר שנים.",
      "מנגן מספר רב של סגנונות, זמין להצטרף להרכבים ולוות אמנים.יות במוזיקה שלהם.ן!",
      "פה תמצאו הקלטות, הופעות קרובות ודרך מהירה לדבר איתי."
    ],
    card: [
      { en: "Name",   label: "שם",     value: "עמרי ברגר" },
      { en: "Role",   label: "תפקיד",  value: "מתופף / כלי הקשה" },
      { en: "Based",  label: "בסיס",   value: "תל אביב" },
      { en: "Status", label: "סטטוס",  value: "פנוי להופעות" }
    ]
  },

  music: {
    // סרטונים. לכל סרטון ממלאים:
    //   file:      קובץ וידאו שמעלים לתיקייה videos, למשל "videos/gagarin.mp4"
    //   youtubeId: או סרטון מיוטיוב: מה שבא אחרי watch?v=  (https://www.youtube.com/watch?v=abc123 -> "abc123")
    //   title:     מה זה. למשל "סולו תופים"
    //   from:      מאיפה. למשל "גגארין, תל אביב 2026"
    // שדה ריק לא מוצג. סרטון בלי file ובלי youtubeId מוצג כמקום שמור.
    featured: { file: "", youtubeId: "", title: "", from: "" },
    videos: [
      { file: "", youtubeId: "", title: "", from: "" },
      { file: "", youtubeId: "", title: "", from: "" },
      { file: "", youtubeId: "", title: "", from: "" },
      { file: "", youtubeId: "", title: "", from: "" }
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
    { src: "images/g-crowd.jpg",       caption: "ארקטיק קרטיב, גגארין", ar: 1.501 },
    { src: "images/g-offbit.jpg",      caption: "הופעה באוויר הפתוח", ar: 1.501 },
    { src: "images/spotlights.jpg",    caption: "באור הזרקורים",   credit: true, ar: 0.746 },
    { src: "images/g-clap.jpg",        caption: "בין השירים", ar: 0.666 },
    { src: "images/band-gagarin.jpg",  caption: "גגארין, תל אביב", credit: true, ar: 0.752 },
    { src: "images/g-bw-side.jpg",     caption: "מהצד של הבמה", ar: 0.666 },
    { src: "images/g-bw-stage.jpg",    caption: "מאחורי המיקרופונים", ar: 1.338 },
    { src: "images/live-red.jpg",      caption: "על הבמה",         credit: true, ar: 0.746 },
    { src: "images/sticks-bw.jpg",     caption: "מקלות למעלה",     credit: true, ar: 0.747 },
    { src: "images/live-green.jpg",    caption: "רגע לפני הפזמון", credit: true, ar: 0.747 },
    { src: "images/stage-view.jpg",    caption: "מאחורי התופים",   credit: true, ar: 0.752 },
    { src: "images/arms-up-bw.jpg",    caption: "סוף ההופעה",      credit: true, ar: 0.746 },
    { src: "images/pearl-kit-bw.jpg",  caption: "מאחורי ה-Pearl", ar: 0.562 },
    { src: "images/through-phone.jpg", caption: "מהקהל", ar: 0.46 },
    { src: "images/focus-bw.jpg",      caption: "פוקוס", ar: 0.562 },
    { src: "images/g-wide-red.jpg", caption: "עם הלהקה על הבמה", ar: 1.500 },
    { src: "images/g-rehearsal.jpg", caption: "בחזרות", ar: 1.501 },
    { src: "images/g-smile.jpg", caption: "חיוך מאחורי התופים", ar: 0.667 },
    { src: "images/g-motion.jpg", caption: "בתנועה", ar: 0.667 }
  ],

  // "מה אני עושה". link: "whatsapp" = כפתור לוואטסאפ, או לינק רגיל, או ריק
  services: [
    { en: "Live shows",    he: "הופעות",       text: "זמין להחלפות מהיום להיום!", link: "#shows",   cta: "להופעות הקרובות" },
    { en: "Recordings",    he: "הקלטות",       text: "סשנים באולפן, הקלטות תופים למוזיקה שלכם.ן!",      link: "whatsapp", cta: "לתאם סשן" },
    { en: "Drum lessons",  he: "שיעורי תופים", text: "שיעורים פרטיים למתחילים ולמתקדמים. גרוב, טכניקה ומה שבא לכם.ן לנגן.", link: "whatsapp", cta: "לתאם שיעור" }
  ],

  contact: {
    email: "Omriberger123@gmail.com",
    instagram: "https://instagram.com/Omri_berger",
    // מספר בפורמט בינלאומי בלי + ובלי 0 בהתחלה. לדוגמה: 972501234567
    whatsapp: "972545379987"
  }
};
