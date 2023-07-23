'use client';

import Image from "next/image";
import { useState } from "react";

const CustomImage = ({ src = "", className = "", alt = "Image" }) => {
    const [imageExists, setImageExists] = useState(true);

    const handleImageError = () => {
        setImageExists(false);
    }

    return (
        imageExists && src ? <Image src={src} className={"!static aspect-[3/2] object-contain " + className} alt={alt} sizes="100%" fill loading="lazy" onError={handleImageError} /> : <Image src="/assets/images/image-not-found.png" className={"!static aspect-[3/2] object-contain " + className} alt={alt} sizes="100%" fill loading="lazy" />
    )
}

export default CustomImage