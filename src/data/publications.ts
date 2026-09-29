import riseFallCover from "@/assets/publications/rise-fall-muslim-civilization.jpg";
import gunsCover from "@/assets/publications/guns-americans-obsessed.jpg";
import myStoryCover from "@/assets/publications/my-story-muslim-immigrant.jpg";
import muslimContributionsCover from "@/assets/publications/muslim-contributions-world-civilization.jpg";
import domesticViolenceCover from "@/assets/publications/domestic-violence-cross-cultural.jpg";

export interface Book {
  title: string;
  author: string;
  year: string;
  price?: string;
  buyUrl?: string;
  cover?: string;
}

export interface Article {
  title: string;
  author: string;
  date?: string;
  url?: string;
}

export const books: Book[] = [
  {
    title: "The Rise and Fall of Muslim Civilization: Hope for the Future",
    author: "Dr. Basheer Ahmed",
    year: "2022",
    price: "$20",
    buyUrl: "https://www.amazon.com/Rise-Fall-Muslim-Civilization-Future-ebook/dp/B09YMS92NV",
    cover: riseFallCover,
  },
  {
    title: "Why Are Americans Obsessed with Guns and Willing To Pay a High Price for Them?",
    author: "M. Basheer Ahmed, M.D.",
    year: "2022",
    buyUrl: "https://www.amazon.com/dp/B0BBYB4RB7",
    cover: gunsCover,
  },
  {
    title: "My Story as a Muslim Immigrant in America",
    author: "Basheer Ahmed",
    year: "2022",
    price: "$15",
    buyUrl: "https://www.amazon.com/dp/B0786NDJN3",
    cover: myStoryCover,
  },
  {
    title: "The Islamic Intellectual Heritage and Its Impact on the West",
    author: "Dr. Basheer Ahmed",
    year: "2008",
    price: "$10",
  },
  {
    title: "Muslim Contributions to World Civilization",
    author: "Dr. Basheer Ahmed",
    year: "2005",
    price: "$10",
    buyUrl: "https://www.amazon.com/Muslim-Contributions-World-Civilization-Basheer/dp/1565644107",
    cover: muslimContributionsCover,
  },
  {
    title: "Domestic Violence: Cross-Cultural Perspective",
    author: "Dr. Basheer Ahmed",
    year: "2009",
    price: "$10",
    buyUrl: "https://www.amazon.com/Domestic-Violence-Cross-Cultural-Perspective-Ahmed/dp/1441544728",
    cover: domesticViolenceCover,
  },
];

export const articles: Article[] = [
  {
    title: "JBMA Rise and Fall",
    author: "Dr. Basheer Ahmed",
    url: "https://www.prnewswire.com/news-releases/author-dr-basheer-ahmed-receives-recognition-through-the-next-generation-indie-book-awards-for-his-book-the-rise-and-fall-of-muslim-civilization-hope-for-the-future-301847534.html",
  },
  {
    title: "Muslim Scholars and Spain",
    author: "Dr. Basheer Ahmed",
    url: "https://jima.imana.org/article/view/15083",
  },
  {
    title: "Preparing Young Muslim Scientists to Follow in the Footsteps of Medieval Scholars",
    author: "Dr. Basheer Ahmed",
  },
  {
    title: "The Decline of the Pursuit of Knowledge",
    author: "Dr. Basheer Ahmed",
    date: "2023",
    url: "https://islamichorizons.net/the-decline-of-the-pursuit-of-knowledge/",
  },
  {
    title: "Sir Syed Ahmed Khan: A Visionary and Reformist of His Time",
    author: "Dr. Basheer Ahmed",
    date: "December 25, 2020",
  },
  {
    title: "Unique Ways to Inspire Muslim American Youth",
    author: "Aziz Budri",
    date: "September 6, 2021",
    url: "https://www.islamicity.org/78625/unique-ways-to-inspire-muslim-american-youth/",
  },
  {
    title: "Inspire Muslim American Youth",
    author: "Dr. Basheer Ahmed",
  },
  {
    title: "Nafs Horizon",
    author: "Dr. Basheer Ahmed",
    url: "https://issuu.com/isnacreative/docs/ih_january-february_21/40",
  },
  {
    title: "Our Heritage",
    author: "Dr. Basheer Ahmed",
  },
  {
    title: "What Young Muslims Learn",
    author: "Dr. Basheer Ahmed",
  },
];
