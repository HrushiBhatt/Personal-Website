/** What an `?responsive` image import resolves to (vite-imagetools `as=picture`). */
export interface Picture {
  sources: { webp?: string }
  img: { src: string; w: number; h: number }
}

/** Spread onto an <img>: src, srcSet and intrinsic size (prevents layout shift). */
export function imgProps(picture: Picture, sizes: string) {
  return {
    src: picture.img.src,
    srcSet: picture.sources.webp,
    sizes,
    width: picture.img.w,
    height: picture.img.h,
  }
}
