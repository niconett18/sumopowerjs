"use client";

export default function StatsAndMilestones() {
  const stats = [
    { value: "500k+", label: "Units shipped" },
    { value: "<0.5%", label: "Return rate (rolling 12m)" },
    { value: "200+", label: "City coverage in ID" },
  ];
  
  const timeline = [
    { year: "2021", text: "Sumo Power launched with 30 initial SKUs" },
    { year: "2023", text: "Expanded QC lab and warranty program" },
    { year: "2025", text: "400+ SKUs, improved cycle-life targets" },
  ];

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Impact</h3>
            <div className="grid grid-cols-1 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="text-2xl font-bold text-yellow-600">{stat.value}</div>
                  <div className="text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Timeline</h3>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {item.year}
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-gray-700">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
