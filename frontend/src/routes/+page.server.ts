import dotenv from 'dotenv'

dotenv.config()

export async function load() {
  const url = process.env.RENDER_URL as RequestInfo
  const data = await fetch(url)
  let result = await data.json()
  result = result.results
  return {
    result, 
    url
  }
}