"use client"

import Monster from "@/components/monster";
import { Button } from "@/lib/ui/button";
import { monsters } from "@/lib/ui/monster";
import { useMonster } from "@/provider/monster";
import Link from "next/link";


export default function Home() {
  const { myMonsterId, setMyMonsterId } = useMonster();

  return (
    <main className="pu-10 container">
      {myMonsterId && (
        <div>
          <h2>あなたのモンスターは</h2>
          {/* findメソッドで選択モンスターがいれば名前を表示 */}

          {myMonsterId && (
            <div className="w-40">    
              <Monster onInit={undefined}  mode="none" id={myMonsterId} onAttack={undefined} onSelected={undefined} />
          </div>
          )}
          <Button asChild>
            <Link href={"/battle"}>戦闘開始</Link>
          </Button>
        </div>
      )}
      <h2 className="font-bolx text-2xl container">モンスターを選んでね</h2>
      <div className="grid grid-4 grid-cols-3 container">
        {monsters.map((monster, i) => {
          return <Monster onInit={undefined}  mode="select"
            key={monster.id} id={monster.id} onSelected={(id) => { setMyMonsterId(id) }}/> // ここでidプロパティを修正
        })}
      </div>
    </main>
  );
}




