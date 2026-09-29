import astronomyObservatory from "@/assets/scholars/astronomy-observatory.png";
import cartographyWorkshop from "@/assets/scholars/cartography-workshop.png";
import engineeringWorkshop from "@/assets/scholars/engineering-workshop.png";
import libraryHouseOfWisdom from "@/assets/scholars/library-house-of-wisdom.png";
import medicineBimaristan from "@/assets/scholars/medicine-bimaristan.png";

const scholarPortraitModules = import.meta.glob<string>(
  "../assets/scholars/portraits/*.{jpg,jpeg,png,webp,gif}",
  { eager: true, import: "default" },
);

function getScholarPortrait(slug: string): string | undefined {
  for (const [path, src] of Object.entries(scholarPortraitModules)) {
    const filename = path.split("/").pop() ?? "";
    if (filename.startsWith(`${slug}.`)) return src;
  }
  return undefined;
}

export interface Scholar {
  name: string;
  period?: string;
  description: string;
}

export interface ScholarProfile extends Scholar {
  slug: string;
  field: string;
  image: string;
}

export interface ScholarField {
  field: string;
  scholars: Scholar[];
}

export const featuredScholarFieldOrder = [
  "Astronomy and Observational Science",
  "Mathematics and Measurement",
  "Medicine, Surgery, and Pharmacology",
  "Philosophy, Logic, and Intellectual Tradition",
  "Engineering, Mechanics, and Invention",
  "Geography, Cartography, and Earth Sciences",
] as const;

export const scholarFieldImages: Record<(typeof featuredScholarFieldOrder)[number], string> = {
  "Astronomy and Observational Science": astronomyObservatory,
  "Mathematics and Measurement": libraryHouseOfWisdom,
  "Medicine, Surgery, and Pharmacology": medicineBimaristan,
  "Philosophy, Logic, and Intellectual Tradition": libraryHouseOfWisdom,
  "Engineering, Mechanics, and Invention": engineeringWorkshop,
  "Geography, Cartography, and Earth Sciences": cartographyWorkshop,
};

export const scholarFieldIntros: Record<(typeof featuredScholarFieldOrder)[number], string> = {
  "Astronomy and Observational Science":
    "Medieval Muslim astronomers refined observation, instrument design, and planetary calculation in ways that shaped later astronomy across the Islamic world and Europe.",
  "Mathematics and Measurement":
    "Scholars in this tradition advanced algebra, trigonometry, geometry, and practical calculation, building methods that influenced mathematics for centuries.",
  "Medicine, Surgery, and Pharmacology":
    "Physicians and surgeons in the medieval Islamic world combined clinical observation, encyclopedic writing, and practical treatment in hospitals and teaching centers.",
  "Philosophy, Logic, and Intellectual Tradition":
    "Philosophers in this period engaged logic, metaphysics, ethics, and the relationship between reason and revelation across a rich intellectual tradition.",
  "Engineering, Mechanics, and Invention":
    "Engineers and inventors translated scientific insight into mechanical design, hydraulics, instruments, and practical devices.",
  "Geography, Cartography, and Earth Sciences":
    "Geographers and cartographers mapped regions, described cultures, and studied the earth through travel writing, measurement, and comparative observation.",
};

export const heritageIntro =
  "From the 7th to the 15th centuries, Muslim scholars contributed to major advances across many disciplines. Their ideas were preserved, translated, and expanded in other parts of the world, influencing generations of learning and research. IMPMS celebrates this legacy as a source of understanding, pride, and inspiration for today's communities.";

export const scholarsNote =
  "The scholars below represent a broad cross-section of the scientific and intellectual achievements of the medieval Islamic world. Many were polymaths whose work crossed multiple fields, so the categories here are meant to help readers explore this heritage more easily rather than to limit any scholar to a single discipline.";

