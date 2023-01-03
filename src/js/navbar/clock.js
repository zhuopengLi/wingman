export default setInterval(() => {
    const today = new Date();
    let t = [today.toLocaleTimeString(), today.toDateString()];

    let time = document.querySelector("#time");
    time.innerHTML = `${t[0]}, ${t[1]} (CET)`;
}, 1000);
