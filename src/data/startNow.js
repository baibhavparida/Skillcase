// Content for /start-now, the trust page that sends visitors to the program
// picker (/start-now/cart, which replaced the "Choose your service" cart on
// learner.skillcase.in; that one still works and is the fallback).
//
// Copied from the live page's content API (learnerapi.skillcase.in
// /trust-page/content) in October 2026. That API only returns links that
// expire after a day, so the photos, videos and PDFs are hosted here,
// compressed for phones. Learner photos, videos and reviews are real: keep
// them real, and get consent before adding anyone new.

export const cartUrl = "/start-now/cart/";
export const learnerCartUrl = "https://learner.skillcase.in/start-now/cart";
export const webAppUrl = "https://learner.skillcase.in/";

// The sales line shown on the live start-now page and its cart.
export const phone = {
  href: "tel:+919972266767",
  label: "+91 99722 66767",
};

// The hero map's tour: real learners, one at a time, each zoomed out of a
// pin on their home state. These are all the learners with usable photos
// (the CMS's candidates and the story videos), mostly women; more need real
// photos and consent from the team. The CMS gives a state, not a town, so
// pins mark states. Course and finished levels are the CMS's (July 2026) or
// their story video's; levels still in progress are left out because they go
// stale. Photos are square face crops of the CMS photos (Ganesh's only photo
// is a distant one). `lens` is where the zoomed photo floats, in the units
// of LearnerMap's FRAME (map units of the tilted view): top right over the
// north-east for the north, over the Bay of Bengal for the rest, clear of the
// highlighted state and its pin, with room below for the caption and its
// shadow at every width. North and south in turn.
const NORTH = [880, 190];
const BAY = [770, 680];
export const mapLearners = [
  {
    name: "Sneha Shaji",
    state: "kerala",
    course: "BSc Nursing",
    done: "B2 completed",
    image: "/assets/images/start-now/lens-sneha-shaji.webp",
    lens: BAY,
  },
  {
    name: "Qasim Malik",
    state: "uttar-pradesh",
    course: "BSc Nursing",
    image: "/assets/images/start-now/lens-qasim-malik.webp",
    lens: NORTH,
  },
  {
    name: "Sheila H. V.",
    state: "karnataka",
    course: "GNM Nursing",
    done: "A1 completed",
    image: "/assets/images/start-now/lens-sheila-h-v.webp",
    lens: BAY,
  },
  {
    name: "Pinak Saini",
    state: "rajasthan",
    course: "MSc Nursing",
    image: "/assets/images/start-now/lens-pinak-saini.webp",
    lens: NORTH,
  },
  {
    name: "Modem Praveena",
    state: "andhra-pradesh",
    course: "BSc Nursing",
    done: "A1 completed",
    image: "/assets/images/start-now/lens-modem-praveena.webp",
    lens: [800, 740],
  },
  {
    name: "Nitin Bewal",
    state: "haryana",
    course: "BSc Nursing",
    image: "/assets/images/start-now/lens-nitin-bewal.webp",
    lens: NORTH,
  },
  {
    name: "Ruth Joseph",
    state: "tamil-nadu",
    course: "Post Basic BSc Nursing",
    image: "/assets/images/start-now/lens-ruth-joseph.webp",
    lens: BAY,
  },
  {
    name: "Ganesh Akhade",
    state: "maharashtra",
    course: "BSc Nursing",
    image: "/assets/images/start-now/lens-ganesh-akhade.webp",
    lens: BAY,
  },
  {
    name: "Priyanka C",
    state: "karnataka",
    course: "GNM Nursing",
    done: "B2 completed",
    image: "/assets/images/start-now/lens-priyanka-c.webp",
    lens: BAY,
  },
  {
    name: "Sivaranjani P",
    state: "tamil-nadu",
    course: "BSc Nursing",
    image: "/assets/images/start-now/lens-sivaranjani-p.webp",
    lens: BAY,
  },
];

