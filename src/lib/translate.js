var res = fetch("https://libretranslate.com/translate", {
    method: "POST",
    body: JSON.stringify({
        q: "hello, how are you?",
        source: "en",
        target: "es",
        format: "text",
        alternatives: 3,
        api_key: ""
    }),
    headers: { "Content-Type": "application/json" }
}).then(function (response) {
    return response.json()
}).then(data => {console.log(data);});
