export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex md:w-1/2 bg-secondary px-18 py-14 flex-col justify-between">
        <div>
          <h1 className="text-white h1-semibold mb-2">WorkAble</h1>
        </div>

        <div className="text-white">
          <h2 className="h1-semibold text-5xl mb-4 leading-tight">
            Break Your Limits
          </h2>
          <p className="body-regular text-white max-w-md leading-relaxed">
            WorkAble menghubungkan pencari kerja dengan ribuan perusahaan inklusif yang menghargai talenta — bukan menilai dari hal lain.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}