"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getPrefectures, getMunicipalities } from "@/lib/api"

export function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [prefectures, setPrefectures] = useState<{ id: string; name: string }[]>([])
  const [municipalities, setMunicipalities] = useState<{ id: string; name: string }[]>([])
  const [loading, setLoading] = useState(false)

  const [selectedPrefecture, setSelectedPrefecture] = useState("")
  const [selectedMunicipality, setSelectedMunicipality] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedQuarter, setSelectedQuarter] = useState("")

  useEffect(() => {
    // 初期値の設定
    setSelectedPrefecture(searchParams.get("area") || "")
    setSelectedMunicipality(searchParams.get("city") || "")
    setSelectedYear(searchParams.get("year") || new Date().getFullYear().toString())
    setSelectedQuarter(searchParams.get("quarter") || "1")

    // 都道府県一覧を取得
    const fetchPrefectures = async () => {
      try {
        const data = await getPrefectures()
        setPrefectures(data)
      } catch (error) {
        console.error("都道府県データの取得に失敗しました:", error)
      }
    }

    fetchPrefectures()
  }, [searchParams])

  // 市区町村一覧を取得
  useEffect(() => {
    if (!selectedPrefecture) return

    const fetchMunicipalities = async () => {
      try {
        setLoading(true)
        const data = await getMunicipalities(selectedPrefecture)
        setMunicipalities(data)
        setLoading(false)
      } catch (error) {
        console.error("市区町村データの取得に失敗しました:", error)
        setLoading(false)
      }
    }

    fetchMunicipalities()
  }, [selectedPrefecture]) // selectedPrefecture が変更されたときのみ実行

  // 検索実行
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (selectedPrefecture) params.set("area", selectedPrefecture)
    if (selectedMunicipality) params.set("city", selectedMunicipality)
    if (selectedYear) params.set("year", selectedYear)
    if (selectedQuarter) params.set("quarter", selectedQuarter)

    router.push(`/?${params.toString()}`)
  }

  // 年の選択肢を生成（2005年から現在まで）
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 2004 }, (_, i) => (currentYear - i).toString())

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="prefecture">都道府県</Label>
              <Select value={selectedPrefecture} onValueChange={setSelectedPrefecture}>
                <SelectTrigger id="prefecture">
                  <SelectValue placeholder="都道府県を選択" />
                </SelectTrigger>
                <SelectContent>
                  {prefectures.map((prefecture) => (
                    <SelectItem key={prefecture.id} value={prefecture.id}>
                      {prefecture.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="municipality">市区町村</Label>
              <Select
                value={selectedMunicipality}
                onValueChange={setSelectedMunicipality}
                disabled={!selectedPrefecture || loading}
              >
                <SelectTrigger id="municipality">
                  <SelectValue placeholder={loading ? "読み込み中..." : "市区町村を選択"} />
                </SelectTrigger>
                <SelectContent>
                  {municipalities.map((municipality) => (
                    <SelectItem key={municipality.id} value={municipality.id}>
                      {municipality.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">取引時期（年）</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger id="year">
                  <SelectValue placeholder="年を選択" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}年
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quarter">取引時期（四半期）</Label>
              <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
                <SelectTrigger id="quarter">
                  <SelectValue placeholder="四半期を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">第1四半期（1〜3月）</SelectItem>
                  <SelectItem value="2">第2四半期（4〜6月）</SelectItem>
                  <SelectItem value="3">第3四半期（7〜9月）</SelectItem>
                  <SelectItem value="4">第4四半期（10〜12月）</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button type="submit" className="w-full md:w-1/3">
              検索
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

