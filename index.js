
const predictions = `
5601 - 5650             bitcoincidence
6301 - 6350             Spray.
7351 - 7400             Chris601
7001 - 7050             Koal-84
7251 - 7300             haloxon
7301 - 7350             mole0815
7651 - 7700             xyz
7951 - 8000             tyKiwanuka
8001 - 8050             RaspoBTC
8051 - 8100             bct_ail
8151 - 8200             Nestade
8501 - 8550             hanspeter77
9201 - 9250             Ov3R
9901 - 9950             1miau
10001 - 10050         Real-Duke
10701 - 10750         micgoossens
11001 - 11050         Lakai
11401 - 11450         butch3r
11750 - 11800         Lafu
12501 - 12550         cygan
13451 - 13500         Buchi-88
13601 - 13650         efialtis
14951 - 15000         Unknown01
15001 - 15050         MishaMuc
16501 - 16550         o_solo_miner
18831 - 18.880        MinoRaiola
19001 - 19050         Alabasta
55201 - 55250         fsm247`;

async function getPrice() {
    try {
        let btcPrice = (await fetch(
            `https://www.bitstamp.net/api/ticker/`
        ).then(r => r.json())).last;
        return btcPrice
    }
    catch (e) {
        console.error(e)
        let btcPrice = (await fetch(
            `https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data`
        ).then(r => r.json())).market_data.current_price.usd;
        return btcPrice
    }


}

async function main() {
    const btcPrice = await getPrice()

    const leaderBoard = predictions
        .split("\n")
        .map(e => {
            let [price, user] = e.split("      ");
            price = price.split("-").map(e => Number(e.replace(/,/g, "")));
            user = user.replace(" *", "").trim()
            delta = btcPrice > price[1] ? Math.abs(btcPrice - price[1]) : Math.abs(btcPrice - price[0]) //Math.abs(btcPrice - (price[0] + price[1]) / 2) 
            sign = btcPrice > price[1] ? "-" : "+"
            return { price, user, delta, sign };
        })
        .sort((a, b) => a.delta - b.delta);
    const table = document.querySelector("#table");
    table.innerHTML = ""   
    
    let i = 0
    for (const { user, price, delta, sign } of leaderBoard) {
        const item = document.createElement("tr");


        const priceTd = document.createElement("td")
        const deltaTd = document.createElement("td")
        const userTd = document.createElement("td")
        priceTd.textContent = `${i}. ${price[0]}-${price[1]}`
        userTd.textContent = user
        if (i === 0) {
            deltaTd.textContent = "0"

        }
        else {
            deltaTd.textContent = `${sign}${delta.toFixed(0)}`
        }
        item.append(priceTd)
        item.append(deltaTd)
        item.append(userTd)
        item.classList.add("table-item")
        table.append(item);
        i++
    }
    document.getElementById(
        "btcPrice"
    ).textContent = `Current Bitcoin price: $${btcPrice}\n`;
}

main();
setInterval(main, 30000)
