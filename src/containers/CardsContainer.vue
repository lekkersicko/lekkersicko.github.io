<template>
    <div class="row g-2 mb-3">
        <template v-if="view === 'random'">
            <div class="col-12">
                <div class="alert alert-info alert-dismissible" role="alert">
                    <i class="bi bi-exclamation-circle me-2"></i>De random generator maakt gebruikt van de huidige filters.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <span>Dit zijn {{randomData.length}} <b>random</b> items speciaal voor jou!</span>
                <button type="button" class="btn btn-sm btn-link" @click="contentStore.pickRandomSet()">Geef me wat anders.</button>
            </div>
            <div class="col-6 col-md-4 col-lg-3" v-for="(card, idx) in randomData" :key="idx">
                <card-component :card="card"/>
            </div>
        </template>
        <template v-if="view === 'search'">
            <div class="col-12">{{ sortedData.length}} resultaten</div>
            <div class="col-12" v-if="!sortedData.length">Lekker Appie! Geen resultaten gevonden.</div>
            <div class="col-6 col-md-4 col-lg-3" v-for="(card, idx) in paginatedData" :key="idx">
                <card-component :card="card"/>
            </div>
        </template>
    </div>
    <div v-if="view === 'search'" class="row align-items-center g-2">
        <div class="col-12 col-md">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item" @click="prevPage">
                        <a class="page-link" aria-label="Previous" role="button">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li :class="{active: pageNumber === 0}" class="page-item" @click="goPage(0)"><a class="page-link" role="button">1</a></li>

                    <li v-if="pageCount > 2 && pageNumber > 2" class="page-item"><a class="page-link">...</a></li>

                    <li v-if="pageNumber < 3 && pageCount > 1" :class="{active: pageNumber === 1}" class="page-item" @click="goPage(1)"><a class="page-link" role="button">2</a></li>
                    <li v-if="pageNumber >= 3" :class="{active: pageNumber === 1}" class="page-item" @click="goPage(pageNumber - 1)"><a class="page-link" role="button">{{ pageNumber }}</a></li>

                    <li v-if="pageNumber < 3 && pageCount > 2" :class="{active: pageNumber === 2}" class="page-item" @click="goPage(2)"><a class="page-link" role="button">3</a></li>
                    <li v-if="pageNumber >= 3" class="page-item active" @click="goPage(pageNumber)"><a class="page-link" role="button">{{ pageNumber + 1 }}</a></li>

                    <li v-if="pageNumber < 3 && pageCount > 3" class="page-item" @click="goPage(3)"><a class="page-link" role="button">4</a></li>
                    <li v-if="pageNumber >= 3 && pageCount - 1 > pageNumber" class="page-item" @click="goPage(pageNumber + 1)"><a class="page-link" role="button">{{ pageNumber + 2 }}</a></li>

                    <li v-if="pageCount > 4 && pageCount - 3 > pageNumber" class="page-item"><a class="page-link">...</a></li>
                    <li v-if="pageCount > 4 && pageCount - 2 > pageNumber" class="page-item" @click="goPage(pageCount - 1)"><a class="page-link" role="button">{{ pageCount }}</a></li>

                    <li class="page-item" @click="nextPage">
                        <a class="page-link" aria-label="Next" role="button">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="col-auto ms-auto">
            <span class="badge rounded-pill text-uppercase fw-bold">{{ sortedData.length }} resultaten</span>
        </div>
        <div class="col-auto">
            <select class="form-select" aria-label="Default select example" v-model="pageSize">
                <option :value="12">12 resultaten per pagina</option>
                <option :value="24">24 resultaten per pagina</option>
                <option :value="36">36 resultaten per pagina</option>
                <option :value="60">60 resultaten per pagina</option>
                <option :value="'all'">Toon alles ({{sortedData.length}})</option>
            </select>
        </div>

    </div>
</template>

<script setup>
import {computed, defineAsyncComponent, ref} from "vue";
import {useContentStore} from "@/stores/content.js";
import {storeToRefs} from "pinia";
import {useGeneralStore} from "@/stores/general.js";
const CardComponent = defineAsyncComponent(() =>
    import("@/components/cardComponent.vue")
)

// store
const generalStore = useGeneralStore()
const contentStore = useContentStore()
const {view, pageSize, pageNumber} = storeToRefs(generalStore)
const {sortedData, randomData} = storeToRefs(contentStore)

const paginatedData = computed(() => {
    if (pageSize.value === 'all') return sortedData.value
    const start = pageNumber.value * pageSize.value,
        end = start + pageSize.value
    return sortedData.value.slice(start, end)
})
const pageCount = computed(() =>  {
    if (pageSize.value === 'all') return 1
    const l = sortedData.value.length,
        s = pageSize.value;
    return Math.ceil(l / s);
})

function prevPage() {
    if (pageNumber.value > 0)
        pageNumber.value--
}
function nextPage() {
    if (pageNumber.value < pageCount.value)
        pageNumber.value++
}
function goPage(i) {
    pageNumber.value = i;
}
</script>

<style scoped></style>
