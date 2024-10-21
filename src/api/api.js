const apiURL = "https://api.topmuzon.uz/v1/api.php";

export async function GetAPI(userID, method = null, query) {
  try {
    const bodyData = {
      "uid": Date.now(),
      "query": query
    };

    // Добавляем метод только если он передан
    if (method) {
      bodyData.method = method;
    }

    const response = await fetch(`${apiURL}?user_id=${userID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    });

    const result = await response.json();
    console.log("Ответ API:", result); // Логируем ответ API
    return result;
  } catch (error) {
    console.error("Ошибка API:", error); // Логируем ошибку
    return null;
  }
}
