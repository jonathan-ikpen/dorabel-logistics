const services = [
  {
    id: "procurement",
    title: "Procurement & Coordination",
    bullets: [
      "Sourcing and managing trusted tradespeople",
      "Procuring property supplies and equipment",
      "Overseeing quality, cost, and timelines",
    ],
  },
  {
    id: "facility",
    title: "Facility Management",
    bullets: [
      "Office cleaning and maintenance",
      "Waste & utilities management",
      "Preventive maintenance scheduling",
    ],
  },
  {
    id: "inspections",
    title: "Property Inspections & Reporting",
    bullets: [
      "Routine and end-of-tenancy inspections",
      "Maintenance reporting with recommendations",
      "Detailed inspection documentation",
    ],
  },
  {
    id: "repairs",
    title: "Property Maintenance & Repairs",
    bullets: [
      "Cleaning, electrical, plumbing and handyman",
      "Painting, decorating and upkeep",
      "Emergency maintenance coordination",
    ],
  },
];

function delay(ms = 700) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function fetchServices() {
  await delay(600 + Math.random() * 600);
  return services;
}

export async function submitContact(payload) {
  if (!payload.email) {
    const e = new Error("validation");
    e.code = 422;
    throw e;
  }

  const formData = new FormData();
  if (payload.form_type === "contact") {
    formData.append("access_key", "Зес62242-с8a8-4390-a9a0-561096c456b0");
  }
  if (payload.form_type === "appointment" || payload.form_type === "booking") {
    formData.append("access_key", "de028481-b57a-4176-9415-d9b5ba7e63a1");
  }

  if (payload.form_type === "quote") {
    formData.append("access_key", "871fd125-9fd3-4539-ae41-f527639eb554");
  }
  
  formData.append("name", payload.name);
  formData.append("email", payload.email);
  formData.append("message", payload.message);
  formData.append("serviceInterest", payload.serviceInterest);
  formData.append("phone", payload.phone);
  formData.append("serviceType", payload.serviceType);
  formData.append("date", payload.date);
  formData.append("time", payload.time);
  formData.append("pickupLocation", payload.pickupLocation);
  formData.append("deliveryLocation", payload.deliveryLocation);
  formData.append("cargoDetails", payload.cargoDetails);
  

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (data.success) {
    return { status: "ok", id: Math.random().toString(36).slice(2, 9), data };
  }
  return { status: "error", id: Math.random().toString(36).slice(2, 9), data };
}

export async function subscribeNewsletter(email) {
  if (!email) {
    const e = new Error("validation");
    e.code = 422;
    throw e;
  }

  const formData = new FormData();
  formData.append("access_key", "Зес62242-с8a8-4390-a9a0-561096c456b0");
  formData.append("email", email);
  formData.append("message", "Newsletter Subscription");
  formData.append("subject", "New Newsletter Subscriber");

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (data.success) {
    return { status: "ok", data };
  }
  return { status: "error", data };
}

export async function fetchDashboardSummary() {
  await delay(500);
  return {
    properties: 24,
    activeJobs: 6,
    inspectionsThisMonth: 14,
    pendingQuotes: 3,
  };
}
