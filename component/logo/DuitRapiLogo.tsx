'use client';

import Image from "next/image";

interface DuitRapiLogoDimension {
    width?: number;
    height?: number;    
}

export default function DuitRapiLogo({ width = 25, height = 25 }: DuitRapiLogoDimension) {
    return (
        <Image
            src={`/images/duitrapi.png`}
            alt="DuitRapi Logo"
            width={width}
            height={height}
            priority
        />
    )
}