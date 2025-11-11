import { NextResponse } from 'next/server'
import moviesData from '@/data/movies.json'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const limit = searchParams.get('limit')
	
	const limitNumber = limit ? parseInt(limit, 10) : 24
	const movies = moviesData.slice(0, limitNumber)
	
	return NextResponse.json(movies)
}
