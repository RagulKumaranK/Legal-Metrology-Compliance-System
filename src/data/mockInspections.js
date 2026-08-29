export const INITIAL_INSPECTIONS = [
  {
    id: "INS-2026-001",
    name: "Amul Gold Milk",
    category: "Dairy & Beverages",
    netQuantity: "500 ml",
    manufacturer: "Gujarat Cooperative Milk Marketing Federation Ltd.",
    mrp: "₹34.00 (Incl. of all taxes)",
    date: "05 Sep 2026",
    time: "10:30 AM",
    rawTimestamp: "2026-09-05T10:30:00",
    status: "COMPLIANT",
    complianceScore: 100,
    checks: { total: 12, passed: 12, violations: 0, warnings: 0 },
    violationsList: [],
    ocrExtracted: {
      productName: "Amul Gold Pasteurised Full Cream Milk",
      netQty: "500 ml",
      mrpText: "MRP Rs 34.00 (INCL. OF ALL TAXES)",
      mfgDate: "04/09/2026",
      countryOfOrigin: "India",
      customerCare: "1800 258 3333 / customercare@amul.coop"
    },
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "INS-2026-002",
    name: "Britannia Biscuits",
    category: "Packaged Snacks",
    netQuantity: "250 g",
    manufacturer: "Britannia Industries Limited",
    mrp: "₹30.00",
    date: "05 Sep 2026",
    time: "09:15 AM",
    rawTimestamp: "2026-09-05T09:15:00",
    status: "NON-COMPLIANT",
    complianceScore: 58,
    checks: { total: 12, passed: 7, violations: 3, warnings: 2 },
    violationsList: [
      { id: 1, title: "MRP Declaration", desc: "Font height of MRP text is below 1.5mm mandatory requirement (Rule 9)." },
      { id: 2, title: "Mandatory Declaration", desc: "Country of Origin declaration missing on secondary package." },
      { id: 3, title: "Customer Care Details", desc: "Email ID not provided in consumer grievance address." }
    ],
    ocrExtracted: {
      productName: "Britannia Good Day Butter Biscuits",
      netQty: "250 g",
      mrpText: "MRP Rs 30.00",
      mfgDate: "01/09/2026",
      countryOfOrigin: "NOT FOUND",
      customerCare: "Call 1800 425 4444"
    },
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "INS-2026-003",
    name: "Tata Salt Iodised",
    category: "Grocery & Staples",
    netQuantity: "1 kg",
    manufacturer: "Tata Consumer Products Limited",
    mrp: "₹28.00 (Incl. of all taxes)",
    date: "04 Sep 2026",
    time: "05:45 PM",
    rawTimestamp: "2026-09-04T17:45:00",
    status: "NON-COMPLIANT",
    complianceScore: 72,
    checks: { total: 12, passed: 8, violations: 3, warnings: 1 },
    violationsList: [
      { id: 1, title: "MRP Declaration", desc: "MRP not declared clearly on the front/back display panel." },
      { id: 2, title: "Mandatory Declaration", desc: "Country of Origin statement is missing." },
      { id: 3, title: "Readability", desc: "Batch & Date text is blurred/not clearly readable." }
    ],
    ocrExtracted: {
      productName: "Tata Salt Vacuum Evaporated Iodised Salt",
      netQty: "1 kg",
      mrpText: "MRP: UNREADABLE",
      mfgDate: "AUG 2026",
      countryOfOrigin: "MISSING",
      customerCare: "customercare@tataconsumer.com"
    },
    image: "https://images.unsplash.com/photo-1626197031507-c170a045c697?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "INS-2026-004",
    name: "Surf Excel Easy Wash",
    category: "Household Cleaning",
    netQuantity: "2 kg",
    manufacturer: "Hindustan Unilever Limited",
    mrp: "₹240.00 (Incl. of all taxes)",
    date: "03 Sep 2026",
    time: "04:20 PM",
    rawTimestamp: "2026-09-03T16:20:00",
    status: "COMPLIANT",
    complianceScore: 98,
    checks: { total: 12, passed: 12, violations: 0, warnings: 0 },
    violationsList: [],
    ocrExtracted: {
      productName: "Surf Excel Easy Wash Detergent Powder",
      netQty: "2 kg",
      mrpText: "MRP Rs 240.00 (INCL. OF ALL TAXES)",
      mfgDate: "28/08/2026",
      countryOfOrigin: "Made in India",
      customerCare: "1800 102 2221 / lever.care@unilever.com"
    },
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "INS-2026-005",
    name: "Parle-G Biscuits",
    category: "Packaged Snacks",
    netQuantity: "120 g",
    manufacturer: "Parle Products Pvt Ltd.",
    mrp: "₹10.00",
    date: "02 Sep 2026",
    time: "11:10 AM",
    rawTimestamp: "2026-09-02T11:10:00",
    status: "NON-COMPLIANT",
    complianceScore: 64,
    checks: { total: 12, passed: 7, violations: 4, warnings: 1 },
    violationsList: [
      { id: 1, title: "Net Quantity Display", desc: "Font size for '120 g' is smaller than standard 3mm requirement (Rule 7)." },
      { id: 2, title: "Unit Representation", desc: "Symbol 'gm' used instead of standard 'g'." },
      { id: 3, title: "Consumer Helpline", desc: "Telephone number missing from contact details." }
    ],
    ocrExtracted: {
      productName: "Parle-G Original Glucose Biscuits",
      netQty: "120 gm",
      mrpText: "MRP Rs 10.00",
      mfgDate: "25/08/2026",
      countryOfOrigin: "India",
      customerCare: "cs@parle.biz"
    },
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "INS-2026-006",
    name: "Dabur Red Paste",
    category: "Personal Care",
    netQuantity: "200 g",
    manufacturer: "Dabur India Limited",
    mrp: "₹115.00 (Incl. of all taxes)",
    date: "01 Sep 2026",
    time: "02:15 PM",
    rawTimestamp: "2026-09-01T14:15:00",
    status: "PENDING",
    complianceScore: 82,
    checks: { total: 12, passed: 10, violations: 1, warnings: 1 },
    violationsList: [
      { id: 1, title: "Verification Pending", desc: "Secondary barcode requires central laboratory verification." }
    ],
    ocrExtracted: {
      productName: "Dabur Red Ayurvedic Toothpaste",
      netQty: "200 g",
      mrpText: "MRP Rs 115.00 (INCL. OF ALL TAXES)",
      mfgDate: "15/08/2026",
      countryOfOrigin: "India",
      customerCare: "1800 103 1644 / daburcare@dabur.com"
    },
    image: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=400&q=80"
  }
];

export const DEMO_RULE_DESCRIPTIONS = [
  { rule: "Rule 6(1)(a)", name: "Name and Address of Manufacturer/Packer", mandatory: true },
  { rule: "Rule 6(1)(b)", name: "Country of Origin for Imported/Packaged Products", mandatory: true },
  { rule: "Rule 6(1)(c)", name: "Common or Generic Name of Commodity", mandatory: true },
  { rule: "Rule 6(1)(d)", name: "Net Quantity in Standard Metric Units", mandatory: true },
  { rule: "Rule 6(1)(e)", name: "Month and Year of Manufacture or Packaging", mandatory: true },
  { rule: "Rule 6(1)(f)", name: "Maximum Retail Price (MRP) inclusive of all taxes", mandatory: true },
  { rule: "Rule 6(1)(g)", name: "Dimensions/Size of Commodity (where applicable)", mandatory: false },
  { rule: "Rule 6(2)", name: "Consumer Care Contact Name, Address & Phone/Email", mandatory: true }
];
