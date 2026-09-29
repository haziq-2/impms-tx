import founderBasheer from "@/assets/board/founder-dr-m-basheer-ahmed.png";
import founderAhsani from "@/assets/board/founder-late-ambassador-syed-a-ahsani.png";
import azizBudri from "@/assets/board/aziz-budri.png";
import khawajaAnwer from "@/assets/board/khawaja-nouman-anwer-m-d.jpg";
import muhsinShaheed from "@/assets/board/imam-muhsin-shaheed.png";
import sameerAhmed from "@/assets/board/sameer-ahmed-j-d.png";
import masoodKhan from "@/assets/board/masood-khan.png";
import samarKhan from "@/assets/board/samar-khan.png";
import azigarAli from "@/assets/board/sheik-ahamed-azigar-ali.jpg";
import zafarAnjum from "@/assets/board/dr-zafar-anjum.jpg";
import mirzaFaizan from "@/assets/board/mirza-faizan.png";
import usmanGhani from "@/assets/board/usman-a-ghani.png";
import ausafHusain from "@/assets/board/dr-ausaf-husain.png";
import bashooNaziruddin from "@/assets/board/dr-bashoo-naziruddin.png";
import salmanMalik from "@/assets/board/dr-salman-malik-m-d-facc.jpg";
import laylaMuriby from "@/assets/board/layla-muriby.png";
import muntahaNiazi from "@/assets/board/sr-muntaha-niazi.jpg";
import shaukatSheikh from "@/assets/board/shaukat-sheikh.png";
import salehaSuleman from "@/assets/board/dr-saleha-suleman.png";
import shahidBajwa from "@/assets/board/shahid-bajwa.jpg";
import edwardThomas from "@/assets/board/edward-thomas.png";
import mustaphaIshak from "@/assets/board/past-dr-mustapha-ishak-boushaki.png";

export interface BoardMember {
  name: string;
  role: string;
  highlightRole?: boolean;
  photo?: string;
  initials?: string;
  bio: string[];
  forthcoming?: boolean;
}

export const founders: (BoardMember & { inMemoriam?: boolean })[] = [
  {
    name: "Dr. M. Basheer Ahmed",
    role: "Founder & President Emeritus",
    highlightRole: true,
    photo: founderBasheer,
    bio: [
      "Dr. M. Basheer Ahmed is the founding force behind IMPMS and a distinguished figure in American psychiatry and community service. A graduate of Osmania University in Hyderabad, he earned his medical degree at Dow Medical College in Karachi and completed postgraduate studies in psychiatry at the University of Glasgow. He is a Fellow of the Royal College of Psychiatrists (London), a Fellow of the Royal College of Physicians (Canada), and a Distinguished Life Fellow of the American Psychiatric Association.",
      "His academic career advanced through the University of Missouri at St. Louis, the Albert Einstein College of Medicine, Wright State University, and the University of Texas Southwestern Medical School in Dallas, alongside leadership of community mental health institutions in New York and Ohio. He has been in private practice in Fort Worth since 1985.",
      "In 1995 he founded the Muslim Community Center for Human Services, the first Muslim charitable organization in Texas. He established IMPMS in 2009 and the Institute of Quranic Knowledge and Intra-faith Religious Acceptance (IQRA) in 2014. He has authored and edited six books, including *My Story as a Muslim Immigrant in America*, and was elected President Emeritus in 2023.",
    ],
  },
  {
    name: "Late Ambassador Syed A. Ahsani",
    role: "Co-Founder & President Emeritus · In Memoriam",
    inMemoriam: true,
    photo: founderAhsani,
    bio: [
      "Ambassador Syed A. Ahsani was a career diplomat, scholar, and civic leader whose life bridged nations and generations. Educated in Pakistan, at McGill University in Montreal, and in Paris, he joined the Pakistan Foreign Service in 1952 and served in missions across Cairo, Rome, Beirut, Kabul, and Calcutta. He served as Ambassador to Sudan, Ghana, and Sierra Leone, and later to Brazil with accreditation to four South American nations, before co-founding and directing the Pakistan Foreign Service Academy until his retirement in 1988.",
      "Settling in Arlington, Texas, he taught as a visiting professor, founded the American Muslim Alliance's Southwest Region, and helped establish the Texas Muslim Democratic Caucus. He co-founded IMPMS and served as its President from 2009 to 2011, becoming President Emeritus in 2012 and receiving the organization's lifetime achievement award. In recognition of his service, the City of Arlington named a street in his honor — Ambassador Syed Ahsani Street.",
    ],
  },
];

