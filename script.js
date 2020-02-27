        /*LINK TIL JSON FILERNE FRA SHEET, MED ALT INFO*/
        var endpoint = "https://spreadsheets.google.com/feeds/list/1qgHX1DA5a0seGp-zUEolxOHpkMEW9Kmvjbh9SJ8bkc4/od6/public/values?alt=json";

        /*VARIABLER*/
        let produkter = [];
        let filterKnap = document.querySelectorAll(".filter");
        let filter = "alle";

        document.addEventListener("DOMContentLoaded", start);

        /*NÅR SIDEN LOADES, LOADES STARTFUNKTIONERNE I DENNE FUNKTION*/
        function start() {
            hentData();

            filterKnap.forEach(knap => {
                knap.addEventListener("click", filtrering);
            });
        }

        /*FETCHER INFO FRA JSON, SOM INDSÆTTES I TEMPLATEN*/
        async function hentData() {
            const response = await fetch(endpoint);
            produkter = await response.json();
            console.log(produkter);
            visProdukter();

        }

        /*FILTRERE SERIERNE PÅ TV-SHOWS MELLEM ALLE GENRES*/
        function filtrering() {
            console.log("filtrering");
            filter = this.dataset.kategori; // sætter variabel "filter" til aktuel værdi
            document.querySelector(".valgt").classList.remove("valgt"); // fjerner klassen valgt fra aktuel knap
            this.classList.add("valgt") // markere den nyvalgte knap
            visProdukter(); // kalder funktionen vis igen med nyt filter
        }

        /*INDSÆTTER INFOEN FRA JSON PÅ SIDEN*/
        function visProdukter() {

            let container = document.querySelector("#container");
            let produktTemplate = document.querySelector("template");
            let article = document.querySelector("article");

            container.innerHTML = "";

            produkter.feed.entry.forEach(produkt => {
                if (produkt.gsx$kategori.$t == filter || filter == "alle") {
                    let klon = produktTemplate.cloneNode(true).content;
                    klon.querySelector("h2").textContent = produkt.gsx$navn.$t;
                    klon.querySelector("img").src = `imgs/${produkt.gsx$billede.$t}.jpg`;
                    klon.querySelector(".kort").textContent += produkt.gsx$kort.$t;

                    klon.querySelector(".produkt").addEventListener("click", () => {
                        location.href = `detalje.html?id=${produkt.gsx$id.$t}`;

                    });
                    container.appendChild(klon);
                }
            });

        }
