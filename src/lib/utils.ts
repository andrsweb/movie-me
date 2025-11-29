export const formatTime = (seconds: number): string => {
	const hours = Math.floor(seconds / 3600)
	const mins = Math.floor((seconds % 3600) / 60)
	const secs = seconds % 60
	if (hours > 0) {
		return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
	}
	return `${mins}:${secs.toString().padStart(2, '0')}`
}

export default function formatDuration(duration: number): string {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60
    const parts: string[] = []

    if (hours > 0) parts.push(`${hours}h`)
    parts.push(`${minutes}m`)
    return parts.join(' ')
}