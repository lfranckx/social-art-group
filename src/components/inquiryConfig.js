// =============================================================
// INQUIRY FORM CONFIGURATION
// -------------------------------------------------------------
// This file is the single source of truth for the inquiry flow.
// Edit categories, questions, and options here — the form
// renders itself from this config.
// =============================================================

export const CATEGORIES = [
  { value: "creator", label: "Creator, Artist, or Educator" },
  { value: "founder", label: "Founder or Leadership Team" },
  { value: "brand", label: "Brand" },
  { value: "education", label: "Education Platform or Experience Builder" },
  { value: "general", label: "General Inquiry" },
];

const WORKING_STYLE = {
  name: "working_style",
  label: "How would you like to work with us?",
  type: "radio",
  options: [
    {
      value: "Thought Partner",
      label: "Thought Partner",
      help: "Strategic consulting and advisory support — we provide guidance, planning, structure, and expert recommendations while your team leads execution.",
    },
    {
      value: "Team Extension",
      label: "Team Extension",
      help: "Strategic consulting + execution support — we act as an extension of your team across strategy, creative, content, education, partnerships, and experiences.",
    },
    { value: "Not Sure Yet", label: "Not Sure Yet" },
  ],
};

export const FLOWS = {
  creator: {
    heading: "Creator, Artist, or Educator",
    sections: [
      {
        title: "Contact information",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "social", label: "Instagram / TikTok / YouTube", type: "text" },
          {
            name: "specialty",
            label: "Primary specialty",
            type: "radio",
            options: [
              "Color", "Cutting", "Texture", "Styling",
              "Barbering", "Business / Leadership", "Other",
            ].map((o) => ({ value: o, label: o })),
          },
        ],
      },
      {
        title: "Experience",
        fields: [
          {
            name: "taught_before",
            label: "Have you taught professionally before?",
            type: "radio",
            options: [
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ],
          },
          {
            name: "worked_with_brands",
            label: "Have you worked with brands before?",
            type: "radio",
            options: [
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ],
          },
        ],
      },
      {
        title: "Support needed",
        fields: [
          {
            name: "support",
            label: "What are you looking for support with?",
            type: "checkbox",
            options: [
              "Representation & Management",
              "Brand Partnership Opportunities",
              "Education Opportunities",
              "Speaking Opportunities",
              "Career Positioning",
              "Platform Growth",
              "Long-Term Career Strategy",
              "Not Sure Yet",
            ].map((o) => ({ value: o, label: o })),
          },
        ],
      },
      {
        title: "About you",
        fields: [
          {
            name: "about",
            label: "Tell us a little about yourself and your current goals.",
            type: "textarea",
          },
        ],
      },
    ],
  },

  founder: {
    heading: "Founder or Leadership Team",
    sections: [
      {
        title: "Contact information",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "company", label: "Company", type: "text" },
          { name: "email", label: "Email", type: "email", required: true },
        ],
      },
      {
        title: "Support needed",
        fields: [
          {
            name: "support",
            label: "What are you looking for support with?",
            type: "checkbox",
            options: [
              "Strategic Planning & Growth Advisory",
              "Brand Architecture",
              "Offer Refinement",
              "Sales Strategy",
              "Brand Creative Direction",
              "Digital Strategy",
              "Not Sure Yet",
            ].map((o) => ({ value: o, label: o })),
          },
        ],
      },
      {
        title: "Project context",
        fields: [
          {
            name: "project_context",
            label: "What are you currently building, growing, or refining?",
            type: "textarea",
          },
        ],
      },
      { title: "Working style", fields: [WORKING_STYLE] },
    ],
  },

  brand: {
    heading: "Brand",
    sections: [
      {
        title: "Contact information",
        fields: [
          { name: "company", label: "Company name", type: "text", required: true },
          { name: "name", label: "Contact name", type: "text", required: true },
          { name: "email", label: "Email", type: "email", required: true },
        ],
      },
      {
        title: "Support needed",
        fields: [
          {
            name: "support",
            label: "What are you looking for support with?",
            type: "checkbox",
            options: [
              "Brand Strategy & Positioning",
              "Creative Direction & Visual Identity",
              "Digital Content Strategy",
              "Education Development",
              "Talent Partnerships",
              "Event Activations",
              "Production Support",
              "Talent Placement",
              "Not Sure Yet",
            ].map((o) => ({ value: o, label: o })),
          },
        ],
      },
      {
        title: "Project context",
        fields: [
          {
            name: "project_context",
            label: "Tell us about the project, campaign, or initiative.",
            type: "textarea",
          },
        ],
      },
      {
        title: "Timeline",
        fields: [
          {
            name: "timeline",
            label: "Timeline",
            type: "radio",
            options: ["ASAP", "1–3 Months", "3–6 Months", "Flexible"].map(
              (o) => ({ value: o, label: o })
            ),
          },
        ],
      },
      {
        title: "Investment range",
        fields: [
          {
            name: "investment",
            label: "Investment range",
            type: "radio",
            options: ["Under $5K", "$5K–$10K", "$10K–$25K", "$25K+"].map((o) => ({
              value: o,
              label: o,
            })),
          },
        ],
      },
      { title: "Working style", fields: [WORKING_STYLE] },
    ],
  },

  education: {
    heading: "Education Platform or Experience Builder",
    sections: [
      {
        title: "Contact information",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "company", label: "Company", type: "text" },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "website", label: "Website / Social links", type: "text" },
        ],
      },
      {
        title: "Support needed",
        fields: [
          {
            name: "support",
            label: "What are you looking for support with?",
            type: "checkbox",
            options: [
              "Education Strategy",
              "Curriculum Design",
              "Event Strategy",
              "Experiential Programming",
              "Production Oversight",
              "Platform Development",
              "Digital Strategy",
              "Not Sure Yet",
            ].map((o) => ({ value: o, label: o })),
          },
        ],
      },
      {
        title: "Project context",
        fields: [
          {
            name: "project_context",
            label: "Tell us about your program, event, platform, or vision.",
            type: "textarea",
          },
        ],
      },
      {
        title: "Current stage",
        fields: [
          {
            name: "stage",
            label: "Current stage",
            type: "radio",
            options: ["Idea", "Building", "Launched", "Scaling"].map((o) => ({
              value: o,
              label: o,
            })),
          },
        ],
      },
      { title: "Working style", fields: [WORKING_STYLE] },
    ],
  },

  general: {
    heading: "General Inquiry",
    sections: [
      {
        title: "Contact information",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          {
            name: "company",
            label: "Company or social handle (optional)",
            type: "text",
          },
        ],
      },
      {
        title: "Your inquiry",
        fields: [
          {
            name: "regarding",
            label: "What are you reaching out regarding?",
            type: "textarea",
          },
          {
            name: "referral",
            label: "How did you hear about Social Art Group?",
            type: "text",
          },
          {
            name: "anything_else",
            label: "Anything else you'd like us to know?",
            type: "textarea",
          },
        ],
      },
    ],
  },
};

export const MEDIA_KIT_CATEGORIES = ["creator", "founder", "brand", "education"];

export const MEDIA_KIT_DROPBOX_URL = "https://www.dropbox.com/request/yu6b7pqaoh3c4hya4f3h";

export const INTRO = {
  title: "Let's start the conversation",
  body:
    "Tell us a little about what you're building and how we can help. We'll review your inquiry and reach out if it feels like a good fit.",
};

export const CONFIRMATION = {
  title: "Thank you for reaching out.",
  body:
    "Our team reviews every inquiry personally. If it feels like a strong fit, we'll be in touch with next steps.",
};