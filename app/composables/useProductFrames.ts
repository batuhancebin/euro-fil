export function useProductFrames(folder: string, totalFrames: number) {
  const urls = Array.from({ length: totalFrames }, (_, i) => {
    const num = String(i + 1).padStart(3, '0')
    return `${folder}/frame_${num}.webp`
  })
  return { urls, totalFrames }
}
