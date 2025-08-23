"use client";

export default function ServiceWarranty() {
  const services = [
    {
      icon: "📚",
      title: "Installation Guides", 
      desc: "Step-by-step installation guides for popular device models",
      features: ["Visual tutorials", "Safety precautions", "Tool requirements"]
    },
    {
      icon: "🔧",
      title: "Technical Support",
      desc: "Expert troubleshooting for battery and device issues", 
      features: ["Boot loop resolution", "Charge retention", "Swelling safety"]
    },
    {
      icon: "🛡️",
      title: "Warranty Coverage",
      desc: "Comprehensive protection for your battery investment",
      features: ["12-month guarantee", "Free replacements", "Quality assurance"]
    },
    {
      icon: "🚚",
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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-yellow-50">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            🛡️ Service & Warranty
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Comprehensive Support & Protection
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We stand behind our products with exceptional service and industry-leading warranty coverage
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-yellow-200"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{service.desc}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Warranty Details Section */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Warranty Info */}
            <div>
              <div className="inline-flex items-center bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                📋 Warranty Specifications
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Industry-Leading Protection
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our warranty coverage goes beyond industry standards, ensuring your investment is protected with comprehensive support and fast resolution.
              </p>
              
              <div className="space-y-4">
                {warrantySpecs.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-700 font-medium">{spec.feature}</span>
                    <span className="text-yellow-600 font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-8 text-white">
              <div className="text-center">
                <div className="text-5xl mb-4">🏆</div>
                <h4 className="text-2xl font-bold mb-4">Premium Protection Guarantee</h4>
                <p className="text-yellow-100 mb-6 leading-relaxed">
                  Experience peace of mind with our comprehensive warranty coverage and dedicated support team.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-sm">Free battery health diagnostics</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-sm">Priority customer support</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-sm">Extended warranty options</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-white text-yellow-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                    View Warranty Terms
                  </button>
                  <button className="flex-1 bg-yellow-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-yellow-800 transition-colors">
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
