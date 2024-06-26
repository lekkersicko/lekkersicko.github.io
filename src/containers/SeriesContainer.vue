<template>
    <div class="row g-2 mb-3">
        <div class="col-6 col-md-4 col-lg-3" v-for="(card, idx) in paginatedData" :key="idx">
            <card-component :card="card" :is-series="true"/>
        </div>
    </div>
    <div class="row align-items-center g-2">
        <div class="col-12 col-md">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item" @click="prevPage">
                        <a class="page-link" aria-label="Previous" role="button">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li :class="{active: pageNumberSeries === 0}" class="page-item" @click="goPage(0)"><a class="page-link" role="button">1</a></li>

                    <li v-if="pageCount > 2 && pageNumberSeries > 2" class="page-item"><a class="page-link">...</a></li>

                    <li v-if="pageNumberSeries < 3 && pageCount > 1" :class="{active: pageNumberSeries === 1}" class="page-item" @click="goPage(1)"><a class="page-link" role="button">2</a></li>
                    <li v-if="pageNumberSeries >= 3" :class="{active: pageNumberSeries === 1}" class="page-item" @click="goPage(pageNumberSeries - 1)"><a class="page-link" role="button">{{ pageNumberSeries }}</a></li>

                    <li v-if="pageNumberSeries < 3 && pageCount > 2" :class="{active: pageNumberSeries === 2}" class="page-item" @click="goPage(2)"><a class="page-link" role="button">3</a></li>
                    <li v-if="pageNumberSeries >= 3" class="page-item active" @click="goPage(pageNumberSeries)"><a class="page-link" role="button">{{ pageNumberSeries + 1 }}</a></li>

                    <li v-if="pageNumberSeries < 3 && pageCount > 3" class="page-item" @click="goPage(3)"><a class="page-link" role="button">4</a></li>
                    <li v-if="pageNumberSeries >= 3 && pageCount - 1 > pageNumberSeries" class="page-item" @click="goPage(pageNumberSeries + 1)"><a class="page-link" role="button">{{ pageNumberSeries + 2 }}</a></li>

                    <li v-if="pageCount > 4 && pageCount - 3 > pageNumberSeries" class="page-item"><a class="page-link">...</a></li>
                    <li v-if="pageCount > 4 && pageCount - 2 > pageNumberSeries" class="page-item" @click="goPage(pageCount - 1)"><a class="page-link" role="button">{{ pageCount }}</a></li>

                    <li class="page-item" @click="nextPage">
                        <a class="page-link" aria-label="Next" role="button">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="col-auto ms-auto">
            <span class="badge rounded-pill text-uppercase fw-bold">{{ sortedDataSeries.length }} resultaten</span>
        </div>
        <div class="col-auto">
            <select class="form-select" aria-label="Default select example" v-model="pageSize">
                <option :value="12">12 resultaten per pagina</option>
                <option :value="24">24 resultaten per pagina</option>
                <option :value="36">36 resultaten per pagina</option>
                <option :value="60">60 resultaten per pagina</option>
                <option :value="'all'">Toon alles ({{sortedDataSeries.length}})</option>
            </select>
        </div>

    </div>
</template>

<script setup>
import {computed, defineAsyncComponent} from "vue";
import {useContentStore} from "@/stores/content.js";
import {storeToRefs} from "pinia";
import {useGeneralStore} from "@/stores/general.js";

const CardComponent = defineAsyncComponent(() =>
    import("@/components/cardComponent.vue")
)

// store
const generalStore = useGeneralStore()
const contentStore = useContentStore()
const {pageSize, pageNumberSeries} = storeToRefs(generalStore)
const {sortedDataSeries} = storeToRefs(contentStore)

const paginatedData = computed(() => {
    if (pageSize.value === 'all') return sortedDataSeries.value
    const start = pageNumberSeries.value * pageSize.value,
        end = start + pageSize.value
    return sortedDataSeries.value.slice(start, end)
})
const pageCount = computed(() =>  {
    if (pageSize.value === 'all') return 1
    const l = sortedDataSeries.value.length,
        s = pageSize.value;
    return Math.ceil(l / s);
})

function prevPage() {
    if (pageNumberSeries.value > 0)
        pageNumberSeries.value--
}
function nextPage() {
    if (pageNumberSeries.value < pageCount.value)
        pageNumberSeries.value++
}
function goPage(i) {
    pageNumberSeries.value = i;
}

</script>

<style scoped></style>
