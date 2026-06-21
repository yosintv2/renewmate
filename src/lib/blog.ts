export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  coverEmoji: string;
  content: BlogSection[];
};

export type BlogSection = {
  type: "h2" | "h3" | "p" | "ul" | "ol" | "tip" | "warning";
  text?: string;
  items?: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-renew-vehicle-tax-nepal",
    title: "How to Renew Vehicle Tax in Nepal: Complete 2024 Guide",
    excerpt:
      "A complete walkthrough of renewing vehicle tax in Nepal — deadlines, required documents, fees, and how to avoid costly late charges.",
    date: "2024-11-10",
    readTime: "5 min read",
    category: "Guide",
    coverEmoji: "🚗",
    content: [
      {
        type: "p",
        text: "Vehicle tax — also called road tax or vehicle tax — is one of the most critical annual renewals for every vehicle owner in Nepal. Failing to renew it on time results in fines, and in serious cases, your vehicle can be seized. This guide explains everything you need to know to renew your vehicle tax without stress.",
      },
      {
        type: "h2",
        text: "When Is Vehicle Tax Due?",
      },
      {
        type: "p",
        text: "In Nepal, vehicle tax is typically due annually, aligned with the Nepali fiscal year (mid-July to mid-July). However, renewal windows and exact deadlines vary slightly by province and vehicle type. Generally, you should plan to renew your vehicle tax every year before Shrawan 15 (approximately August 1) to avoid penalties.",
      },
      {
        type: "h2",
        text: "Documents Required",
      },
      {
        type: "ul",
        items: [
          "Original bluebook (vehicle registration certificate)",
          "Previous year's vehicle tax payment receipt",
          "Pollution test certificate (valid)",
          "Insurance certificate (valid)",
          "Citizenship certificate of the vehicle owner",
        ],
      },
      {
        type: "h2",
        text: "Step-by-Step Renewal Process",
      },
      {
        type: "ol",
        items: [
          "Visit the nearest District Transport Management Office (DTMO) or province transport office.",
          "Get the vehicle tax payment form from the counter.",
          "Fill in your vehicle number, type, engine capacity, and owner details.",
          "Submit the form along with required documents.",
          "Pay the tax amount at the revenue counter or authorized bank.",
          "Collect your updated tax sticker and payment receipt.",
        ],
      },
      {
        type: "h2",
        text: "Vehicle Tax Rates (Approximate)",
      },
      {
        type: "p",
        text: "Tax rates vary by vehicle type and engine capacity. As a rough guide: motorcycles up to 125cc pay Rs. 1,500–2,500 per year; cars 1000–1800cc pay Rs. 5,000–12,000 per year; and trucks pay according to their load capacity. Check with your local DTMO for the exact rate applicable to your vehicle.",
      },
      {
        type: "h2",
        text: "Late Payment Penalties",
      },
      {
        type: "p",
        text: "Failing to pay your vehicle tax on time attracts a penalty of approximately 10% of the tax amount per year, compounded. If you miss the renewal for multiple years, the cumulative fines can be substantial — often more than the tax itself. Always renew before the deadline.",
      },
      {
        type: "tip",
        text: "Set a reminder in RenewMate at least 30 days before your vehicle tax expiry. The app will send you alerts at 30, 15, 7, 3, and 1 day before the due date so you never miss it.",
      },
    ],
  },
  {
    slug: "bluebook-renewal-process-nepal",
    title: "Bluebook Renewal in Nepal: Step-by-Step Process",
    excerpt:
      "The bluebook is the most important document for your vehicle. Learn exactly how to renew it, what documents you need, and how long it takes.",
    date: "2024-11-18",
    readTime: "6 min read",
    category: "Guide",
    coverEmoji: "📋",
    content: [
      {
        type: "p",
        text: "The bluebook (Prasaripatra) is Nepal's vehicle registration certificate and is one of the most critical documents for any vehicle owner. Renewing it on time is not just a legal requirement — it's essential proof that your vehicle is registered with the government.",
      },
      {
        type: "h2",
        text: "What Is the Bluebook?",
      },
      {
        type: "p",
        text: "The bluebook is an official document issued by the Department of Transport Management (DoTM) that certifies your vehicle's ownership and registration. It contains details like the vehicle number, engine number, chassis number, owner's name, and renewal history.",
      },
      {
        type: "h2",
        text: "When Does It Need Renewal?",
      },
      {
        type: "p",
        text: "The bluebook is renewed annually along with the vehicle tax. In Nepal, bluebook renewal typically coincides with the fiscal year deadline (around Shrawan 15). If you miss the deadline, you will be fined, and driving without a valid bluebook is illegal and can lead to vehicle impoundment.",
      },
      {
        type: "h2",
        text: "Documents Required for Renewal",
      },
      {
        type: "ul",
        items: [
          "Original bluebook",
          "Valid vehicle insurance certificate",
          "Valid pollution test certificate",
          "Previous year's tax payment receipt",
          "Owner's citizenship certificate",
        ],
      },
      {
        type: "h2",
        text: "Renewal Process (Step by Step)",
      },
      {
        type: "ol",
        items: [
          "Ensure your pollution test is valid before you go to the DTMO.",
          "Ensure your vehicle insurance is valid and not expired.",
          "Go to your provincial DTMO or authorized transport office.",
          "Submit your documents at the bluebook renewal counter.",
          "Pay the renewal fee and vehicle tax simultaneously.",
          "The officer will stamp and update your bluebook.",
          "If your bluebook pages are full, you may be issued a new volume.",
        ],
      },
      {
        type: "h2",
        text: "Online Bluebook Renewal",
      },
      {
        type: "p",
        text: "Nepal's DoTM has been progressively introducing online services. As of 2024, some provinces allow online appointment booking for bluebook renewal. Check the official Nagarik App or your provincial transport website to see if online renewal is available in your area.",
      },
      {
        type: "warning",
        text: "Always check that your pollution test and insurance are valid before going for bluebook renewal. If either has expired, your renewal will be rejected.",
      },
    ],
  },
  {
    slug: "vehicle-insurance-nepal-guide",
    title: "Vehicle Insurance in Nepal: Types, Cost & How to Renew",
    excerpt:
      "Everything you need to know about vehicle insurance in Nepal — types of coverage, costs, top insurers, and the renewal process.",
    date: "2024-12-01",
    readTime: "5 min read",
    category: "Insurance",
    coverEmoji: "🛡️",
    content: [
      {
        type: "p",
        text: "Vehicle insurance is mandatory for all motorized vehicles in Nepal. Without valid insurance, you cannot renew your bluebook or legally drive on public roads. This guide covers everything from the types of insurance to the renewal process.",
      },
      {
        type: "h2",
        text: "Types of Vehicle Insurance in Nepal",
      },
      {
        type: "ul",
        items: [
          "Third-Party Insurance: The minimum required by law. Covers damage or injury caused to third parties but not your own vehicle.",
          "Comprehensive Insurance: Covers third-party liability plus damage to your own vehicle from accidents, fire, theft, and natural disasters.",
          "Personal Accident Cover: Additional cover for the driver and passengers in case of injury or death.",
        ],
      },
      {
        type: "h2",
        text: "Approximate Insurance Costs",
      },
      {
        type: "p",
        text: "Third-party insurance for a motorcycle starts at around Rs. 700–1,500 per year. For cars, third-party costs Rs. 2,000–5,000 per year depending on engine capacity. Comprehensive insurance is significantly more expensive — typically 1–3% of the vehicle's market value annually.",
      },
      {
        type: "h2",
        text: "Top Insurance Companies in Nepal",
      },
      {
        type: "ul",
        items: [
          "Rastriya Beema Company (National Insurance Corporation)",
          "Nepal Insurance Company",
          "Himalayan General Insurance",
          "Shikhar Insurance",
          "Premier Insurance",
          "Nepal Life Insurance (for PA cover)",
        ],
      },
      {
        type: "h2",
        text: "How to Renew Vehicle Insurance",
      },
      {
        type: "ol",
        items: [
          "Contact your existing insurer or visit their nearest branch.",
          "Bring your current insurance certificate and bluebook.",
          "Fill in the renewal form with updated vehicle details.",
          "Pay the premium amount (cash, cheque, or eSewa/Khalti).",
          "Receive your new insurance certificate and sticker.",
        ],
      },
      {
        type: "tip",
        text: "Compare premiums from at least 2–3 insurers before renewing. You can often get better rates by switching providers. Make sure the new insurer is IBAN-registered.",
      },
    ],
  },
  {
    slug: "pollution-test-requirements-nepal",
    title: "Vehicle Pollution Test in Nepal: All You Need to Know",
    excerpt:
      "Nepal's pollution test (emision test) is required for all vehicles. Find out the standards, testing centers, costs, and renewal frequency.",
    date: "2024-12-10",
    readTime: "4 min read",
    category: "Guide",
    coverEmoji: "🌿",
    content: [
      {
        type: "p",
        text: "The vehicle pollution test (also called the emission test or smoke test) is a mandatory check that ensures your vehicle's exhaust emissions meet Nepal's environmental standards. A valid pollution certificate is required to renew your bluebook each year.",
      },
      {
        type: "h2",
        text: "Who Needs a Pollution Test?",
      },
      {
        type: "p",
        text: "All motorized vehicles registered in Nepal are required to pass a pollution test annually. This includes motorcycles, scooters, cars, jeeps, vans, buses, and trucks. Electric vehicles are exempt from the emission test.",
      },
      {
        type: "h2",
        text: "Emission Standards in Nepal",
      },
      {
        type: "p",
        text: "Nepal follows BS-IV (Bharat Stage IV) emission standards for petrol vehicles and BS-II/III for older diesel vehicles. The test measures CO (carbon monoxide), HC (hydrocarbons), and NOx (nitrogen oxides) levels from the exhaust.",
      },
      {
        type: "h2",
        text: "Where to Get the Test Done",
      },
      {
        type: "p",
        text: "Pollution testing centers (authorized by DoTM) are available in major cities across all provinces. In Kathmandu, several testing centers are located in Teku, Balaju, and Kalanki. Contact your local DTMO for the nearest authorized center.",
      },
      {
        type: "h2",
        text: "Cost of the Pollution Test",
      },
      {
        type: "ul",
        items: [
          "Motorcycles/Scooters: Rs. 150–250",
          "Cars/Jeeps: Rs. 300–500",
          "Trucks/Buses: Rs. 500–1,000",
        ],
      },
      {
        type: "h2",
        text: "What Happens if You Fail?",
      },
      {
        type: "p",
        text: "If your vehicle fails the emission test, you will be given a period to fix the issue (typically 30 days). Common fixes include replacing spark plugs, cleaning the air filter, or adjusting the carburetor. After repairs, you can retest at no extra charge within the grace period.",
      },
      {
        type: "warning",
        text: "Getting the pollution test done is the first step — do it before visiting DTMO for bluebook renewal. DTMO offices will reject your renewal if the pollution certificate is expired.",
      },
    ],
  },
  {
    slug: "avoid-late-fees-vehicle-renewal-nepal",
    title: "5 Smart Ways to Avoid Late Vehicle Renewal Fees in Nepal",
    excerpt:
      "Late renewal fees add up fast. Here are 5 practical strategies Nepal vehicle owners use to stay on top of deadlines and avoid unnecessary fines.",
    date: "2024-12-20",
    readTime: "4 min read",
    category: "Tips",
    coverEmoji: "💡",
    content: [
      {
        type: "p",
        text: "Late fees for vehicle renewals in Nepal can be surprisingly steep. A missed vehicle tax deadline means a 10% annual penalty on top of the tax itself. Over several years of neglect, this can add thousands of rupees in avoidable costs. Here are five proven strategies to stay ahead of all your renewal deadlines.",
      },
      {
        type: "h2",
        text: "1. Use a Digital Reminder App",
      },
      {
        type: "p",
        text: "The single most effective tool is a dedicated vehicle renewal tracker like RenewMate. It tracks all four renewal types (tax, bluebook, insurance, pollution test) for every vehicle you own and sends you alerts at 30, 15, 7, 3, and 1 day before each deadline. You will never forget again.",
      },
      {
        type: "h2",
        text: "2. Mark All Expiry Dates in One Calendar",
      },
      {
        type: "p",
        text: "If you prefer manual tracking, open Google Calendar or any calendar app and set repeating annual reminders for each renewal type for each vehicle. Set them to trigger 45 days before the expiry date — this gives you enough runway to sort out insurance and pollution tests before going to the DTMO.",
      },
      {
        type: "h2",
        text: "3. Renew Everything Together",
      },
      {
        type: "p",
        text: "In Nepal, vehicle tax and bluebook renewal happen simultaneously at the DTMO. Try to align your insurance and pollution test renewals to the same period. This way, you only have to visit the offices once per year rather than making separate trips for each document.",
      },
      {
        type: "h2",
        text: "4. Renew Early, Not on the Last Day",
      },
      {
        type: "p",
        text: "DTMO offices in Nepal can get extremely crowded in the final week before the fiscal year deadline. Lines can mean a half-day wait. Renewing 3–4 weeks before the deadline means shorter queues and a much less stressful experience.",
      },
      {
        type: "h2",
        text: "5. Store All Document Expiry Dates in One Place",
      },
      {
        type: "p",
        text: "Take photos of all your renewal documents and note the expiry dates somewhere permanent — a note on your phone, a spreadsheet, or a tool like RenewMate. When you know all four expiry dates at a glance, planning renewals becomes trivial.",
      },
      {
        type: "tip",
        text: "The cost of a vehicle renewal reminder app is a fraction of the fine you pay for even one missed deadline. It pays for itself the first time it saves you from a late fee.",
      },
    ],
  },
  {
    slug: "read-nepal-vehicle-number-plate",
    title: "How to Read Nepal Vehicle Number Plates (With Examples)",
    excerpt:
      "Nepal's vehicle number plate system encodes the province, vehicle type, and serial number. Learn to decode any plate in Nepal.",
    date: "2025-01-05",
    readTime: "4 min read",
    category: "Knowledge",
    coverEmoji: "🔢",
    content: [
      {
        type: "p",
        text: "Nepal's vehicle number plates follow a systematic format that encodes useful information about the vehicle — specifically the province it is registered in, the vehicle class, and its serial number. Once you understand the format, you can tell at a glance where any vehicle in Nepal is from.",
      },
      {
        type: "h2",
        text: "The Standard Format",
      },
      {
        type: "p",
        text: "A standard Nepal vehicle plate looks like: BA 1 JA 1234. Let's break it down:",
      },
      {
        type: "ul",
        items: [
          "BA — Province code (Bagmati Province = BA)",
          "1 — Vehicle class code (1 = private vehicle)",
          "JA — Sequence letters assigned in order of registration",
          "1234 — Serial number (4 digits)",
        ],
      },
      {
        type: "h2",
        text: "Province Codes",
      },
      {
        type: "ul",
        items: [
          "KO — Koshi Province (Province 1)",
          "MA — Madhesh Province (Province 2)",
          "BA — Bagmati Province (Province 3)",
          "GA — Gandaki Province (Province 4)",
          "LU — Lumbini Province (Province 5)",
          "KA — Karnali Province (Province 6)",
          "SU — Sudurpashchim Province (Province 7)",
        ],
      },
      {
        type: "h2",
        text: "Vehicle Class Codes",
      },
      {
        type: "ul",
        items: [
          "1 — Private vehicles (cars, jeeps, personal use)",
          "2 — Public transportation (minibus, tempo, taxi)",
          "3 — Goods vehicles (trucks, pickups)",
          "4 — Government vehicles",
          "5 — Diplomatic vehicles",
        ],
      },
      {
        type: "h2",
        text: "Special Plates",
      },
      {
        type: "p",
        text: "Red plates indicate government-owned vehicles. Blue plates are for diplomatic vehicles. Green plates are being introduced for electric vehicles (EVs) in Nepal.",
      },
      {
        type: "tip",
        text: "When adding your vehicle to RenewMate, enter the plate number exactly as it appears on your bluebook, including spaces — e.g., BA 1 JA 1234.",
      },
    ],
  },
  {
    slug: "electric-vehicle-registration-nepal",
    title: "Electric Vehicle Registration and Renewal in Nepal (2025 Guide)",
    excerpt:
      "Nepal's EV market is booming. Here's how to register an electric vehicle, what documents you need, and how renewal differs from petrol vehicles.",
    date: "2025-01-15",
    readTime: "5 min read",
    category: "Electric Vehicles",
    coverEmoji: "⚡",
    content: [
      {
        type: "p",
        text: "Nepal has seen a dramatic rise in electric vehicle (EV) adoption, driven by rising petrol prices and government incentives. From electric motorcycles to imported electric cars like the BYD Atto and Hyundai Ioniq, EVs are now a mainstream choice. This guide covers EV registration and renewal specifics.",
      },
      {
        type: "h2",
        text: "EV Registration in Nepal",
      },
      {
        type: "p",
        text: "Registering an EV in Nepal follows largely the same process as petrol/diesel vehicles through the DTMO. You will need the vehicle invoice from the authorized importer, RUCCA certificate (compliance certificate), and your citizenship document. The key difference is that EVs receive a green number plate.",
      },
      {
        type: "h2",
        text: "Documents Required for EV Registration",
      },
      {
        type: "ul",
        items: [
          "Invoice from authorized importer/dealer",
          "RUCCA (Road User Certificate of Conformity) certificate",
          "Customs clearance certificate",
          "Owner's citizenship certificate",
          "Insurance certificate (valid)",
          "Passport-size photos",
        ],
      },
      {
        type: "h2",
        text: "How EV Renewal Differs",
      },
      {
        type: "p",
        text: "Electric vehicles enjoy several advantages during renewal: they are exempt from the pollution test (no emissions to measure), and the government has offered reduced vehicle tax rates for EVs as an incentive for adoption. Check your province's current EV tax rate with the DTMO.",
      },
      {
        type: "h2",
        text: "EV Tax Benefits in Nepal",
      },
      {
        type: "p",
        text: "The Government of Nepal has periodically offered reduced customs duty (as low as 1%) and lower road taxes for EVs to encourage adoption. These policies change with each budget — stay updated through the Nepal Rastra Bank and DoTM announcements.",
      },
      {
        type: "h2",
        text: "Charging Infrastructure",
      },
      {
        type: "p",
        text: "Kathmandu Valley now has over 50 public EV charging stations. The NEA (Nepal Electricity Authority) is actively expanding this network. Charging at home using a standard 15-amp outlet is common for two-wheelers; four-wheelers typically need a Type 2 AC charger.",
      },
      {
        type: "tip",
        text: "Even though EVs are exempt from pollution tests, you still need to renew vehicle tax and insurance annually. RenewMate tracks all your EV renewals too.",
      },
    ],
  },
  {
    slug: "vehicle-ownership-transfer-nepal",
    title: "How to Transfer Vehicle Ownership in Nepal: Complete Guide",
    excerpt:
      "Buying or selling a vehicle? The ownership transfer process in Nepal has specific steps and documents. This guide walks you through everything.",
    date: "2025-01-28",
    readTime: "6 min read",
    category: "Guide",
    coverEmoji: "🔄",
    content: [
      {
        type: "p",
        text: "Whether you are buying a used vehicle or selling one, transferring ownership (namasari) is a legal requirement in Nepal. Failing to complete the transfer means the vehicle remains in the seller's name, creating legal complications for both parties.",
      },
      {
        type: "h2",
        text: "When Is Transfer Required?",
      },
      {
        type: "p",
        text: "Any time a vehicle changes hands — through sale, gift, inheritance, or court order — the ownership must be officially transferred at the DTMO. Driving a vehicle registered in someone else's name without completing the transfer is technically illegal.",
      },
      {
        type: "h2",
        text: "Documents Required (Both Parties)",
      },
      {
        type: "ul",
        items: [
          "Original bluebook",
          "All original tax payment receipts",
          "Valid insurance certificate",
          "Valid pollution test certificate",
          "Citizenship certificates of both buyer and seller",
          "Sale agreement / purchase deed (on stamp paper)",
          "Seller's tax clearance if applicable",
        ],
      },
      {
        type: "h2",
        text: "Step-by-Step Transfer Process",
      },
      {
        type: "ol",
        items: [
          "Ensure all existing dues (tax, penalties) are cleared.",
          "Both buyer and seller visit the DTMO together.",
          "Submit the transfer application form with all documents.",
          "Pay the transfer fee (calculated as a percentage of the vehicle's value).",
          "DTMO officer verifies documents and updates the bluebook.",
          "The new owner's name is entered in the bluebook — transfer complete.",
        ],
      },
      {
        type: "h2",
        text: "Transfer Fees",
      },
      {
        type: "p",
        text: "Transfer fees in Nepal are typically 5% of the vehicle's estimated market value for cars and 2% for motorcycles. The exact rates are set by the provincial government. A nominal DTMO service charge also applies.",
      },
      {
        type: "warning",
        text: "Never drive a vehicle you have purchased before the transfer is complete. If the previous owner has unpaid fines or the vehicle is linked to a legal case, you could be held responsible.",
      },
    ],
  },
  {
    slug: "road-safety-laws-nepal",
    title: "Nepal Road Safety Laws Every Driver Must Know in 2025",
    excerpt:
      "From speed limits to helmet laws, here are the key road safety rules in Nepal that every driver and rider must follow to stay legal and safe.",
    date: "2025-02-10",
    readTime: "5 min read",
    category: "Road Safety",
    coverEmoji: "🛣️",
    content: [
      {
        type: "p",
        text: "Nepal's road safety laws are governed primarily by the Motor Vehicles and Transport Management Act and the Transport Management Regulation. Understanding these rules helps you drive legally, avoid fines, and — most importantly — stay safe on Nepal's roads.",
      },
      {
        type: "h2",
        text: "Speed Limits",
      },
      {
        type: "ul",
        items: [
          "Inside Kathmandu Valley: 40 km/h for cars, 30 km/h in school zones",
          "National highways: 80 km/h for private vehicles",
          "Mountain roads: 40–60 km/h depending on road conditions",
          "Buses and trucks follow lower limits depending on vehicle class",
        ],
      },
      {
        type: "h2",
        text: "Helmet Law",
      },
      {
        type: "p",
        text: "Wearing a helmet is mandatory for both the rider and pillion passenger on all motorcycles and scooters throughout Nepal. The helmet must be ISI/DOT-certified. Riding without a helmet carries a fine and can affect your insurance claim in case of an accident.",
      },
      {
        type: "h2",
        text: "Seatbelt Rules",
      },
      {
        type: "p",
        text: "Seatbelts are mandatory for all occupants of four-wheeled vehicles in Nepal. Driving without a seatbelt is a fineable offense. Child safety seats are recommended but not yet mandated by law as of 2025.",
      },
      {
        type: "h2",
        text: "Drunk Driving Laws",
      },
      {
        type: "p",
        text: "Nepal has a zero-tolerance policy for drink driving. The legal blood alcohol limit is 0.03% (compared to 0.08% in many countries). Police conduct regular breathalyzer checkpoints, especially on weekends and holidays. Penalties include license suspension and criminal charges for repeat offenders.",
      },
      {
        type: "h2",
        text: "Mobile Phone Use While Driving",
      },
      {
        type: "p",
        text: "Using a handheld mobile phone while driving is illegal and carries a fine. Hands-free use is technically permitted, though it is still discouraged as a distraction.",
      },
      {
        type: "tip",
        text: "Keep digital copies of your driving license, bluebook, insurance, and pollution certificate on your phone. In case of a spot check, you can show them digitally though carrying originals is always recommended.",
      },
    ],
  },
  {
    slug: "vehicle-renewal-costs-nepal-provinces",
    title: "Vehicle Renewal Costs Across Nepal's 7 Provinces (2025)",
    excerpt:
      "Vehicle tax rates and renewal costs vary significantly between Nepal's 7 provinces. Here's a comparison to help you plan your annual renewal budget.",
    date: "2025-02-20",
    readTime: "5 min read",
    category: "Costs",
    coverEmoji: "💰",
    content: [
      {
        type: "p",
        text: "One of the less-known facts about vehicle ownership in Nepal is that renewal costs — particularly vehicle tax — are not uniform across the country. Each of Nepal's seven provinces has the authority to set its own tax rates within the limits defined by the central government. This means the cost of renewing your vehicle can vary depending on where it is registered.",
      },
      {
        type: "h2",
        text: "Vehicle Tax Rates by Province (Approximate 2025)",
      },
      {
        type: "p",
        text: "Rates below are approximate for a private car with 1300–1800cc engine capacity. Actual rates vary by engine size and vehicle type.",
      },
      {
        type: "ul",
        items: [
          "Koshi Province: Rs. 7,000–10,000/year",
          "Madhesh Province: Rs. 6,500–9,500/year",
          "Bagmati Province: Rs. 8,000–12,000/year (highest — includes Kathmandu)",
          "Gandaki Province: Rs. 7,000–10,000/year",
          "Lumbini Province: Rs. 6,000–9,000/year",
          "Karnali Province: Rs. 5,000–8,000/year (lowest rates)",
          "Sudurpashchim Province: Rs. 5,500–8,500/year",
        ],
      },
      {
        type: "h2",
        text: "Other Annual Renewal Costs to Budget For",
      },
      {
        type: "ul",
        items: [
          "Third-party insurance: Rs. 2,500–5,000 (car)",
          "Pollution test: Rs. 300–500 (car)",
          "DTMO service fee: Rs. 200–500",
          "Bluebook renewal stamp: Rs. 50–100",
        ],
      },
      {
        type: "h2",
        text: "Total Annual Renewal Cost (Car, Bagmati Province)",
      },
      {
        type: "p",
        text: "For a typical car registered in Bagmati Province (Kathmandu), expect to pay approximately Rs. 10,000–15,000 per year for all renewals combined. This includes vehicle tax, insurance, pollution test, and DTMO fees.",
      },
      {
        type: "h2",
        text: "How to Reduce Your Renewal Costs",
      },
      {
        type: "ul",
        items: [
          "Pay on time — late fees add 10% annually",
          "Compare insurance quotes from multiple providers",
          "If you drive an EV, enjoy reduced tax rates",
          "Check if your province offers early payment discounts",
        ],
      },
      {
        type: "tip",
        text: "Track all your renewal dates with RenewMate so you always know the total renewal cost coming up for all your vehicles at once. Use the dashboard to plan your budget months in advance.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== slug).slice(0, count);
}
