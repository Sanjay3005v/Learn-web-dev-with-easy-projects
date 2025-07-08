const ACCESS_TOKEN = "14671b9cad64893ad8fa121020997b9e3ff25979";

async function shortenUrl() {
    const longUrl = document.getElementById("longUrl").value;
    const apiUrl = "https://api-ssl.bitly.com/v4/shorten";

    if (!longUrl) {
        alert("Please enter a URL.");
        return;
    }

    const headers = {
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json"
    };

    const data = {
        long_url: longUrl
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Failed to shorten URL.");
        }

        const result = await response.json();
        document.getElementById("shortUrl").value = result.link;
        document.getElementById("result").style.display = "block";
    } catch (error) {
        alert("Error: " + error.message);
    }
}

function copyToClipboard() {
    const shortUrlInput = document.getElementById("shortUrl");

    if (!shortUrlInput.value) {
        alert("No shortened URL to copy.");
        return;
    }

    shortUrlInput.select();
    shortUrlInput.setSelectionRange(0, 99999); // For mobile
    document.execCommand("copy");

    alert("Shortened URL copied to clipboard!");
}
