console.log("is this getting run");

setTimeout(() => {
  window.postMessage(
    {
      source: "react-events",
      type: "fetch",
      payload: {
        url: "https://api.example.com",
        duration: 148.7,
        status: 200,
      },
    },
    "*"
  );
}, 1000);
