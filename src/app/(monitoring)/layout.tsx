import Sidebar from "@/components/Sidebar";
import "../globals.css"
export default function RootLayout({children}:{children:React.ReactNode}){
  return(
    <html lang="ja">
      {/* flex:要素を横並びにする */}
      <body className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </body>
    </html>
  )
}