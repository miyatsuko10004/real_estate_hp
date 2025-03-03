import { mockPrefectures, mockMunicipalities, mockProperties } from "./mockData"

const API_KEY = process.env.NEXT_PUBLIC_REALESTATE_API_KEY || "dummy-api-key"
const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === "true"

// 都道府県一覧を取得
export async function getPrefectures() {
  if (USE_MOCK_API) {
    return mockPrefectures
  }

  try {
    const response = await fetch("https://www.reinfolib.mlit.go.jp/ex-api/external/XIT002", {
      headers: {
        "Ocp-Apim-Subscription-Key": API_KEY,
      },
    })
    if (!response.ok) throw new Error("都道府県データの取得に失敗しました")
    const data = await response.json()
    return data
  } catch (error) {
    console.error("都道府県データの取得エラー:", error)
    return []
  }
}

// 市区町村一覧を取得
export async function getMunicipalities(prefectureCode: string) {
  if (USE_MOCK_API) {
    return mockMunicipalities[prefectureCode] || []
  }

  try {
    const response = await fetch(`https://www.reinfolib.mlit.go.jp/ex-api/external/XIT002?area=${prefectureCode}`, {
      headers: {
        "Ocp-Apim-Subscription-Key": API_KEY,
      },
    })
    if (!response.ok) throw new Error("市区町村データの取得に失敗しました")
    const data = await response.json()
    return data
  } catch (error) {
    console.error("市区町村データの取得エラー:", error)
    return []
  }
}

// 物件情報を取得
export async function getProperties(params: {
  area: string
  city?: string
  year?: string
  quarter?: string
  priceClassification?: string
}) {
  if (USE_MOCK_API) {
    return mockProperties[params.area] || []
  }

  try {
    const url = new URL("https://www.reinfolib.mlit.go.jp/ex-api/external/XIT001")
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value)
    })

    const response = await fetch(url.toString(), {
      headers: {
        "Ocp-Apim-Subscription-Key": API_KEY,
      },
    })
    if (!response.ok) throw new Error("物件データの取得に失敗しました")
    const data = await response.json()
    return data
  } catch (error) {
    console.error("物件データの取得エラー:", error)
    return []
  }
}

