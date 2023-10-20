import { PUBLIC_RENDER_URL } from '$env/static/public'


export async function load(page) {
  const url = PUBLIC_RENDER_URL as RequestInfo
  const data = await fetch(url+`?lender_email=${page.data.session?.user?.email}`)
  let result = await data.json()
  const sum = result.sum
  result = result.results

  return {
    result, 
    url,
    sum
  }
}