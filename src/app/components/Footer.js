'use client'

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-8 px-6">
      <div className="max-w-6xl mx-auto">

        {/* top */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/10 pb-10 mb-8">

          {/* logo */}
          <div>
            <h3 className="text-xl font-semibold">
              Vetrivel
            </h3>
            <p className="text-sm text-white/50 mt-2">
              Building materials supplier in Chennai
            </p>
          </div>

          {/* address */}
          <div className="text-sm text-white/50">
            Anna Nagar, Chennai – 600040
          </div>

        </div>

        {/* bottom */}
        {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-white/40">

          <p>
            © 2025 Vetrivel. All rights reserved.
          </p>

          <p className="italic text-white/30">
            Building tomorrow, starting today.
          </p>

        </div> */}

      </div>
    </footer>
  )
}
