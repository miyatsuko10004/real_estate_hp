"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { getProperties } from "@/lib/api"
import type { Property } from "@/types/property"

export function PropertyList() {
  const searchParams = useSearchParams()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const area = searchParams.get("area")
    const city = searchParams.get("city")
    const year = searchParams.get("year")
    const quarter = searchParams.get("quarter")

    // 都道府県が選択されていない場合は何も表示しない
    if (!area) {
      setProperties([])
      return
    }

    const fetchProperties = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await getProperties({
          area,
          city: city || undefined,
          year: year || undefined,
          quarter: quarter || undefined,
        })

        setProperties(data)
        setLoading(false)
      } catch (error) {
        console.error("物件データの取得に失敗しました:", error)
        setError("物件データの取得に失敗しました。しばらく経ってからもう一度お試しください。")
        setLoading(false)
      }
    }

    fetchProperties()
  }, [searchParams])

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="bg-red-50">
        <CardContent className="p-6">
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (properties.length === 0 && area) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500">
            条件に一致する物件が見つかりませんでした。検索条件を変更してお試しください。
          </p>
        </CardContent>
      </Card>
    )
  }

  if (properties.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500">都道府県を選択して物件を検索してください。</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">検索結果: {properties.length}件</h2>
      </div>

      {properties.map((property, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {property.Prefecture} {property.Municipality} {property.DistrictName}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline">{property.Type}</Badge>
                  {property.Use && <Badge variant="outline">{property.Use}</Badge>}
                  {property.Structure && <Badge variant="outline">{property.Structure}</Badge>}
                </div>
                <p className="text-gray-600 text-sm">取引時期: {property.Period}</p>
              </div>

              <div>
                <div className="text-2xl font-bold text-right">
                  {property.TradePrice ? `${Number(property.TradePrice).toLocaleString()}万円` : "価格非公開"}
                </div>

                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  {property.Area && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">面積:</span>
                      <span>{property.Area}㎡</span>
                    </div>
                  )}

                  {property.UnitPrice && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">単価:</span>
                      <span>{Number(property.UnitPrice).toLocaleString()}万円/㎡</span>
                    </div>
                  )}

                  {property.FloorPlan && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">間取り:</span>
                      <span>{property.FloorPlan}</span>
                    </div>
                  )}

                  {property.BuildingYear && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">築年:</span>
                      <span>{property.BuildingYear}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

