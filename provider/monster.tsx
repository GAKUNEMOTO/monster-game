"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

// ジェネリック型としてContextTypeを定義
type MyMonsterContextType = {
    myMonsterId: number | undefined;
    setMyMonsterId: (id: number) => void;
}

// コンテキストの型をジェネリック型で指定
const MyMonsterContext = createContext<MyMonsterContextType | undefined>(undefined);

export function MonsterProvider({ children }: {children: ReactNode}){
    const [myMonsterId, setMyMonsterId] = useState<number>();

    return (
        <MyMonsterContext.Provider value={{ myMonsterId, setMyMonsterId }}>
            {children}
        </MyMonsterContext.Provider>
    )
}

// useMonsterの戻り値型をMyMonsterContextTypeに変更
export const useMonster = () => {
    const context = useContext(MyMonsterContext);
    if (!context) {
        throw new Error('useMonster must be used within a MonsterProvider');
    }
    return context;
}
