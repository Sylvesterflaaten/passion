        const endpoint = "https://spreadsheets.google.com/feeds/list/1qgHX1DA5a0seGp-zUEolxOHpkMEW9Kmvjbh9SJ8bkc4/od6/public/values?alt=json";

        let produkter = [];
        let filterKnap = document.querySelectorAll(".filter");
        let filter = "alle";

        document.addEventListener("DOMContentLoaded", start);


        function start() {
            hentData();
            filterKnap.forEach(knap => {
                knap.addEventListener("click", filtrering);
            });

        }

        async function hentData() {
            const response = await fetch(endpoint);
            produkter = await response.json();
            console.log(produkter);
            visProdukter();
        }

        function filtrering() {
            console.log("filtrering");
            filter = this.dataset.kategori; // sæt variabel "filter" til aktuel værdi
            document.querySelector(".valgt").classList.remove("valgt"); // fjern klassen valgt fra aktuel knap
            this.classList.add("valgt") // marker den nyvalgte knap
            visProdukter(); // kald funktionen vis igen med nyt filter
        }



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
/*                    klon.querySelector(".genre").textContent += `${produkt.gsx$genre.$t}`;*/

                    klon.querySelector(".produkt").addEventListener("click", () => {
                        location.href = `detalje.html?id=${produkt.gsx$id.$t}`;
                        //visDetalje(produkt);
                    });
                    container.appendChild(klon);
                }
            });

        }
