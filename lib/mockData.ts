import type { Property } from "@/types/property"

export const mockPrefectures = [
  { id: "13", name: "東京都" },
  { id: "14", name: "神奈川県" },
  { id: "12", name: "千葉県" },
  { id: "11", name: "埼玉県" },
  { id: "27", name: "大阪府" },
  { id: "28", name: "兵庫県" },
  { id: "23", name: "愛知県" },
  { id: "01", name: "北海道" },
]

export const mockMunicipalities: Record<string, { id: string; name: string }[]> = {
  "13": [
    { id: "13101", name: "千代田区" },
    { id: "13102", name: "中央区" },
    { id: "13103", name: "港区" },
    { id: "13104", name: "新宿区" },
    { id: "13105", name: "文京区" },
    { id: "13106", name: "台東区" },
    { id: "13107", name: "墨田区" },
    { id: "13108", name: "江東区" },
  ],
  "14": [
    { id: "14101", name: "横浜市鶴見区" },
    { id: "14102", name: "横浜市神奈川区" },
    { id: "14103", name: "横浜市西区" },
    { id: "14104", name: "横浜市中区" },
    { id: "14105", name: "横浜市南区" },
    { id: "14106", name: "横浜市保土ケ谷区" },
  ],
}

export const mockProperties: Record<string, Property[]> = {
  "13": [
    {
      Type: "中古マンション等",
      Region: "首都圏",
      MunicipalityCode: "13103",
      Prefecture: "東京都",
      Municipality: "港区",
      DistrictName: "芝浦",
      TradePrice: "9000",
      PricePerUnit: "9000",
      FloorPlan: "3LDK",
      Area: "100",
      UnitPrice: "90",
      LandShape: "不明",
      Frontage: "不明",
      TotalFloorArea: "100",
      BuildingYear: "2010年",
      Structure: "RC",
      Use: "住宅",
      Purpose: "住宅",
      Direction: "南",
      Classification: "区分所有建物",
      Breadth: "不明",
      CityPlanning: "第一種住居地域",
      CoverageRatio: "60%",
      FloorAreaRatio: "300%",
      Period: "2022年第1四半期",
      Renovation: "未改装",
      Remarks: "",
    },
    {
      Type: "中古マンション等",
      Region: "首都圏",
      MunicipalityCode: "13103",
      Prefecture: "東京都",
      Municipality: "港区",
      DistrictName: "六本木",
      TradePrice: "12000",
      PricePerUnit: "12000",
      FloorPlan: "2LDK",
      Area: "80",
      UnitPrice: "150",
      LandShape: "不明",
      Frontage: "不明",
      TotalFloorArea: "80",
      BuildingYear: "2015年",
      Structure: "RC",
      Use: "住宅",
      Purpose: "住宅",
      Direction: "東",
      Classification: "区分所有建物",
      Breadth: "不明",
      CityPlanning: "商業地域",
      CoverageRatio: "80%",
      FloorAreaRatio: "400%",
      Period: "2022年第1四半期",
      Renovation: "未改装",
      Remarks: "",
    },
  ],
  "14": [
    {
      Type: "中古マンション等",
      Region: "首都圏",
      MunicipalityCode: "14101",
      Prefecture: "神奈川県",
      Municipality: "横浜市",
      DistrictName: "港北区",
      TradePrice: "5500",
      PricePerUnit: "5500",
      FloorPlan: "3LDK",
      Area: "70",
      UnitPrice: "78.6",
      LandShape: "不明",
      Frontage: "不明",
      TotalFloorArea: "70",
      BuildingYear: "2005年",
      Structure: "RC",
      Use: "住宅",
      Purpose: "住宅",
      Direction: "南",
      Classification: "区分所有建物",
      Breadth: "不明",
      CityPlanning: "第一種中高層住居専用地域",
      CoverageRatio: "60%",
      FloorAreaRatio: "200%",
      Period: "2022年第1四半期",
      Renovation: "未改装",
      Remarks: "",
    },
  ],
}

