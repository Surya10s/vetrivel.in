

export default function Services() {

  const products = [
    {
      title: "M Sand",
      desc: "Double washed clean M-sand",
      img: "/msand.jpg"
    },
    {
      title: "White M Sand",
      desc: "Double washed.Quality equal to river sand ",
      img: "/white msand.jpg"
    },
    {
      title: "P Sand",
      desc: "Double washed. Perfect for plastering purpose",
      img: "/psand.jpg"
    },
    {
      title: "20MM",
      desc: "Perfect sized gravel for construction",
      img: "/20mm.jpg"
    },
    {
      title: "Aggregates",
      desc: "6mm, 12mm, 14mm and more",
      img: "/aggregates.jpeg"
    },
    {
      title: "Dust",
      desc: "High quality stone dust",
      img: "/dust.jpg"
    }
  ]

  return (
    <section id="services" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Our Products
          </h2>

          <p className="text-gray-500 text-lg">
            High-quality building materials for every project scale
          </p>
        </div>

        {/* grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6">

          {products.map((item, i) => (
            <div
              key={i}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-300 transition-all duration-300 hover:shadow-xl">

                {/* image */}
                <div className="overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-52 object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                {/* content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-black mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}
