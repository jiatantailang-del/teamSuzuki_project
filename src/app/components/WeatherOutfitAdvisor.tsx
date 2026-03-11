import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { OutfitSuggestion } from "./OutfitSuggestion";
import { Cloud, CloudRain, CloudSnow, Sun, CloudDrizzle } from "lucide-react";

export type OutfitRecommendation = {
  tops: string[];
  bottoms: string[];
  outerwear: string[];
  shoes: string[];
  accessories: string[];
  tips: string[];
};

export function WeatherOutfitAdvisor() {
  const [weather, setWeather] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [recommendation, setRecommendation] = useState<OutfitRecommendation | null>(null);

  const getOutfitRecommendation = (
    weather: string,
    temp: number,
    region: string
  ): OutfitRecommendation => {
    const recommendation: OutfitRecommendation = {
      tops: [],
      bottoms: [],
      outerwear: [],
      shoes: [],
      accessories: [],
      tips: [],
    };

    // 気温による基本的な服装提案
    if (temp <= 5) {
      recommendation.tops = ["厚手のニット", "タートルネックセーター", "フリースインナー"];
      recommendation.bottoms = ["厚手のパンツ", "ウールスカート＋タイツ", "レギンス付きパンツ"];
      recommendation.outerwear = ["ダウンコート", "ウールコート", "中綿入りジャケット"];
      recommendation.shoes = ["ムートンブーツ", "厚手の靴下＋ブーツ", "スノーブーツ"];
      recommendation.accessories = ["マフラー", "手袋", "ニット帽", "耳当て"];
      recommendation.tips = ["しっかり防寒対策をしましょう", "重ね着がおすすめです"];
    } else if (temp <= 15) {
      recommendation.tops = ["セーター", "長袖ニット", "厚手のブラウス"];
      recommendation.bottoms = ["パンツ", "ロングスカート＋タイツ", "デニムパンツ"];
      recommendation.outerwear = ["コート", "トレンチコート", "ジャケット"];
      recommendation.shoes = ["ブーツ", "スニーカー", "ローファー"];
      recommendation.accessories = ["ストール", "マフラー"];
      recommendation.tips = ["朝晩は冷えるので羽織物があると安心です"];
    } else if (temp <= 20) {
      recommendation.tops = ["長袖シャツ", "薄手のニット", "カーディガン"];
      recommendation.bottoms = ["パンツ", "スカート", "ワイドパンツ"];
      recommendation.outerwear = ["薄手のジャケット", "カーディガン", "スプリングコート"];
      recommendation.shoes = ["パンプス", "スニーカー", "フラットシューズ"];
      recommendation.accessories = ["薄手のストール"];
      recommendation.tips = ["重ね着で調節しやすい服装がおすすめです"];
    } else if (temp <= 25) {
      recommendation.tops = ["ブラウス", "半袖カットソー", "薄手の長袖シャツ"];
      recommendation.bottoms = ["スカート", "薄手のパンツ", "ワイドパンツ"];
      recommendation.outerwear = ["薄手のカーディガン（室内用）"];
      recommendation.shoes = ["パンプス", "サンダル", "スニーカー"];
      recommendation.accessories = ["帽子（日よけ）", "サングラス"];
      recommendation.tips = ["日差しが強いので日焼け対策を忘れずに"];
    } else {
      recommendation.tops = ["半袖Tシャツ", "ノースリーブトップス", "リネンシャツ"];
      recommendation.bottoms = ["ショートパンツ", "薄手のスカート", "サマーパンツ"];
      recommendation.outerwear = ["薄手の羽織（冷房対策）"];
      recommendation.shoes = ["サンダル", "ミュール", "スニーカー"];
      recommendation.accessories = ["帽子", "サングラス", "日傘"];
      recommendation.tips = ["熱中症に注意して水分補給をこまめに", "冷房対策に薄い羽織物があると便利です"];
    }

    // 天気による追加提案
    if (weather === "雨") {
      recommendation.outerwear.push("レインコート");
      recommendation.shoes = ["レインブーツ", "防水加工のシューズ"];
      recommendation.accessories.push("折りたたみ傘");
      recommendation.tips.push("防水性のある服装がおすすめです");
    } else if (weather === "雪") {
      recommendation.outerwear.push("防水ダウンコート");
      recommendation.shoes = ["スノーブーツ", "防水ブーツ"];
      recommendation.accessories.push("防寒手袋", "マフラー");
      recommendation.tips.push("滑りにくい靴を選びましょう");
    } else if (weather === "曇り") {
      recommendation.tips.push("気温変化に備えて羽織物を持ち歩くと安心です");
    } else if (weather === "晴れ") {
      if (temp >= 20) {
        recommendation.tips.push("紫外線対策をしっかりと");
        recommendation.accessories.push("UVカットアイテム");
      }
    }

    return recommendation;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (weather && temperature && region) {
      const temp = parseFloat(temperature);
      const outfit = getOutfitRecommendation(weather, temp, region);
      setRecommendation(outfit);
    }
  };

  const getWeatherIcon = () => {
    switch (weather) {
      case "晴れ":
        return <Sun className="size-6 text-yellow-500" />;
      case "曇り":
        return <Cloud className="size-6 text-gray-400" />;
      case "雨":
        return <CloudRain className="size-6 text-blue-500" />;
      case "雪":
        return <CloudSnow className="size-6 text-blue-300" />;
      default:
        return <CloudDrizzle className="size-6 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            天気に合わせた服装提案
          </h1>
          <p className="text-gray-600">
            今日の天気と気温を入力して、ぴったりの服装を見つけましょう
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getWeatherIcon()}
              気象情報を入力
            </CardTitle>
            <CardDescription>
              お住まいの地域の天気と気温を教えてください
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weather">天気</Label>
                  <Select value={weather} onValueChange={setWeather}>
                    <SelectTrigger id="weather">
                      <SelectValue placeholder="天気を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="晴れ">☀️ 晴れ</SelectItem>
                      <SelectItem value="曇り">☁️ 曇り</SelectItem>
                      <SelectItem value="雨">🌧️ 雨</SelectItem>
                      <SelectItem value="雪">❄️ 雪</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="temperature">気温（°C）</Label>
                  <Input
                    id="temperature"
                    type="number"
                    placeholder="例: 18"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">地域</Label>
                  <Input
                    id="region"
                    type="text"
                    placeholder="例: 東京"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                服装を提案してもらう
              </Button>
            </form>
          </CardContent>
        </Card>

        {recommendation && (
          <OutfitSuggestion
            recommendation={recommendation}
            weather={weather}
            temperature={parseFloat(temperature)}
            region={region}
          />
        )}
      </div>
    </div>
  );
}
