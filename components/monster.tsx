import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { monsters } from "../lib/ui/monster";
import { Button } from "../lib/ui/button";
import { cn } from "@/lib/utils";
import {Howl, Howler} from 'howler';

type MonsterProps = 
| {
  id: number; 
  mode: 'select';
  onSelected: (id: number) => void;
  onAttack?: undefined;
  onInit: undefined;
}
| {
  id: number; 
  mode: 'battle';
  onAttack: () => void;
  onSelected?: undefined;
  onInit:(setHp: Dispatch<SetStateAction<number>>) => void;
}
| {
    id: number; 
    mode: 'none';
    onAttack: undefined;
    onSelected: undefined;
    onInit: undefined;
  }

export default function Monster({
    id, mode, onInit, onSelected, onAttack
  } : MonsterProps) {
    const [hp, setHp] = useState(100);
    const sound = useMemo(() => {
      return new Howl({
        src:['sounds/attack.mp3'],
        html5:true,
      })
    }, []); 

  
    const monster = useMemo(() => {
      return monsters.find((monster) => monster.id === id);
    }, [id]);

    useEffect(() => {
      onInit?.(setHp)
      console.log("初期化");
    }, [setHp, onInit])
  
    if (!monster) {
      return null;
    }
  
    return (
      <div key={monster.id} className="p-4 border space-y-2 shadow-sm">
        <div className="aspect-square relative">
        <Image
          src={`/images/モンスター${monster.id}.png`}
          alt={`モンスター ${monster.name}`}
          fill
          unoptimized
        />
        </div>
        <h2>{monster.name}</h2>
  
        {/* もしbattelモードだったらHP表示 */}
        {mode === 'battle' && (
          <div>
            <p>HP: {hp}</p>
            <div className="h-3 rounded-full overflow-hidden border">
              {/* cnによってclassを繋げながら三項演算子ができる */}
              <div className={cn(
                'bg-lime-500 size-full rounded-full transition duration-500 origin-left',
                hp > 30 ? 'bg-green-500': 'bg-red-500'
              )} style={{
                transform : `scaleX(${hp / 100})`,
              }}></div>
            </div>
          </div>
        )}
  
        {/* もしbattleモードだったらアタックボタンを表示 */}
        {mode === 'battle' && (
          <Button
            onClick={() => {
              // Math.maxにより0になったらソリ上行かないように制御する
              onAttack();
              sound.play();
            }}
            disabled={hp <= 0}
          >アタック</Button>
        )}
        {/* もしselectモードだったら選ぶボタンを表示 */}
        {mode === 'select' && (
          <Button
            onClick={() => onSelected(monster.id)}
            disabled={hp <= 0}
          >選ぶ</Button>
        )}
      </div>
    );
  }
