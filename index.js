
const predictions = `1308       Yassin
2913       Khaos77
4765       Scheede
4780       tvplus006
5183       haloxon
5384       GrosWesh
5450       Biodom   *H
5660       makrospex
5850       Lakai01
6000       adaseb *
6111       xyz
6218       StartupAnalyst *
6370       Millionero *
6383       sgbett        *H
6400       Phil_S
6500       JSRAW                  H
6613       STT
6666       iwantapony
6755       Heisenberg_Hunter *
6820       Koal-84 *
6890       morvillz7z
7000       Globb0 *                    (previous winner)
7080       aundroid    *
7187       Spray.
7266       irsada
7375       dragonvslinux *
7510       illyiller            *H
7650       hatshepsut93
7777       rosezionjohn
7856       bakasabo
8000       marky89
8080       FractalUniverse*
8152       Real-Duke *
8250       1r0n1c *
8340       cabalism13
8412       LibertValance
8520       Iced
8642       wttbs
8765       ice18
8850       Harkorede
8880       leea-1334
8999       Agrawas
9050       squatter
9100       tyKiwanuka *
9200       HairyMaclairy *
9212       bucciarati
9315       ChrisPop
9449       stompix
9455       markdario112616 *
9599       jojo69
9666       Totscha
9722       trumpman
9800       rdluffy
9831       TopTort777
9876       Mbitr
9888       GreatArkansas *
9922       sirazimuth         H      (previous winner)
10,000       nutildah               H
10,050       asche                                            [for sports no affect on members above en below]
10,101       mole0815
10,123       Icygreen                 H
10,155       Rahar0 2
10,183       Reid
10,200       illinest
10,202       slaman29 *
10,209       exstasie  *                            (previous winner)
10,232       Red-Apple
10,250       o48o              H
10,296       gentlemand *                (previous winner)
10,298       JanEmil
10,300       error08
10,327       bitmover
10,384       xhomerx10               H
10,455       rolling
10,518       inanilujimi
10,620       LogitechMouse
10,666       Eric Cartman
10,678       bitebits
10,750       pooya87 *
10,794       DaveWave                     H
10,800       ChefImGartenPavillion
10,900       wachtwoord
11,050       samuraijin
11,076       LTU_btc
11,111       Searing
11,250       viviansidney
11,254       DarkIT
11,320       ivomm *
11,388       goldkingcoiner                      H
11,432       sheenshane *
11,500       BobLawblaw                H
11,555       yazher
11,750       bavicrypto
11,978       Dunkelheit667        *H
12,000       MCDev *
12,010       vapourminer       H
12,015       d_eddie         *H
12,100       Natalim
12,225       UNOE
12,250       fabiorem
12,297       sunny28
12,345       o_e_l_e_o        H
12,400       bitserve
12,500       actmyname  H
12,600       figmentofmyass
12,688       psycodad
12,777       asu
12,835       GeoRW
12,978       akhjob
13,032       inthelongrun         H
13,087       AT101ET
13,200       Distinctin
13,333       madnessteat
13,475       Buchi-88
13,560       1miau
13,650       Sadlife
13,797       Unknown01
13,865       Ryker1 *
13,870       Saint-loup
14,000       igor72
14,100       Vaculin
14,200       chaser15 *
14,248       Souri
14,372       heslo
14,500       machasm
14,666       Febo *
14,775       Zero1One0
14,999       bitcampaign *
15,000       stadus
15,122       kurious       *H
15,300       rodel caling *
15,431       LFC_Bitcoin
15,500       peter0425
15,750       Dabs
15,872       Hhampuz
16,000       fillippone
16,130       Bttzed03
16,250       chronicsky
16,260       Gyrsur *
16,349       Soonandwaite
16,523       PoolMinor       *H
16,570       cygan
16,666       piebeyb *
16,755       DoublerHunter
16,990       JimboToronto   *H
17,000       rhomelmabini       H
17,200       bkbirge          H
17,409       N0sferatu
17,450       plasticAiredale
17,669       finaleshot2016
17,825       DeathAngel
18,000       Findingnemo
18,100       White sugar  *
18,856       Bitcoinaire *
18,888       Wind_FURY
19,197       NeuroticFish
19,849       LoyceV
20,200       btc78
20,500       carlisle1
20,950       mindrust
21,284       efialtis
21,599       Arriemoller
21,900       infofront
22,222       Last of the V8s   *H
22,345       ChinkyEyes
23,456       buwaytress              H
23,755       epis11
24,047       zarados
24,500       VB1001
25,000       serveria.com
25,500       harizen
26,000       bbc.reporter
27,038       DireWolfM14
29,500       Steamtyme       H
29,990       MishaMuc
33,333       micaxel
34,033       smartcomet
34,599       bitcoinPsycho *
38383        F2b
42,000       Elwar
55,216       fsm247 *`;

async function main() {
    const btcPrice = (await fetch(
        `https://www.bitstamp.net/api/ticker/`
    ).then(r => r.json())).last;

    const leaderBoard = predictions
        .split("\n")
        .map(e => {
            let [price, user] = e.split("       ");
            price = Number(price.replace(/,/g, ""));
            return { price: price, user, delta: Math.abs(btcPrice - price) };
        })
        .sort((a, b) => a.delta - b.delta);

    const table = document.querySelector("#table");

    let i = 0
    for (const { user, price, delta } of leaderBoard) {
        const item = document.createElement("div");
        item.textContent = `${i}. ${price}    ${delta.toFixed(0)}    ${user}`;
        table.append(item);
        i++
    }
    document.getElementById(
        "btcPrice"
    ).textContent = `Current Bitcoin price: ${btcPrice}\n`;
}

main();
