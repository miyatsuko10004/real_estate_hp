import { Suspense } from "react"
import { SearchForm } from "@/components/search-form"
import { PropertyList } from "@/components/property-list"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">不動産物件検索</h1>
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={<div>検索フォームを読み込み中...</div>}>
            <SearchForm />
          </Suspense>
          <Suspense fallback={<div>物件リストを読み込み中...</div>}>
            <PropertyList />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

