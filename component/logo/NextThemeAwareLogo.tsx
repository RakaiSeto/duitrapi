'use client';

import { useTheme } from '@/utils/ThemeProvider';
import Image from 'next/image';

interface NextLogoDimension {
    width?: number;
    height?: number;
    reverse?: boolean;
}

export default function ThemeAwareLogo({ width = 180, height = 38, reverse = false }: NextLogoDimension) {
    const theme = useTheme().theme;

    return (
        <Image
            src={`/images/${theme === 'dark' ? (reverse ? 'next' : 'nextDark') : reverse ? 'nextDark' : 'next'}.svg`}
            alt="Next.js logo"
            width={width}
            height={height}
            priority
        />
    );
}
