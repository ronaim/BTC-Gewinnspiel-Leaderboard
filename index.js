
const predictions = `4100 - 4199         Spray
6700 - 6799         haloxon
7000 - 7099         Koal-84
6100 - 6199         xyz
6500 - 6599         1miau
6600 - 6699         Souri
7200 - 7299         BTC-Liz
7400 - 7499         Real-Duke
7800 - 7899         btc-ail
8500 - 8599         hanspeter77
9200 - 9299         Soonandwaite
9600 - 9699         CoinEraser
9800 - 9899         mole0815
10000 - 10099         Unknown01
10500 - 10599         Lakai01
11100 - 11199         ChefImGartenPavillion
12200 - 12299         bullrun2020bro
12400 - 12499         cygan
13400 - 13499         Buchi-88
14400 - 14499         JL0
15000 - 15099         MishaMuc
16000 - 16099         o_solo_miner
55200 - 55299         fsm247
121200 - 121299         Ov3r`;

async function getPrice() {
    try {
        let btcPrice = (await fetch(
            `https://www.bitstamp.net/api/v2/ticker/btceur/`
        ).then(r => r.json())).last;
        return btcPrice
    }
    catch (e) {
        console.error(e)
        let btcPrice = (await fetch(
            `https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data`
        ).then(r => r.json())).market_data.current_price.eur;
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
    ).textContent = `aktueller Bitcoinpreis: {btcPrice}\n`;
}

main();
setInterval(main, 30000)