// Hero "live class" window. The teacher's frame comes from a real class
// recording; learners are real Skillcase learners. Tiles after the ninth only
// show on wider screens. A tile without an image shows initials, like a
// participant with their camera off (Himavathi's only photo looked
// AI-edited, so it isn't used).
export const classTiles = [
  { name: "Karthiyayini", image: "tile-karthiyayini-muthu", teacher: true },
  { name: "Sneha Shaji", image: "tile-sneha-shaji" },
  { name: "Ruth Joseph", image: "tile-ruth-joseph" },
  { name: "Priyanka C", image: "tile-priyanka-c" },
  { name: "Rakesh Das", image: "tile-rakesh-das" },
  { name: "Sheila H. V.", image: "tile-sheila-h-v" },
  { name: "Modem Praveena", image: "tile-modem-praveena" },
  { name: "Sandesh", image: "tile-sandesh" },
  { name: "Sivaranjani P", image: "tile-sivaranjani-p" },
  { name: "Prajwal G N", image: "tile-prajwal-g-n" },
  { name: "Himavathi", initials: "H" },
  { name: "Pinak Saini", image: "tile-pinak-saini" },
];

// Learner video stories. Sneha's and Sandesh's videos are the homepage's
// files; the others are encoded for this page.
export const stories = [
  {
    name: "Sneha Shaji",
    state: "Kerala",
    qualification: "BSc Nursing",
    level: "B2 completed",
    done: true,
    duration: "1:27",
    poster: "/assets/images/start-now/story-sneha-shaji.webp",
    video: "/assets/videos/testimonials/sneha-shaji.mp4",
  },
  {
    name: "Priyanka C",
    state: "Karnataka",
    qualification: "GNM Nursing",
    level: "B2 completed",
    done: true,
    duration: "0:37",
    poster: "/assets/images/start-now/story-priyanka-c.webp",
    video: "/assets/videos/start-now/priyanka-c.mp4",
    // Her video is landscape; keep her face in the portrait card.
    focus: "70% center",
  },
  {
    name: "Prajwal G N",
    state: "Karnataka",
    qualification: "BSc Nursing",
    level: "B2 completed",
    done: true,
    duration: "1:04",
    poster: "/assets/images/start-now/story-prajwal-g-n.webp",
    video: "/assets/videos/start-now/prajwal-g-n.mp4",
  },
  {
    name: "Sandesh",
    state: "Karnataka",
    qualification: "Nursing graduate",
    level: "B2 in progress",
    duration: "1:24",
    poster: "/assets/images/start-now/story-sandesh.webp",
    video: "/assets/videos/testimonials/sandesh.mp4",
  },
];

// Clips from real live classes.
export const classClips = [
  {
    title: "Fun to show up for",
    copy: "Forget boring slides. Live sessions are packed with games, breakout rooms and high-energy practice, so class feels more like a meetup.",
    points: ["Live games", "Breakout rooms"],
    label: "Article game · der, die, das",
    duration: "1:02",
    poster: "/assets/images/start-now/class-article-game.webp",
    video: "/assets/videos/start-now/class-article-game.mp4",
  },
  {
    title: "Easy to keep up with",
    copy: "Short lessons and flexible timelines, built to fit around your schedule instead of taking it over.",
    points: ["Short lessons", "Flexible timelines"],
    label: "A1 lesson · the letter D",
    duration: "0:35",
    poster: "/assets/images/start-now/class-letter-d-lesson.webp",
    video: "/assets/videos/start-now/class-letter-d-lesson.mp4",
  },
];

// Free A1 notes. Sizes are the PDF file sizes, shown for visitors on mobile
// data. `letter` is the first letter of each script's alphabet ("A" for A1),
// shown on the note's document thumbnail.
export const notes = [
  {
    language: "English",
    lang: "en",
    letter: "A",
    title: "German A1 Notes",
    size: "2.9 MB",
    file: "/assets/notes/german-a1-notes-english.pdf",
  },
  {
    language: "Malayalam",
    lang: "ml",
    letter: "അ",
    title: "ജർമ്മൻ A1 നോട്ടുകൾ",
    size: "2.0 MB",
    file: "/assets/notes/german-a1-notes-malayalam.pdf",
  },
  {
    language: "Kannada",
    lang: "kn",
    letter: "ಅ",
    title: "ಜರ್ಮನ್ A1 ಟಿಪ್ಪಣಿಗಳು",
    size: "1.9 MB",
    file: "/assets/notes/german-a1-notes-kannada.pdf",
  },
  {
    language: "Hindi",
    lang: "hi",
    letter: "अ",
    title: "जर्मन A1 नोट्स",
    size: "1.3 MB",
    file: "/assets/notes/german-a1-notes-hindi.pdf",
  },
  {
    language: "Tamil",
    lang: "ta",
    letter: "அ",
    title: "ஜெர்மன் A1 குறிப்புகள்",
    size: "1.9 MB",
    file: "/assets/notes/german-a1-notes-tamil.pdf",
  },
];

