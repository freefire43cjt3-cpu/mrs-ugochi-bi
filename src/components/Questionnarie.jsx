import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const steps = [
  {
    title: "Let's get to know your boutique",
    description: "Tell me about your business and how customers can reach you.",
    fields: [
      { name: "businessName", label: "Boutique name", type: "text", required: true, placeholder: "e.g. Ugochi Fashion House" },
      { name: "ownerName", label: "Your full name", type: "text", required: true, placeholder: "Your name" },
      { name: "email", label: "Email address", type: "email", required: true, placeholder: "you@example.com" },
      { name: "phone", label: "Phone / WhatsApp number", type: "tel", required: true, placeholder: "+234..." },
      { name: "address", label: "Business location (optional)", type: "text", placeholder: "City or business address" },
      { name: "socials", label: "Instagram / Facebook / TikTok links", type: "text", placeholder: "Paste your social media links" }
    ]
  },
  {
    title: "Your brand, your style",
    description: "Let's make the website reflect your boutique's identity.",
    fields: [
      { name: "colors", label: "Preferred website colours", type: "text", required: true, placeholder: "e.g. Black, cream and gold" },
      { name: "style", label: "Website style", type: "select", required: true, options: ["Luxury and elegant", "Modern and trendy", "Minimal and clean", "Bold and colourful", "Feminine and soft", "Not sure — recommend a style"] },
      { name: "logo", label: "Do you have a business logo?", type: "select", required: true, options: ["Yes, I have a logo", "No, I need one", "I will provide it later"] },
      { name: "inspiration", label: "Website examples you like (optional)", type: "text", placeholder: "Paste links to websites you like" }
    ]
  },
  {
    title: "Products and shopping",
    description: "Tell me what you sell and how customers should order.",
    fields: [
      { name: "products", label: "What products do you sell?", type: "textarea", required: true, placeholder: "Clothes, dresses, shoes, bags, accessories..." },
      { name: "productCount", label: "Approximate number of products at launch", type: "select", required: true, options: ["1–20", "21–50", "51–100", "More than 100", "Not sure yet"] },
      { name: "ordering", label: "How should customers place orders?", type: "select", required: true, options: ["Through WhatsApp", "Shopping cart and online checkout", "Both WhatsApp and online checkout", "Not sure — advise me"] },
      { name: "payments", label: "Online payment", type: "select", required: true, options: ["Yes, accept online payments", "No, WhatsApp orders are enough", "I need advice"] },
      { name: "delivery", label: "Delivery or pickup information (optional)", type: "textarea", placeholder: "Delivery areas, fees, pickup options..." }
    ]
  },
  {
    title: "Pages and features",
    description: "Choose what you want included on your website.",
    fields: [
      { name: "pages", label: "Which pages would you like?", type: "checks", required: true, options: ["Home", "About Us", "Shop / Products", "Product Details", "Contact Us", "Size Guide", "Delivery & Returns", "Customer Reviews", "FAQs"] },
      { name: "features", label: "Additional features", type: "checks", options: ["WhatsApp chat button", "Product search and filters", "Shopping cart", "Customer accounts", "Discount codes", "Order tracking", "Instagram gallery", "Newsletter signup"] },
      { name: "admin", label: "How would you like to manage products?", type: "select", required: true, options: ["I want to add and edit products myself", "I want the developer to manage products", "I need advice"] }
    ]
  },
  {
    title: "Domain and launch",
    description: "Let's discuss your website address, content and timeline.",
    fields: [
      { name: "domainStatus", label: "Do you already own a domain?", type: "select", required: true, options: ["Yes, I own one", "No, I need one", "I'm not sure"] },
      { name: "domainName", label: "Preferred domain name (optional)", type: "text", placeholder: "e.g. ug ochifashion.com — availability must be checked" },
      { name: "hosting", label: "Hosting preference", type: "select", required: true, options: ["I already have hosting", "Please recommend and arrange hosting", "I need an explanation first"] },
      { name: "content", label: "What content do you have ready?", type: "checks", options: ["Logo", "Product photos", "Product prices and descriptions", "Business information", "None yet"] },
      { name: "timeline", label: "When would you like the website launched?", type: "select", required: true, options: ["Within 1 week", "Within 2–3 weeks", "Within 1 month", "Flexible"] },
      { name: "budget", label: "Preferred budget range", type: "select", required: true, options: ["₦100,000–₦150,000", "₦150,001–₦250,000", "₦250,001–₦350,000", "₦350,001–₦500,000", "Above ₦500,000", "Let's discuss the budget"] },
      { name: "extra", label: "Anything else I should know? (optional)", type: "textarea", placeholder: "Share any other ideas or requirements..." }
    ]
  }
];