export const boardMembers: BoardMember[] = [
  {
    name: "Aziz Budri",
    role: "President",
    highlightRole: true,
    photo: azizBudri,
    bio: [
      "Aziz Budri's path to leadership began in Kabul, Afghanistan, where he finished first in his class and earned an American Field Service scholarship to complete high school in Iowa. He graduated from Mount Mercy University with double majors in Sociology and Business Administration before completing a Master of Public Administration at the University of Iowa.",
      "In 1982 he moved to Dallas and built a management career in financial services with a Fortune 500 company, earning more than three dozen awards for excellence, including Manager of the Year across the entire home office. His record of civic service spans founding and board roles with the Islamic Association of Texas, the World Affairs Council, UNICEF's Texas chapter, STEMmatters, and IMPMS, alongside years of dedicated work supporting Afghan refugees.",
    ],
  },
  {
    name: "Khawaja Nouman Anwer, M.D.",
    role: "Board of Directors",
    photo: khawajaAnwer,
    bio: [
      "Dr. Khawaja Nouman Anwer is a cardiologist who has served the North Texas community for more than four decades. Born in Lahore, Pakistan, he earned his medical degree from King Edward Medical College in 1975 and came to the United States the following year. He completed his specialization in cardiology at the Cleveland Clinic in 1982 and established his medical practice in North Texas that same year.",
    ],
  },
  {
    name: "Imam Muhsin Shaheed",
    role: "Treasurer · Former President",
    highlightRole: true,
    photo: muhsinShaheed,
    bio: [
      "Muhsin H. Shaheed has served as a chaplain with the DFW International Airport Interfaith Chaplaincy since 1998 and is the only Muslim member of the International Airport Chaplains Association in the United States. A retired educator with twenty years of service in the Fort Worth ISD, he holds a Bachelor's in Criminal Justice and a Master's from TCU, and a second Master of Arts in Islamic Studies from Cordoba University.",
      "A Certified Muslim American Chaplain, he has presented scholarship on the legacy of Timbuktu, Ahmed Baba, and Leo Africanus at Texas Medieval Association conferences, studied classical Arabic at Al-Azhar University in Cairo, and served as President of IMPMS from 2013 to 2015. A native Texan dedicated to building bridges of tolerance among faith communities.",
    ],
  },
  {
    name: "Sameer Ahmed, J.D.",
    role: "Board of Directors",
    photo: sameerAhmed,
    bio: [
      "Sameer Ahmed is the founder of The Ahmed Firm, PLLC, representing a diverse portfolio of North Texas businesses across transactional and litigation matters. He earned his B.S. in Biology from Southern Methodist University and his Juris Doctor from South Texas College of Law.",
      "His commitment to the community is expressed through sustained governance service, including a seat on the Board of Directors of the Multicultural Alliance in Fort Worth and his role as Chairman of the Board of the Muslim Community Center for Human Services, which he joined in 2019.",
    ],
  },
  {
    name: "Masood Khan",
    role: "Secretary",
    highlightRole: true,
    photo: masoodKhan,
    bio: [
      "Masood Khan is a Global Logistics Leader at TE Connectivity, a LinkedIn Top Voice (2024), and a recognized Top 75 AI Leader in the Dallas-Fort Worth region for 2026. With more than twenty years at Fortune 100 companies including 3M, Cisco, and DHL, he has built his career at the intersection of supply chain, technology, and sustainability.",
      "He is the author of the Amazon #1 New Release *Sustainability Rewired: Pioneering the Future* (2024) and the *Beginner to Executive Prompting Guide* (2025), and hosts two professional podcasts. A graduate of Penn State with an MBA from Nova Southeastern University, he has completed executive training at MIT and Yale.",
    ],
  },
  {
    name: "Samar Khan",
    role: "Board of Directors",
    photo: samarKhan,
    bio: [
      "Samar Khan is the Founder and CEO of TripAI Technologies, applying artificial intelligence across aviation, travel, and hospitality. He brings more than twenty years of experience developing mission-critical software and is recognized as a thought leader in sustainability, cloud, and AI technology.",
      "He earned a B.S. with Honors from the University of Texas at Arlington and an MBA from the SMU Cox School of Business, and was named one of the Top 75 AI Leaders in the Dallas-Fort Worth region for 2025.",
    ],
  },
  {
    name: "Sheik Ahamed Azigar Ali",
    role: "Board of Directors",
    photo: azigarAli,
    bio: [
      "Sheik Ahamed Azigar Ali is a serial innovator and seasoned technology leader with deep expertise in AI, machine learning, and blockchain. He is the founder and CEO of Craton Technologies, a MedTech startup building an AI-enabled platform for global regulatory affairs, and inventor of the patented Blockchain-based Credentials Verification System.",
      "Across a twenty-two-year career in healthcare, retail, telecom, and insurance, he has mentored more than 200 students to file patents in the U.S. and abroad — recognized by the Texas State Capitol through official resolution #403. He was granted U.S. permanent residency under the Alien of Extraordinary Ability category.",
    ],
  },
  {
    name: "Dr. Zafar Anjum",
    role: "Board of Directors",
    photo: zafarAnjum,
    bio: [
      "Dr. Zafar Anjum is Professor of Arabic and Islamic Culture at the University of Texas at Dallas, teaching Islamic civilization during the medieval era. A scholar and Imam with more than thirty years of community service across Florida, Nevada, and Texas, he has collaborated with IMPMS for more than two decades and actively nominates graduate students to the Board.",
      "He is a founding scholar of the Islamic Center of Frisco and since 2017 has served as resident scholar and Imam of the Islamic Association of The Colony. He co-leads the WAQF endowment initiative with area mosques to build sustainable long-term support for IMPMS.",
    ],
  },
  {
    name: "Mirza Faizan",
    role: "Board of Directors",
    photo: mirzaFaizan,
    bio: [
      "Mirza Faizan is a world-renowned aerospace scientist and inventor of GRIPS (Ground Reality Information Processing System), which prevents runway incursions and detects foreign objects on runways in real time. His research has drawn admiration from scientists at NASA, the Pentagon's AMRDEC, and the U.S. Air Force.",
      "As a nominated judge of the R&D 100 Awards, he has evaluated technologies funded by NASA, the Department of Homeland Security, the Department of Defense, and the FAA. He was granted U.S. permanent residency under the Alien of Extraordinary Ability category.",
    ],
  },
  {
    name: "Usman A. Ghani",
    role: "Board of Directors",
    photo: usmanGhani,
    bio: [
      "Usman A. Ghani is a widely respected consulting executive with a record of shaping governmental policy and business strategy for McKinsey & Company, the Royal Dutch/Shell Group, ExxonMobil, and Hewlett Packard/EDS. He holds three Master's degrees from MIT and pioneered the concepts of governance dynamics and multi-firm supply chains.",
      "As Chairman of ConfluCore in Las Colinas, he has authored winning strategic agendas for organizations across six continents through his SIGOMO® approach. He serves as Adjunct Professor at UT Dallas, authored *The Leader of the Future 2*, and is a Benjamin Franklin Fellow listed in Who's Who Worldwide.",
    ],
  },
  {
    name: "Dr. Ausaf Husain",
    role: "Board of Directors",
    photo: ausafHusain,
    bio: [
      "Dr. Ausaf Husain is a nuclear engineer, atomic energy specialist, and a leader in the American Muslim community for more than fifty years. He earned his B.S. and M.S. in Mechanical Engineering from IIT Kanpur and his Ph.D. in Nuclear Engineering from the University of Cincinnati in 1975, later earning an Executive MBA from SMU.",
      "He retired as Chief Nuclear Officer of the Emirates Nuclear Energy Corporation after overseeing the construction and operation of four nuclear power plants in the UAE. He has served on the IMPMS Board since 2021 and has been instrumental in shaping the organization's strategic planning.",
    ],
  },
  {
    name: "Dr. Bashoo Naziruddin",
    role: "Vice President",
    highlightRole: true,
    photo: bashooNaziruddin,
    bio: [
      "Dr. Bashoo Naziruddin is Director of the islet cell processing laboratory at Baylor University Medical Center in Dallas and an Adjunct Professor at the Institute of Biomedical Studies at Baylor University in Waco. He earned his Ph.D. in Biochemistry from the University of Madras and was elected a Fellow of the American Society of Transplantation.",
      "He leads the team performing pancreatic islet cell transplants for patients with type 1 diabetes and chronic pancreatitis, and has published 170 manuscripts in peer-reviewed journals. His research has been funded by the NIH, the Juvenile Diabetes Research Foundation, and the American Heart Association.",
    ],
  },
  {
    name: "Dr. Salman Malik, M.D., FACC",
    role: "Board of Directors",
    photo: salmanMalik,
    bio: [
      "Dr. Salman Malik is President of the Cardiovascular Clinic of North Texas and an accomplished interventional and clinical cardiologist. A graduate of King Edward Medical University, he completed his studies with honors and placed first in a nationwide competition for a medical research scholarship, earning a master's in experimental pathology at Boston University, before completing residency and fellowship at the University of Utah and University of Arkansas.",
      "He has held faculty appointments at Marshall University and the University of Oklahoma Health Sciences Center. Guided by the principle *Scientia cum Virtute* — knowledge with virtue — he has broad interests in ancient and medieval history, governance, and population health.",
    ],
  },
  {
    name: "Layla Muriby",
    role: "Board of Directors",
    photo: laylaMuriby,
    bio: [
      "Layla Muriby is an educator and lifelong student with a passion for the intersection of psychology and Islamic education. She is currently in her senior year at the University of Texas at Dallas, pursuing a degree in Psychology with the goal of a master's in clinical psychology. She works at a psychiatric clinic specializing in integrative psychiatry that blends evidence-based medicine with holistic approaches, psychotherapy, and innovative treatments.",
      "She also serves as an Islamic Studies teacher at BEAM Academy. Her journey in the Islamic sciences began at a young age under Shaykh Mohamad Hamzawy of Al-Azhar, and she continues her studies at Darul Qasim and Taqwa Seminary.",
    ],
  },
  {
    name: "Sr. Muntaha Niazi",
    role: "Board of Directors",
    photo: muntahaNiazi,
    bio: [
      "Muntaha Niazi is a public health professional with a background in health data analytics, healthcare technology, and medical devices. She holds a B.S. in Public Health and a Graduate Certificate in Health Data Analytics from the University of North Texas.",
      "Her professional experience includes medical devices, patient data management, and healthcare technology, complemented by experience in marketing, content creation, and event planning. She is passionate about healthcare innovation and the intersection of science, technology, and business.",
      "As an IMPMS Board Member, Muntaha is passionate about advancing the organization's mission of highlighting Muslim contributions to science and medicine while inspiring the next generation of innovators and healthcare professionals.",
    ],
  },
  {
    name: "Shaukat Sheikh",
    role: "Board of Directors",
    photo: shaukatSheikh,
    bio: [
      "Shaukat Sheikh is a marketing and communications strategist with nearly two decades of experience building brands and driving cross-cultural engagement across global markets. He pairs digital strategy and creative direction with AI-powered tools to deliver measurable results across multichannel outreach and donor messaging.",
      "Previously as Marketing and Communications Director at the Zakat Foundation of America, he led global marketing spanning social media, content, print, and video production. He holds an M.A. in Communication Studies and an M.S. in Technology from Eastern Illinois University.",
    ],
  },
  {
    name: "Dr. Saleha Suleman",
    role: "Board of Directors",
    photo: salehaSuleman,
    bio: [
      "Dr. Saleha Suleman is President of Enhance International Education, LLC, and a leader in international higher education with more than thirty years of experience. She currently serves as Vice President of Student Services and International Affairs at TexAM University at Dallas, the first Muslim university in the United States.",
      "She has organized major conferences of the National Women's Studies Association, including one hosting Nobel Peace laureate Wangari Maathai. Having traveled to more than thirty countries, she has built partnerships with universities, governments, and NGOs worldwide. She is also a published poet.",
    ],
  },
  {
    name: "Shahid Bajwa",
    role: "Board of Directors",
    photo: shahidBajwa,
    bio: [],
  },
];

