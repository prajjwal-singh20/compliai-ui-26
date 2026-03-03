export const complianceData = {
  recommendedStructure: "Private Limited Company",
  whyThisStructure:
    "Best suited for tech startups planning to raise funding, give ESOPs, and scale across India. Investors and accelerators generally prefer this structure.",
  registrations: [
    {
      name: "DIN",
      whyRequired:
        "Each director needs a Director Identification Number to be legally allowed to act as a director and sign ROC forms.",
      estimatedFeeINR: "₹500–₹2,000 per director",
      processingTime: "1–3 days"
    },
    {
      name: "PAN",
      whyRequired:
        "Company PAN is needed to open a current account, pay taxes, and issue valid invoices.",
      estimatedFeeINR: "₹0–₹500",
      processingTime: "7–15 days"
    },
    {
      name: "TAN",
      whyRequired:
        "Required if the company deducts TDS on salaries, contractors, or rent.",
      estimatedFeeINR: "₹65–₹1,500",
      processingTime: "5–10 days"
    },
    {
      name: "GST",
      whyRequired:
        "Compulsory once turnover crosses the GST threshold or for interstate supply/export of services.",
      estimatedFeeINR: "₹0–₹5,000",
      processingTime: "5–15 days"
    },
    {
      name: "MSME (Udyam)",
      whyRequired:
        "Registers the startup as a micro/small enterprise, making it easier to access schemes and loans.",
      estimatedFeeINR: "₹0–₹3,000",
      processingTime: "Same day to 2 days"
    },
    {
      name: "Shops & Establishment License",
      whyRequired:
        "State-level registration for the office where employees work; covers basic labour compliances.",
      estimatedFeeINR: "₹1,000–₹15,000",
      processingTime: "7–21 days"
    },
    {
      name: "Trademark Registration",
      whyRequired:
        "Protects the brand name and logo from being copied; very important for consumer-facing products.",
      estimatedFeeINR: "₹9,000–₹25,000 per class",
      processingTime: "12–24 months (protection starts earlier)"
    },
    {
      name: "Import Export Code",
      whyRequired:
        "Needed if you export services or receive payments from foreign customers.",
      estimatedFeeINR: "₹500–₹6,000",
      processingTime: "3–10 days"
    },
    {
      name: "Startup India Recognition",
      whyRequired:
        "Gives DPIIT startup status, improves fundraising perception and access to schemes.",
      estimatedFeeINR: "₹0–₹5,000",
      processingTime: "2–6 weeks"
    }
  ],
  estimatedTotalCostINR: "₹25,000–₹90,000 (including one trademark class)",
  timeline:
    "Around 4–8 weeks for most registrations; trademark registration takes 12–24 months.",
  documentsRequired: [
    "PAN, Aadhaar, and photos of all founders/directors",
    "Address proof of founders/directors (bank statement, utility bill, or Aadhaar with current address)",
    "Proposed company name options and short business description",
    "Registered office proof: recent electricity/maintenance bill plus rent agreement or owner NOC",
    "Founders’ shareholding split and authorised capital plan",
    "Basic founder agreement and ESOP intent (if any)",
    "Logo file and brand name details for trademark filing"
  ],
  riskAlerts: [
    "Assuming a typical early-stage tech startup in a major Indian city; state-specific rules may vary.",
    "GST threshold breach can trigger tax, interest, and penalties if registration is delayed.",
    "Trademark conflicts may force a rebrand if you do not check and file early.",
    "Late ROC filings attract per-day penalties and can hurt fundraising readiness.",
    "Director KYC (DIR-3 KYC) lapses can temporarily block directors from signing ROC forms."
  ],
  complianceChecklist: [
    "Incorporate as a Private Limited Company with a clear founder cap table.",
    "Obtain DIN for all directors and keep DIR-3 KYC updated annually.",
    "Get PAN, TAN, and open a company current account for all transactions.",
    "Register under GST when threshold or business model requires it and file returns on time.",
    "Apply for MSME (Udyam) registration after incorporation.",
    "Take Shops & Establishment License for your office location within the state deadline.",
    "File for Startup India recognition with a simple pitch deck and clear innovation angle.",
    "File a trademark application for your brand name and logo as early as possible.",
    "Publish Terms of Use, Privacy Policy, and Refund Policy on your MERN app.",
    "Create a simple compliance calendar for ROC, GST, TDS, and labour law dates."
  ]
};