const emptyAnswers = {
  pages: [],
  features: [],
  content: []
};

export default function Questionnaire() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(emptyAnswers);
  const [review, setReview] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const update = (name, value) => {
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const toggle = (name, value) => {
    const values = answers[name] || [];
    update(
      name,
      values.includes(value)
        ? values.filter(item => item !== value)
        : [...values, value]
    );
  };

  const currentStep = steps[step];

  const next = () => {
    const missing = currentStep.fields.find(field => {
      if (!field.required) return false;
      const value = answers[field.name];
      return Array.isArray(value) ? value.length === 0 : !String(value || "").trim();
    });

    if (missing) {
      setError(`Please complete: ${missing.label}`);
      return;
    }

    setError("");
    setStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const submit = async () => {
    // Replace this with your real Formspree endpoint before using the form.
    const endpoint = "https://formspree.io/f/mbgjjdqg";

    if (endpoint.includes("YOUR_FORM_ID")) {
      setError("The form is not connected yet. Please configure Formspree before sending this questionnaire.");
      return;
    }

    setSending(true);
    setError("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          _subject: `Boutique Website Requirements — ${answers.businessName || "New Client"}`,
          ...answers
        })
      });

      if (!response.ok) throw new Error("Submission failed");

      setSubmitted(true);
    } catch {
      setError("We couldn't submit your answers. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <section className="form-card success-card">
        <div className="success-icon">✓</div>
        <p className="eyebrow">SUBMISSION RECEIVED</p>
        <h1>Thank you, {answers.ownerName}!</h1>
        <p>
          Your boutique website requirements have been submitted successfully.
          Raymond will review your answers and get in touch to discuss the next steps.
        </p>
        <p className="small-note">Submitting this form does not confirm a final price or start the project.</p>
      </section>
    );
  }

  return (
    <section className="form-card">
      {!review ? (
        <>
          <ProgressBar current={step + 1} total={steps.length} />

          <div className="step-heading">
            <p className="eyebrow">STEP {String(step + 1).padStart(2, "0")}</p>
            <h1>{currentStep.title}</h1>
            <p>{currentStep.description}</p>
          </div>

          <div className="fields-grid">
            {currentStep.fields.map(field => (
              <div className="field" key={field.name}>
                <label>{field.label}{field.required ? " *" : ""}</label>

                {field.type === "select" ? (
                  <select
                    value={answers[field.name] || ""}
                    onChange={e => update(field.name, e.target.value)}
                  >
                    <option value="">Choose an option</option>
                    {field.options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : field.type === "checks" ? (
                  <div className="check-grid">
                    {field.options.map(option => (
                      <label className="check-option" key={option}>
                        <input
                          type="checkbox"
                          checked={(answers[field.name] || []).includes(option)}
                          onChange={() => toggle(field.name, option)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                ) : field.type === "textarea" ? (
                  <textarea
                    rows="3"
                    value={answers[field.name] || ""}
                    placeholder={field.placeholder || ""}
                    onChange={e => update(field.name, e.target.value)}
                  />
                ) : (
                  <input
                    type={field.type}
                    value={answers[field.name] || ""}
                    placeholder={field.placeholder || ""}
                    onChange={e => update(field.name, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}

          <div className="form-actions">
            <button
              className="button button-secondary"
              disabled={step === 0}
              onClick={() => {
                setError("");
                setStep(prev => Math.max(0, prev - 1));
              }}
            >
              Back
            </button>

            {step < steps.length - 1 ? (
              <button className="button button-primary" onClick={next}>
                Continue →
              </button>
            ) : (
              <button
                className="button button-primary"
                onClick={() => {
                  setError("");
                  setReview(true);
                }}
              >
                Review answers →
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <p className="eyebrow">FINAL STEP</p>
          <h1>Review your requirements</h1>
          <p className="section-description">Please check your answers before submitting.</p>

          {steps.flatMap(section => section.fields).map(field => {
            const value = answers[field.name];
            if (!value || (Array.isArray(value) && value.length === 0)) return null;

            return (
              <div className="review-row" key={field.name}>
                <span>{field.label}</span>
                <strong>{Array.isArray(value) ? value.join(", ") : value}</strong>
              </div>
            );
          })}

          <p className="small-note">
            Your answers help prepare a suitable proposal. The final scope, price,
            domain availability, and timeline will be confirmed with you.
          </p>

          {error && <p className="form-error" role="alert">{error}</p>}

          <div className="form-actions">
            <button className="button button-secondary" onClick={() => setReview(false)}>
              Edit answers
            </button>
            <button className="button button-primary" disabled={sending} onClick={submit}>
              {sending ? "Submitting..." : "Submit requirements"}
            </button>
          </div>
        </>
      )}
    </section>
  );
}