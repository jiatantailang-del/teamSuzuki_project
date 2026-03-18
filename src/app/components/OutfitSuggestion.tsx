import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Shirt, ShoppingBag, Glasses, Footprints, Lightbulb, MapPin } from "lucide-react";
import type { OutfitRecommendation } from "./WeatherOutfitAdvisor";

type OutfitSuggestionProps = {
  recommendation: OutfitRecommendation;
  weather: string;
  temperature: number;

};

export function OutfitSuggestion({
  recommendation,
  weather,
  temperature,

}: OutfitSuggestionProps) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="shadow-lg border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">おすすめの服装</CardTitle>
          </div>
          <CardDescription className="text-base">
            {weather} / {temperature}°C に最適なコーディネート
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {recommendation.imageSrc && (
            <div className="w-full overflow-hidden rounded-xl shadow-sm">
              <img
                src={recommendation.imageSrc}
                alt="服装のイメージ"
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* トップス */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="bg-pink-100 p-2 rounded-lg">
                  <Shirt className="size-5 text-pink-600" />
                </div>
                <h3 className="font-semibold text-lg">トップス</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {recommendation.tops.map((item, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-pink-100 text-pink-700 hover:bg-pink-200"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            {/* ボトムス */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <ShoppingBag className="size-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg">ボトムス</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {recommendation.bottoms.map((item, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-purple-100 text-purple-700 hover:bg-purple-200"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            {/* アウター */}
            {recommendation.outerwear.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Shirt className="size-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg">アウター</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recommendation.outerwear.map((item, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* 靴 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Footprints className="size-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg">シューズ</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {recommendation.shoes.map((item, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-green-100 text-green-700 hover:bg-green-200"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* アクセサリー */}
          {recommendation.accessories.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Glasses className="size-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg">アクセサリー・小物</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {recommendation.accessories.map((item, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-orange-100 text-orange-700 hover:bg-orange-200"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* アドバイス */}
          {recommendation.tips.length > 0 && (
            <div className="space-y-3 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2">
                <Lightbulb className="size-5 text-yellow-600" />
                <h3 className="font-semibold text-lg text-yellow-900">ワンポイントアドバイス</h3>
              </div>
              <ul className="space-y-1">
                {recommendation.tips.map((tip, index) => (
                  <li key={index} className="text-yellow-900 flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