export const pastPresidents: BoardMember[] = [
  {
    name: "Edward Thomas",
    role: "Past President",
    photo: edwardThomas,
    bio: [
      "Edward Thomas's involvement with other parts of the world began after completing a B.A. in Mathematics at Yale University, when he taught at a high school in Kabul, Afghanistan. After completing an M.A. at Columbia University in International Relations, he joined the Foreign Service with assignments in Iran, North Africa, and post-graduate Middle East Studies at Princeton University.",
      "He served as Chief of Programs and Training for the Francophone region of Africa and Country Director in Upper Volta and Iran for the Peace Corps, and later as Executive Secretary of the Moroccan-American Fulbright Commission for nine years. A founding member of IMPMS, he has been an instructor in SMU's Continuing Education program and is fluent in French and Persian.",
    ],
  },
  {
    name: "Dr. Mustapha Ishak-Boushaki",
    role: "Past President",
    highlightRole: true,
    photo: mustaphaIshak,
    bio: [
      "Dr. Mustapha Ishak-Boushaki is Professor of Physics and Astrophysics at UT Dallas, recognized internationally for contributions to cosmic acceleration, dark energy, gravitational lensing, and tests of Einstein's General Relativity. He has published more than ninety scientific articles with over 4,000 citations, and was elected Fellow of the AAAS (2021) and Fellow of the American Physical Society (2022).",
      "He received the UT Dallas Outstanding Teaching Award and Builder Status in the Legacy Survey of Space and Time collaboration. A devoted scholar of Muslim scientific heritage, he led the Muslim Heritage Scholar Exhibition at the UT Dallas library and remains an active Board member fully embracing IMPMS's mission.",
      "Located in the Dallas / Fort Worth area · Serving communities since 2009",
    ],
  },
];
