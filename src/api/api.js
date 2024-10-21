const apiURL = "https://api.topmuzon.uz/v1/api.php";

export async function GetAPI(userID, method = null, query) {
  try {
    const bodyData = {
      "uid": Date.now(),
      "query": query
    };

    if (method) {
      bodyData.method = method;
    }

    const response = await fetch(`${apiURL}?user_id=${userID}`, {
      method: 'POST',
      mode: 'no-cors', // Added no-cors mode
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    });

    // Response body may not be accessible due to 'no-cors' mode
    if (!response.ok) {
      throw new Error(`Network error: ${response.status}`);
    }

    // Handle response, but note that the response body might be unavailable in no-cors mode
    const result = await response.json();
    console.log("API response:", result);
    return result;

  } catch (error) {
    console.error("API error:", error.message);
    return { error: true, message: error.message };
  }
}
