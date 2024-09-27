
const apiURL = "https://api.topmuzon.uz/v1/api.php"

export async function GetAPI(userID, query) {
    return await fetch(`${apiURL}?user_id=${userID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "uid": Date.now(), "query": query})
      })
        .then(data => data.json())
}