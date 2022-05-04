export async function callAPI(URL) {
  try {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(URL)}`
    );
    const rjson = await response.json();
    const data = JSON.parse(rjson.contents);
    return data;
  } catch (error) {
    return null;
  }
}
