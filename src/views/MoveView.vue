<template>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col col-md-8">
                <div class="card mb-3">
                    <div class="card-body">
                        <div class="mb-5">
                            <h1>We zijn verhuisd!</h1>
                            <p>We willen jullie laten weten dat we zijn verhuisd naar een nieuw webadres: <a href="https://lekkerspeuren.nl/" target="_blank">Lekkerspeuren.nl</a>. We
                                hebben deze stap gezet om onze website te verbeteren en jullie een nóg leukere ervaring te
                                bieden.</p>
                            <p>
                                Alles wat jullie gewend zijn te vinden, is nog steeds beschikbaar op ons nieuwe adres. Als je ergens
                                tegenaan loopt of vragen hebt, laat het ons dan gerust weten.
                            </p>
                            <p>Bedankt voor jullie support en we hopen jullie snel te zien op <a href="https://lekkerspeuren.nl/" target="_blank">Lekkerspeuren.nl</a>!</p>
                        </div>

                        <div class="">
                            <h2>Maar mijn opgeslagen data dan?</h2>
                            <p>Wees gerust, we hebben een speciale download/upload tool gemaakt om jouw data mee te verhuizen
                                naar de nieuwe website.</p>
                            <p>Hier is hoe je dit kunt doen:</p>
                            <ol>
                                <li>Klik op de onderstaande knop om je gegevens te downloaden.</li>
                                <li>Als de download is voltooid, sla je het bestand op een veilige locatie op je apparaat op.</li>
                                <li>Ga naar de <a href="https://lekkerspeuren.nl/upload-tool" target="_blank">uploadtool</a> op de nieuwe website en upload daar het bestand dat zojuist is gedownload.</li>
                                <li>All done! Eitje toch?</li>
                             </ol>
                            <button class="btn btn-primary" @click="downloadUserData">Download mijn data</button>
                        </div>
                    </div>
                </div>
<!--                <div class="card">-->
<!--                    <div class="card-body">-->
<!--                        <div class="mb-3">-->
<!--                            <label for="formFile" class="form-label">Upload .json bestand</label>-->
<!--                            <input class="form-control" type="file" id="formFile" accept=".json">-->
<!--                        </div>-->
<!--                        <button class="btn btn-primary" @click="uploadUserData">Laad mijn data</button>-->
<!--                    </div>-->
<!--                </div>-->
            </div>
        </div>
    </div>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useGeneralStore} from "@/stores/general.js";
const generalStore = useGeneralStore()

const {likedItems, seenItems, history, playlists} = storeToRefs(generalStore)

function downloadUserData() {
    const userData = {
        likedItems: likedItems.value,
        seenItems: seenItems.value,
        history: history.value,
        playlists: playlists.value
    }

    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(userData, null, 2)], {type: "text/plain"});
    a.href = URL.createObjectURL(file);
    a.download = 'mijn-lekker-speuren-data.json';
    a.click();
}

function uploadUserData() {
    const files = document.getElementById('formFile').files;
    if (files.length <= 0) {
        return false;
    }

    const fr = new FileReader();

    fr.onload = e => {
        const result = JSON.parse(e.target.result);
        generalStore.setLocaleStorageFromFile(result)
    }
    fr.readAsText(files.item(0));
}
</script>


<style scoped>

</style>