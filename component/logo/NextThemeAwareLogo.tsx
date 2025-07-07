'use client';

import { useTheme } from "@/component/javascript/ThemeProvider";
import Image from "next/image";

interface NextLogoDimension {
    width?: number;
    height?: number;
}

export default function ThemeAwareLogo({ width = 180, height = 38 }: NextLogoDimension) {
    const theme = useTheme().theme;

    return (
        <Image
            src={`/images/${theme === 'dark' ? 'nextDark' : 'next'}.svg`}
            alt="Next.js logo"
            width={width}
            height={height}
            priority
        />
    )
}