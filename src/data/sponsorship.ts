export interface SponsorshipTier {
  id: string;
  name: string;
  price: string;
  description: string;
  benefits: string[];
}

export const sponsorshipTiers: SponsorshipTier[] = [
  {
    id: "silver",
    name: "Silver",
    price: "$1,000",
    description: "Community Sponsor for businesses, professionals and organizations.",
    benefits: [
      "Logo placement on event materials",
      "Website recognition",
      "Recognition during sponsor acknowledgments",
      "Social media recognition",
      "Quarter page digital program advertisement",
      "Reserved seating for 4 guests",
      "Community networking visibility",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: "$2,500",
    description: "Supporting Sponsor with strong event and digital recognition.",
    benefits: [
      "Prominent logo placement",
      "Recognition during the event",
      "Website sponsor spotlight",
      "Social media recognition",
      "Half page digital program advertisement",
      "Reserved seating for 6 guests",
      "Opportunity to display promotional material",
      "Logo in post event communications",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    price: "$5,000",
    description: "Presenting Sponsor with premier visibility and leadership recognition.",
    benefits: [
      "Presenting Sponsor recognition",
      "Premier logo placement on event materials",
      "Podium recognition during opening remarks",
      "Featured sponsor spotlight on website",
      "Dedicated social media recognition campaign",
      "Full page digital program advertisement",
      "Reserved premium seating for 8 guests",
      "Opportunity to display promotional material",
      "Logo in post event communications",
    ],
  },
];