export const lectures = [
  {
    name: "Armin Alagic-Müller",
    role: "Native German speaker",
    copy: "Pronunciation training with a native speaker. Master authentic phrasing and build real-world confidence.",
    duration: "2:24",
    poster: "/assets/images/start-now/lecture-armin-alagic.webp",
    video: "/assets/videos/start-now/lecture-armin-alagic.mp4",
  },
  {
    name: "Niranjana Yesudas",
    role: "Now working in Germany",
    copy: "From our classroom to the German wards. Follow her journey to a healthcare role in Germany.",
    duration: "1:23",
    poster: "/assets/images/start-now/lecture-niranjana-yesudas.webp",
    video: "/assets/videos/start-now/lecture-niranjana-yesudas.mp4",
  },
  {
    name: "Uwe Franz",
    role: "Insurance industry leader, Germany",
    copy: "A video podcast on healthcare in Germany, the demand for international talent and the opportunities for professionals from India.",
    duration: "2:32",
    poster: "/assets/images/start-now/lecture-uwe-franz.webp",
    video: "/assets/videos/start-now/lecture-uwe-franz.mp4",
  },
];

// Google reviews from the live page, lightly edited for spelling and length.
// The first three match the homepage's versions.
export const reviews = [
  {
    name: "Ayesha Fatima",
    initials: "AF",
    quote:
      "The instructor uses easy examples that make complex topics easier. They always made time to answer questions after class and guide us.",
  },
  {
    name: "Abdullah Khan",
    initials: "AK",
    quote:
      "The classes were very interactive. They clear your doubts, make sure everyone understands, give assignments for practice, and provide recordings if you miss a class.",
  },
  {
    name: "Karthikeyan",
    initials: "K",
    quote:
      "I chose Skillcase for the affordable fees, excellent teachers, live classes that feel like school or college, recorded classes and a user-friendly app. I got everything I needed in one place.",
  },
  {
    name: "Trendy Sagar",
    initials: "TS",
    quote:
      "Good teaching and quick action when problems come up. The team is helpful and stays connected with students as they work toward their dream job in Germany.",
  },
  {
    name: "Sivaranjani",
    initials: "S",
    quote:
      "The German class was very good. My coach explained everything in a simple and easy way. Everyone at Skillcase was friendly, supportive and approachable.",
  },
  {
    name: "Latha Rani",
    initials: "LR",
    quote:
      "The classes are good and they clear our doubts instantly. The Skillcase app helps us practise and improve our skills. A good platform to learn German.",
  },
  {
    name: "Sudeep Gowda",
    initials: "SG",
    quote: "Skillcase is good for German language learners, from basic to advanced level.",
  },
];

export const faqs = [
  {
    question: "Do I need to know German before I start?",
    answer:
      "No. Most learners start from zero at A1. Nurses usually need B1–B2 German to work in Germany, and we take you there level by level.",
  },
  {
    question: "Are the classes live?",
    answer:
      "Yes. Classes are live and interactive, with games, breakout rooms and lots of practice. If you miss one, you can catch up with the recording.",
  },
  {
    question: "Can I study in my own language?",
    answer:
      "Yes. Our A1 notes come in English, Malayalam, Kannada, Hindi and Tamil, and you can read them free on this page.",
  },
  {
    question: "Can I learn on my phone?",
    answer:
      "Yes. The Skillcase app has lessons, flashcards, speaking practice and mock tests. Android users can get it on Google Play; iPhone users can use the web app.",
  },
  {
    question: "Is it only Germany?",
    answer:
      "Germany is our main focus, and our German programs are built for it. We also help healthcare professionals with jobs in Ireland and Norway. Call us to talk about those.",
  },
  {
    question: "What’s my next step?",
    answer:
      "Choose Start your journey to see our programs, from single German levels to the complete Germany program, and pick the one that fits you. Not sure which? Call us and a counsellor will help you choose.",
  },
];
