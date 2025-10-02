import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function ImageWithCaption({ 
  src, 
  alt, 
  caption, 
  width, 
  height, 
  className = '' 
}: ImageWithCaptionProps) {
  return (
    <figure className={`my-8 ${className}`}>
      <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 overflow-hidden bg-white">
        <ImageWithFallback
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="mt-4 text-center">
          <span className="bg-black text-white px-3 py-1 font-mono text-sm transform rotate-1 inline-block shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]">
            {caption}
          </span>
        </figcaption>
      )}
    </figure>
  );
}