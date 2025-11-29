export interface Movie {
	id: number
	title: string
	src: string
    trailer: string
	price: number
	year: number
	genre: string
    language: string
	slug: string
	description: string
	highlight?: string
	duration: number
	rating: number
	director: string
	cast: string[]
	categories: string[]
}
