import React, { useState, useEffect } from "react";
import { calculateComplianceScore } from "./complianceScore";
import { complianceData as sampleComplianceData } from "./complianceData.sample";

function App({ data = sampleComplianceData }) {
  const [answers, setAnswers] = useState({
    businessName: "",
    businessType: "",
    city: "",
    consumers: "",
    expectedRevenue: "",
    founders: "2"
  });
  const [generatedCompliance, setGeneratedCompliance] = useState(null);
  const [generationId, setGenerationId] = useState(0);

  const compliance = generatedCompliance || null;
  const { score, label } = calculateComplianceScore(compliance);

  return (
    <div className="app-shell">
      <main className="app-inner">
        <Hero />
        <QuestionCard
          answers={answers}
          setAnswers={setAnswers}
          onGenerate={() => {
            const next = generateComplianceFromAnswers(answers);
            setGeneratedCompliance(next);
            setGenerationId((id) => id + 1);
          }}
        />
        <ScoreAndMeta
          compliance={compliance}
          score={score}
          label={label}
          generationId={generationId}
        />
        <MainGrids
          compliance={compliance}
          generationId={generationId}
        />
      </main>
      <ChatDock
        answers={answers}
        compliance={compliance}
        generationId={generationId}
      />
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div>
        <div className="hero-copy-kicker">
          <span className="hero-badge-dot" />
          Built for Indian founders
        </div>
        <h1 className="hero-title">
          Stay compliant.
          <br />
          <span className="highlight">Ship faster.</span>
        </h1>
        <p className="hero-subtitle">
          CompliAI asks a few questions about your startup, then turns
          India&apos;s complex compliance laws into a clear, personalised
          roadmap. Know exactly what you need to register, file, and protect.
        </p>
        <div className="hero-cta-row">
          <button
            className="hero-primary-btn"
            onClick={() => {
              const el = document.getElementById("compliance-breakdown");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            Get my compliance blueprint
            <span>→</span>
          </button>
          <a href="#risk" className="hero-secondary-link">
            See potential risks
            <span>→</span>
          </a>
        </div>
      </div>

      <div>
        <LiveScorePreview />
      </div>
    </section>
  );
}

function QuestionCard({ answers, setAnswers, onGenerate }) {
  return (
    <section style={{ marginBottom: 20 }}>
      <div className="card">
        <h2 className="section-title">Tell us about your startup</h2>
        <div className="card-header">
          <h3 className="card-title">Instant compliance blueprint</h3>
          <span className="card-tag">Takes 30 seconds</span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 12,
            marginTop: 6
          }}
        >
          <FieldGroup label="Business name">
            <input
              type="text"
              placeholder="e.g. CompliAI Technologies"
              value={answers.businessName}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, businessName: e.target.value }))
              }
            />
          </FieldGroup>

          <FieldGroup label="Business type">
            <select
              value={answers.businessType}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, businessType: e.target.value }))
              }
            >
              <option value="">Select</option>
              <option value="saas">SaaS / product</option>
              <option value="marketplace">Marketplace / platform</option>
              <option value="d2c">D2C / e-commerce</option>
              <option value="services">Services / consulting</option>
              <option value="other">Other</option>
            </select>
          </FieldGroup>

          <FieldGroup label="Primary city">
            <input
              type="text"
              placeholder="e.g. Bengaluru"
              value={answers.city}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, city: e.target.value }))
              }
            />
          </FieldGroup>

          <FieldGroup label="Customers">
            <select
              value={answers.consumers}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, consumers: e.target.value }))
              }
            >
              <option value="">Select</option>
              <option value="b2b">B2B (businesses)</option>
              <option value="b2c">B2C (consumers)</option>
              <option value="b2b2c">B2B2C / marketplaces</option>
            </select>
          </FieldGroup>

          <FieldGroup label="Expected first-year revenue">
            <select
              value={answers.expectedRevenue}
              onChange={(e) =>
                setAnswers((prev) => ({
                  ...prev,
                  expectedRevenue: e.target.value
                }))
              }
            >
              <option value="">Select</option>
              <option value="<20L">Under ₹20 lakh</option>
              <option value="20-40L">₹20–40 lakh</option>
              <option value="40L-1Cr">₹40 lakh–₹1 crore</option>
              <option value=">1Cr">Above ₹1 crore</option>
            </select>
          </FieldGroup>

          <FieldGroup label="Number of founders">
            <select
              value={answers.founders}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, founders: e.target.value }))
              }
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3+">3 or more</option>
            </select>
          </FieldGroup>
        </div>
        <div
          style={{
            marginTop: 18,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap"
          }}
        >
          <button
            type="button"
            className="hero-primary-btn"
            onClick={onGenerate}
          >
            Generate my compliance score
            <span>→</span>
          </button>
          <p className="card-text" style={{ margin: 0, maxWidth: 360, fontSize: "0.85rem" }}>
            We use your answers to personalise the structure, registrations, risks, and
            checklist. No personal data is retained in this demo.
          </p>
        </div>
      </div>
    </section>
  );
}

