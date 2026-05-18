"use client";

export default function ServiceWarranty() {
  const services = [
    {
      icon: "fas fa-book-open",
      title: "Installation Guides",
      desc: "Step-by-step installation guides for popular device models",
      features: ["Visual tutorials", "Safety precautions", "Tool requirements"]
    },
    {
      icon: "fas fa-tools",
      title: "Technical Support",
      desc: "Expert troubleshooting for battery and device issues",
      features: ["Boot loop resolution", "Charge retention", "Swelling safety"]
    },
    {
      icon: "fas fa-shield-alt",
      title: "Warranty Coverage",
      desc: "Comprehensive protection for your battery investment",
      features: ["12-month guarantee", "Free replacements", "Quality assurance"]
    },
    {
      icon: "fas fa-shipping-fast",
      title: "Fast Delivery",
      desc: "Quick and secure shipping across Indonesia",
      features: ["Same-day processing", "Tracked shipping", "Secure packaging"]
    }
  ];

  const warrantySpecs = [
    { feature: "Standard Warranty", value: "12 Months" },
    { feature: "Premium Batteries", value: "18 Months" },
    { feature: "Replacement Policy", value: "Free within warranty" },
    { feature: "Coverage", value: "Manufacturing defects" },
    { feature: "Support", value: "24/7 technical assistance" },
    { feature: "Return Window", value: "30 days no questions asked" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-amber-50/50">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-[11px] uppercase tracking-widest font-semibold mb-6">
            <i className="fas fa-shield-check"></i>
            Service & Warranty
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
            Comprehensive Support & Protection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We stand behind our products with exceptional service and industry-leading warranty coverage
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 hover:border-amber-200 group"
            >
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <i className={`${service.icon} text-amber-500 text-xl`}></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">{service.desc}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-xs font-medium text-gray-600">
                    <i className="fas fa-check text-amber-500 mt-0.5 mr-2"></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Warranty Details Section */}
        <div className="bg-white rounded-3xl shadow-xl shadow-black/5 border border-black/5 overflow-hidden">
          <div className="grid lg:grid-cols-2">

            {/* Warranty Info */}
            <div className="p-8 lg:p-12">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-[11px] uppercase tracking-widest font-semibold mb-6">
                <i className="fas fa-clipboard-check"></i>
                Warranty Specifications
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Industry-Leading Protection
              </h3>
              <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                Our warranty coverage goes beyond industry standards, ensuring your investment is protected with comprehensive support and fast resolution.
              </p>

              <div className="space-y-4">
                {warrantySpecs.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                    <span className="text-sm text-gray-700 font-medium">{spec.feature}</span>
                    <span className="text-sm text-amber-600 font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-8 lg:p-12 text-white flex flex-col justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                  <i className="fas fa-award text-2xl text-white"></i>
                </div>
                <h4 className="text-2xl font-bold mb-4 tracking-tight">Premium Protection Guarantee</h4>
                <p className="text-amber-50 text-sm mb-8 leading-relaxed max-w-sm mx-auto">
                  Experience peace of mind with our comprehensive warranty coverage and dedicated support team.
                </p>

                <div className="space-y-3 mb-10 text-left max-w-xs mx-auto">
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-amber-200 mr-3"></i>
                    <span className="text-sm font-medium">Free battery health diagnostics</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-amber-200 mr-3"></i>
                    <span className="text-sm font-medium">Priority customer support</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-amber-200 mr-3"></i>
                    <span className="text-sm font-medium">Extended warranty options</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="bg-white text-amber-700 px-6 py-3 rounded-full font-semibold hover:bg-amber-50 transition-colors shadow-lg shadow-black/10 text-sm">
                    View Terms
                  </button>
                  <button className="bg-amber-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-800 transition-colors shadow-lg shadow-black/10 text-sm border border-amber-600/50">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