export function scholarFieldSlug(field: string) {
  return field.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const scholarFieldsByField = new Map<string, ScholarField>([
  {
    field: "Astronomy and Observational Science",
    scholars: [
      { name: "Al-Fazari", period: "8th century", description: "Among the earliest astronomers associated with the translation and adaptation of astronomical knowledge into Arabic." },
      { name: "Al-Farghani", period: "c. 800–870", description: "Known for influential works on the structure of the heavens and for making astronomy more accessible through clear summaries." },
      { name: "Al-Battani", period: "c. 858–929", description: "Improved astronomical measurements and calculations related to the solar year, eclipses, and planetary motion." },
      { name: "Abd al-Rahman al-Sufi", period: "903–986", description: "Famous for his observations of the stars and constellations, including a major illustrated star catalog." },
      { name: "Ibn Yunus", period: "c. 950–1009", description: "Produced detailed astronomical tables based on careful observation." },
      { name: "Al-Zarqali", period: "1029–1087", description: "A leading astronomer and instrument maker whose work influenced later astronomy in both the Islamic world and Europe." },
      { name: "Nasir al-Din al-Tusi", period: "1201–1274", description: "Advanced mathematical astronomy and helped develop new planetary models." },
      { name: "Ibn al-Shatir", period: "1304–1375", description: "Refined planetary theory and designed astronomical instruments." },
      { name: "Ulugh Beg", period: "1394–1449", description: "Sponsored major observatories and produced highly regarded astronomical tables." },
      { name: "Ali Qushji", period: "1403–1474", description: "Contributed to astronomy, mathematics, and scientific debate in the late medieval period." },
    ],
  },
  {
    field: "Mathematics and Measurement",
    scholars: [
      { name: "Al-Khwarizmi", period: "c. 780–850", description: "A foundational figure in algebra whose methods shaped mathematical problem-solving for centuries." },
      { name: "Thabit ibn Qurra", period: "826–901", description: "Contributed to geometry, number theory, mechanics, and the transmission of Greek mathematics." },
      { name: "Abu al-Wafa al-Buzjani", period: "940–998", description: "Known for work in geometry and trigonometry, especially practical and computational methods." },
      { name: "Abu Nasr Mansur", period: "c. 960–1036", description: "Helped develop trigonometry and mathematical astronomy." },
      { name: "Omar Khayyam", period: "1048–1131", description: "Combined mathematics, astronomy, and literature, and is well known for work on equations and calendar reform." },
      { name: "Sharaf al-Din al-Tusi", period: "c. 1135–1213", description: "Advanced algebraic analysis and the study of equations." },
      { name: "Jamshid al-Kashi", period: "c. 1380–1429", description: "Celebrated for precision in computation and significant advances in arithmetic and geometry." },
    ],
  },
  {
    field: "Medicine, Surgery, and Pharmacology",
    scholars: [
      { name: "Al-Razi", period: "c. 865–925", description: "A major physician and medical writer whose clinical observations shaped later medical practice." },
      { name: "Ali ibn Sahl Rabban al-Tabari", period: "c. 838–870", description: "An early medical scholar associated with important encyclopedic works." },
      { name: "Al-Zahrawi", period: "936–1013", description: "A pioneer of surgery known for surgical instruments and practical medical guidance." },
      { name: "Ibn Sina (Avicenna)", period: "980–1037", description: "One of the most influential physicians in history, best known for The Canon of Medicine." },
      { name: "Ibn Zuhr", period: "1094–1162", description: "Advanced clinical medicine and careful observation in diagnosis and treatment." },
      { name: "Ibn al-Nafis", period: "1213–1288", description: "Known for important contributions to anatomy and the understanding of pulmonary circulation." },
      { name: "Al-Biruni", period: "973–c. 1050", description: "Also contributed to pharmacology through work on medicinal substances and scientific classification." },
    ],
  },
  {
    field: "Philosophy, Logic, and Intellectual Tradition",
    scholars: [
      { name: "Al-Kindi", period: "c. 801–873", description: "Often called the first major philosopher in the Islamic tradition, with work spanning logic, music, mathematics, and metaphysics." },
      { name: "Al-Farabi", period: "c. 872–950", description: "A leading philosopher of logic, political thought, and the classification of knowledge." },
      { name: "Ibn Sina (Avicenna)", period: "980–1037", description: "Combined medicine with philosophy and produced enduring works on metaphysics, logic, and ethics." },
      { name: "Al-Ghazali", period: "1058–1111", description: "A major theologian and philosopher whose writings shaped debates about reason, faith, and education." },
      { name: "Ibn Bajjah", period: "c. 1085–1138", description: "A philosopher of Andalusia known for reflections on intellect and the solitary life of the thinker." },
      { name: "Ibn Tufayl", period: "c. 1105–1185", description: "Famous for philosophical storytelling and reflections on knowledge and human development." },
      { name: "Ibn Rushd (Averroes)", period: "1126–1198", description: "Renowned for commentaries on Aristotle and for defending philosophy as a path to understanding." },
    ],
  },
  {
    field: "Engineering, Mechanics, and Invention",
    scholars: [
      { name: "Banu Musa brothers", period: "9th century", description: "Known for ingenious mechanical devices and works on geometry and engineering." },
      { name: "Al-Jazari", period: "1136–1206", description: "Celebrated for mechanical design, automated devices, and practical engineering illustrations." },
      { name: "Abbas ibn Firnas", period: "810–887", description: "Remembered for experimentation in mechanics, glassmaking, and flight-related design." },
      { name: "Taqi al-Din", period: "1526–1585", description: "A later scholar and engineer associated with astronomy, instruments, and mechanical innovation." },
    ],
  },
  {
    field: "Geography, Cartography, and Earth Sciences",
    scholars: [
      { name: "Al-Biruni", period: "973–c. 1050", description: "A polymath whose work included geography, geodesy, astronomy, mineralogy, and comparative cultural study." },
      { name: "Al-Idrisi", period: "1100–1165", description: "Produced one of the best-known medieval geographic works and maps of the known world." },
      { name: "Al-Maqdisi", period: "c. 945–1000", description: "Known for descriptive geography and detailed writing about regions, cities, and cultures." },
      { name: "Abu Zayd al-Balkhi", period: "850–934", description: "Contributed to geography and regional mapping alongside broader intellectual work." },
      { name: "Ibn Battuta", period: "1304–1368/69", description: "Though best known as a traveler, his travel writings preserve valuable geographic and social observations." },
    ],
  },
].map((field) => [field.field, field] as const));

export const scholarFields: ScholarField[] = [
  ...featuredScholarFieldOrder.map((field) => scholarFieldsByField.get(field)!),
  ...[...scholarFieldsByField.values()].filter(
    (field) => !featuredScholarFieldOrder.includes(field.field as (typeof featuredScholarFieldOrder)[number]),
  ),
];

const scholarFieldShortSlug: Record<(typeof featuredScholarFieldOrder)[number], string> = {
  "Astronomy and Observational Science": "astronomy",
  "Mathematics and Measurement": "mathematics",
  "Medicine, Surgery, and Pharmacology": "medicine",
  "Philosophy, Logic, and Intellectual Tradition": "philosophy",
  "Engineering, Mechanics, and Invention": "engineering",
  "Geography, Cartography, and Earth Sciences": "geography",
};

function slugifyScholarName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildScholarProfiles(): ScholarProfile[] {
  const nameCounts = new Map<string, number>();

  for (const field of scholarFields) {
    for (const scholar of field.scholars) {
      nameCounts.set(scholar.name, (nameCounts.get(scholar.name) ?? 0) + 1);
    }
  }

  return scholarFields.flatMap((field) =>
    field.scholars.map((scholar) => {
      const nameSlug = slugifyScholarName(scholar.name);
      const fieldKey = field.field as (typeof featuredScholarFieldOrder)[number];
      const slug =
        (nameCounts.get(scholar.name) ?? 0) > 1
          ? `${nameSlug}-${scholarFieldShortSlug[fieldKey]}`
          : nameSlug;

      return {
        ...scholar,
        slug,
        field: field.field,
        image: getScholarPortrait(slug) ?? scholarFieldImages[fieldKey] ?? libraryHouseOfWisdom,
      };
    }),
  );
}

export const scholarProfiles = buildScholarProfiles();

export function getScholarBySlug(slug: string): ScholarProfile | undefined {
  return scholarProfiles.find((scholar) => scholar.slug === slug);
}

export function getScholarPath(slug: string): `/scientists/${string}` {
  return `/scientists/${slug}`;
}