function FieldGroup({ label, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span
        style={{
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--text-dim)",
          fontWeight: 600
        }}
      >
        {label}
      </span>
      {React.cloneElement(children, {
        style: {
          width: "100%",
          borderRadius: 999,
          border: "1px solid rgba(148,163,184,0.25)",
          padding: "9px 13px",
          fontSize: "0.9rem",
          background: "rgba(15,23,42,0.7)",
          color: "var(--text-primary)",
          outline: "none",
          transition: "all 0.2s ease",
          fontFamily: "inherit"
        },
        onFocus: (e) => {
          e.target.style.background = "rgba(15,23,42,0.95)";
          e.target.style.borderColor = "rgba(59,130,246,0.5)";
          e.target.style.boxShadow = "0 0 0 2px rgba(59,130,246,0.1)";
        },
        onBlur: (e) => {
          e.target.style.background = "rgba(15,23,42,0.7)";
          e.target.style.borderColor = "rgba(148,163,184,0.25)";
          e.target.style.boxShadow = "none";
        }
      })}
    </label>
  );
}

function LiveScorePreview() {
  return (
    <div className="score-card">
      <div className="score-chip">Live score example</div>
      <div className="score-main-row">
        <div className="score-circle">
          <span className="score-value">82</span>
        </div>
        <div className="score-meta">
          <div className="score-label">Compliance score</div>
          <p className="score-desc">
            Answer the questions below and your compliance score updates instantly.
            See how your startup&apos;s legal posture improves as you implement
            recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}

function ScoreAndMeta({ compliance, score, label, generationId }) {
  const hasCompliance = !!compliance;
  const meta = hasCompliance ? compliance.meta || {} : {};
  const summaryBits = [];
  if (meta.city) summaryBits.push(meta.city);
  if (meta.businessType) {
    const map = {
      saas: "SaaS",
      marketplace: "Marketplace",
      d2c: "D2C",
      services: "Services",
      other: "Other"
    };
    summaryBits.push(map[meta.businessType] || meta.businessType);
  }
  if (meta.consumers) {
    const map = {
      b2b: "B2B",
      b2c: "B2C",
      b2b2c: "B2B2C"
    };
    summaryBits.push(map[meta.consumers] || meta.consumers);
  }
  if (meta.expectedRevenue) {
    const map = {
      "<20L": "< ₹20L",
      "20-40L": "₹20–40L",
      "40L-1Cr": "₹40L–1Cr",
      ">1Cr": "> ₹1Cr"
    };
    summaryBits.push(map[meta.expectedRevenue] || meta.expectedRevenue);
  }
  if (meta.founders) summaryBits.push(`${meta.founders} founders`);

  return (
    <section
      id="compliance-breakdown"
      style={{ marginBottom: 24, marginTop: 10 }}
    >
      <div className="section-grid">
        <div
          key={`score-${generationId}`}
          className={`score-card ${
            generationId > 0 ? "card-animate-left" : ""
          }`}
        >
          <div className="score-chip">Your compliance radar</div>
          <div className="score-main-row">
            <div className="score-circle">
              <span className="score-value">{score}</span>
            </div>
            <div className="score-meta">
              <div className="score-label">
                {hasCompliance && generationId > 0 ? label : "Not generated yet"}
              </div>
              <p className="score-desc">
                {hasCompliance && generationId > 0
                  ? "This score blends registrations, documentation, and risk density. Use it to track whether your startup is investor-ready from a legal standpoint."
                  : "Answer the questions above and generate your roadmap to see a live compliance score and detailed recommendations here."}
              </p>
              {summaryBits.length > 0 && hasCompliance && generationId > 0 && (
                <div className="chip-row" style={{ marginTop: 6 }}>
                  <span className="chip">
                    Based on: {summaryBits.join(" · ")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          key={`structure-${generationId}`}
          className={`card ${generationId > 0 ? "card-animate-right" : ""}`}
        >
          <div className="card-header">
            <h3 className="card-title">Recommended structure</h3>
            <span className="card-tag">
              {hasCompliance && generationId > 0
                ? compliance.recommendedStructure
                : "Waiting for inputs"}
            </span>
          </div>
          <p className="card-text">
            {hasCompliance && generationId > 0
              ? compliance.whyThisStructure
              : "Once you generate your roadmap, we will suggest an Indian legal structure that fits your founders, revenue, and business model."}
          </p>
          <div className="chip-row" style={{ marginTop: 8 }}>
            <span className="chip">
              Est. Cost:{" "}
              {hasCompliance && generationId > 0
                ? compliance.estimatedTotalCostINR
                : "Will be estimated after generation"}
            </span>
            <span className="chip">
              Timeline:{" "}
              {hasCompliance && generationId > 0
                ? compliance.timeline
                : "Will be tailored to your answers"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function MainGrids({ compliance, generationId }) {
  const hasCompliance = !!compliance;
  const registrations = (compliance && compliance.registrations) || [];
  const docs = (compliance && compliance.documentsRequired) || [];
  const risks = (compliance && compliance.riskAlerts) || [];
  const checklist = (compliance && compliance.complianceChecklist) || [];

  return (
    <section id="risk" className="section-grid">
      <div
        className={generationId > 0 ? "card-animate-left" : ""}
        key={`left-column-${generationId}`}
        style={{ animationDelay: "0.05s" }}
      >
        <CardRegistrations
          registrations={registrations}
          hasCompliance={hasCompliance && generationId > 0}
        />
        <div style={{ height: 12 }} />
        <CardRisks
          risks={risks}
          hasCompliance={hasCompliance && generationId > 0}
        />
      </div>
      <div
        className={generationId > 0 ? "card-animate-right" : ""}
        key={`right-column-${generationId}`}
        style={{ animationDelay: "0.12s" }}
      >
        <CardDocuments
          docs={docs}
          hasCompliance={hasCompliance && generationId > 0}
        />
        <div style={{ height: 12 }} />
        <CardChecklist
          checklist={checklist}
          hasCompliance={hasCompliance && generationId > 0}
        />
      </div>
    </section>
  );
}

function CardRegistrations({ registrations, hasCompliance }) {
  return (
    <div className="card">
      <h2 className="section-title">📋 Registrations</h2>
      <div className="card-header">
        <h3 className="card-title">What you need to register</h3>
        <span className="card-tag">
          {registrations.length > 0
            ? `${registrations.length} items`
            : "No items"}
        </span>
      </div>
      <ul className="list">
        {hasCompliance &&
          registrations.map((reg) => (
            <li key={reg.name} className="list-item list-item-animated">
              <span className="list-bullet">●</span>
              <div>
                <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                  {reg.name}
                </div>
                <p className="card-text" style={{ marginTop: 2 }}>
                  {reg.whyRequired}
                </p>
                <div className="chip-row">
                  <span className="chip">
                    Fee: {reg.estimatedFeeINR || "See advisor"}
                  </span>
                  <span className="chip">
                    Time: {reg.processingTime || "Varies"}
                  </span>
                </div>
              </div>
            </li>
          ))}
        {!hasCompliance && (
          <li className="list-item">
            <span className="list-bullet">●</span>
            <div className="card-text">
              Click &quot;Generate my compliance score&quot; above to see which
              ROC, tax, and brand registrations {`your startup`} actually needs.
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

function CardDocuments({ docs, hasCompliance }) {
  return (
    <div className="card">
      <h2 className="section-title">📄 Documentation</h2>
      <div className="card-header">
        <h3 className="card-title">Essential documents to maintain</h3>
      </div>
      <ul className="list">
        {hasCompliance &&
          docs.map((doc, idx) => (
            <li key={idx} className="list-item list-item-animated">
              <span className="list-bullet">□</span>
              <div className="card-text">{doc}</div>
            </li>
          ))}
        {!hasCompliance && (
          <li className="list-item">
            <span className="list-bullet">□</span>
            <div className="card-text">
              Once you generate your roadmap, this will list what KYC, office,
              and legal documents you should keep ready for smooth filings.
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

function CardRisks({ risks, hasCompliance }) {
  return (
    <div className="card">
      <h2 className="section-title">⚠️ Risks</h2>
      <div className="card-header">
        <h3 className="card-title">Potential compliance risks</h3>
        <span className="risk-pill">
          {hasCompliance && risks.length
            ? `${risks.length} active risks`
            : "Hidden until you generate"}
        </span>
      </div>
      <ul className="list">
        {hasCompliance &&
          risks.map((risk, idx) => (
            <li key={idx} className="list-item list-item-animated">
              <span className="list-bullet">!</span>
              <div className="card-text">{risk}</div>
            </li>
          ))}
        {!hasCompliance && (
          <li className="list-item">
            <span className="list-bullet">!</span>
            <div className="card-text">
              We&apos;ll surface GST breaches, ROC delays, and city- or model-
              specific risks as soon as you generate your personalised roadmap.
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

function CardChecklist({ checklist, hasCompliance }) {
  return (
    <div className="card">
      <h2 className="section-title">✓ Action plan</h2>
      <div className="card-header">
        <h3 className="card-title">Your step-by-step checklist</h3>
      </div>
      <ul className="list">
        {hasCompliance &&
          checklist.map((item, idx) => (
            <li key={idx} className="list-item list-item-animated">
              <span className="list-bullet">→</span>
              <div className="card-text">{item}</div>
            </li>
          ))}
        {!hasCompliance && (
          <li className="list-item">
            <span className="list-bullet">→</span>
            <div className="card-text">
              Your step-by-step checklist will appear here after you generate
              the roadmap, so founders can work through compliance like a task
              list.
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

function ChatDock({ answers, compliance, generationId }) {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Ask me anything about Indian startup compliance—GST, structure, risks, or what to do next."
    }
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!generationId || !compliance) return;
    const meta = compliance.meta || {};
    const name = meta.businessName || "your startup";
    const city = meta.city || "your city";

    setMessages((prev) => {
      const already = prev.some(
        (m) =>
          m.from === "bot" &&
          m.text.startsWith("I've loaded your latest roadmap")
      );
      if (already) return prev;
      return [
        ...prev,
        {
          from: "bot",
          text: `I've loaded your latest roadmap for ${name} in ${city}. You can now ask follow-up questions and I'll answer using your details.`
        }
      ];
    });
  }, [generationId, compliance]);

  const quickQuestions = [
    {
      id: "gst",
      label: "Is GST mandatory for me?",
      text: "Is GST registration mandatory for my startup?"
    },
    {
      id: "structure",
      label: "Best structure for us?",
      text: "Why did you pick this legal structure and is it investor friendly?"
    },
    {
      id: "risks",
      label: "Biggest risks?",
      text: "What are the top 3 compliance risks I should worry about?"
    }
  ];

  const handleAsk = (text) => {
    if (!text.trim()) return;
    const q = text.trim();
    setMessages((prev) => [...prev, { from: "user", text: q }]);
    const reply = buildChatReply(q, answers, compliance);
    setMessages((prev) => [...prev, { from: "user", text: q }, reply]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const q = input;
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text: q }]);
    const reply = buildChatReply(q, answers, compliance);
    setMessages((prev) => [...prev, { from: "user", text: q }, reply]);
  };

  return (
    <div
      className={`chat-dock ${open ? "chat-dock-open" : "chat-dock-collapsed"}`}
    >
      <div className="chat-header" onClick={() => setOpen(!open)}>
        <div className="chat-header-main">
          <span className="chat-header-title">CompliAI Copilot</span>
          <span className="chat-header-sub">
            {open ? "Your legal sidekick" : "Tap to open chat"}
          </span>
        </div>
        <button
          type="button"
          className="chat-toggle-btn"
          aria-label={open ? "Collapse chat" : "Expand chat"}
        >
          {open ? "–" : "?"}
        </button>
      </div>
      {open && (
        <>
          <div className="chat-quick-row">
            {quickQuestions.map((q) => (
              <button
                key={q.id}
                type="button"
                className="chat-quick-pill"
                onClick={() => handleAsk(q.text)}
              >
                {q.label}
              </button>
            ))}
          </div>
          <div className="chat-messages">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`chat-bubble ${
                  m.from === "bot" ? "chat-bubble-bot" : "chat-bubble-user"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <form className="chat-input-row" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ask a compliance question…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </>
      )}
    </div>
  );
}

function buildChatReply(question, answers, compliance) {
  const q = question.toLowerCase();
  const meta = (compliance && compliance.meta) || {};
  const name = meta.businessName || "your startup";
  const city = meta.city || "your city";

  if (q.includes("gst")) {
    return {
      from: "bot",
      text:
        "Based on your expected revenue and model, GST is recommended once you cross the usual ₹20–40L threshold or start doing interstate supplies. Register early, so you can charge GST properly and claim input credit instead of facing back taxes."
    };
  }

  if (q.includes("structure")) {
    const structure =
      (compliance && compliance.recommendedStructure) ||
      "a founder-friendly structure";
    return {
      from: "bot",
      text: `I'm recommending ${structure} because it balances liability protection with investor friendliness for ${name}. This makes it easier to onboard co-founders, give ESOPs later, and raise funding without needing to change your base entity.`
    };
  }

  if (q.includes("risk")) {
    const risks = (compliance && compliance.riskAlerts) || [];
    const top = risks.slice(0, 3).join(" ");
    return {
      from: "bot",
      text:
        top ||
        "Your main risks will usually be late GST/ROC filings, missing labour registrations in your city, and unclear website policies. Generating the roadmap will list them precisely for your case."
    };
  }

  return {
    from: "bot",
    text: `For ${name} in ${city}, I will answer using the roadmap above. In short: follow the checklist card step by step, keep an eye on any GST or ROC deadlines mentioned, and ask me specific questions like “how urgent is GST for me” or “what should I fix before talking to investors?”.`
  };
}

export default App;

function generateComplianceFromAnswers(answers) {
  const {
    businessName,
    businessType,
    city,
    consumers,
    expectedRevenue,
    founders
  } = answers;

  const name = businessName || "your startup";
  const loc = city || "your city";

  const structure =
    founders === "1" ? "One Person Company" : "Private Limited Company";

  const whyStructure =
    structure === "One Person Company"
      ? "One Person Company works well when there is a single Indian founder, offering limited liability and easier compliance than a full private limited company while still feeling like a company, not a proprietorship."
      : "Private Limited Company is preferred by Indian investors and accelerators, allows multiple founders, ESOPs, and easier fundraising once you have traction.";

  const base = { ...sampleComplianceData };

  const registrations = (base.registrations || []).map((r) => ({ ...r }));
  const docs = [...(base.documentsRequired || [])];
  const checklist = [...(base.complianceChecklist || [])];

  const extraRisks = [];
  if (!businessName || !city || !businessType || !consumers || !expectedRevenue) {
    extraRisks.push(
      "Some inputs were left blank; roadmap is generated on assumptions for a generic early-stage tech startup in a major Indian city."
    );
  }
  if (expectedRevenue === "40L-1Cr" || expectedRevenue === ">1Cr") {
    extraRisks.push(
      "Because your expected revenue crosses common GST thresholds, delaying GST registration can create tax and interest exposure."
    );
  }
  if (businessType === "marketplace" || consumers === "b2c") {
    extraRisks.push(
      "B2C and marketplace models often trigger stricter consumer protection, data, and advertising rules; ensure your website policies and flows are compliant."
    );
  }

  const gstReg = registrations.find((r) => r.name === "GST");
  if (gstReg && (expectedRevenue === "40L-1Cr" || expectedRevenue === ">1Cr")) {
    gstReg.whyRequired =
      "In your case, GST registration is effectively mandatory because of your expected revenue or interstate/online supplies. Register early to avoid back taxes and penalties.";
  }

  const iecReg = registrations.find((r) => r.name === "Import Export Code");
  if (iecReg && consumers === "b2b") {
    iecReg.whyRequired =
      "IEC is needed if you invoice foreign clients or export services. For B2B SaaS or consulting, this often becomes relevant once you start billing outside India.";
  }

  const sAndE = registrations.find(
    (r) => r.name === "Shops & Establishment License"
  );
  if (sAndE && city) {
    sAndE.whyRequired = `State labour registration for your office in ${loc}; inspectors and other registrations may ask for this as base proof that ${name} operates legally from the stated address.`;
  }

  if (businessType === "marketplace" || consumers === "b2c") {
    docs.push(
      "Detailed Terms of Use and Return/Refund Policy tailored for B2C or marketplace flows",
      "Clear consent language for marketing messages (SMS, WhatsApp, email) to consumers"
    );
    checklist.push(
      "Review Consumer Protection Act guidelines for online platforms and ensure your flows (cancellations, refunds, grievance redressal) follow them.",
      "Add a visible grievance officer contact and turnaround time for consumer complaints on your website/app."
    );
  }

  if (businessType === "saas" && consumers === "b2b") {
    checklist.push(
      "Standardise SaaS terms (SLAs, uptime, data ownership, and exit/portability) for your B2B contracts.",
      "Ensure your DPDP and IT Act compliance covers data storage in MongoDB and any third-party integrations."
    );
  }

  return {
    ...base,
    recommendedStructure: structure,
    whyThisStructure: whyStructure,
    estimatedTotalCostINR: base.estimatedTotalCostINR,
    timeline: base.timeline,
    registrations,
    documentsRequired: docs,
    complianceChecklist: checklist,
    riskAlerts: [...extraRisks, ...(base.riskAlerts || [])],
    meta: {
      businessName: name,
      city: loc,
      businessType,
      consumers,
      expectedRevenue,
      founders
    }
  };
}


