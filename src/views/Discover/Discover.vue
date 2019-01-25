<template>
    <div class="container">
        <div class="display-4 pt-4 pb-4">{{ $t('common.discover') }}</div>
        <form>
            <div custom-dropdown></div>
            <div class="form-row">
                <div class="form-group col-md-2">
                    <custom-dropdown label-title="Year" :selected-value.sync='yearSelected' :lists="listYear"></custom-dropdown>
                </div>
                <div class="form-group col-md-3">
                    <custom-dropdown label-title="Sort By" :selected-value.sync='sortSelected' :lists="listSort"></custom-dropdown>
                </div>
                <!-- <div class="form-group col-md-3">
                    <label for="inputYear">Genres</label>
                    <div>#TODO: tag lists</div>
                </div> >
                <div class="form-group col-md-2">
                    <label for="inputYear">Keywords</label>
                    <input type="text" class="form-control">
                </div>-->
            </div>
        </form>
    </div>
</template>

<script>
import CustomDropdown from './CustomDropdown'
export default {
    name: 'discover',
    methods: {
    },
    data() {
        return {
            listYear: [2016, 2017, 2018, 2019, 2020],
            yearSelected: (new Date()).getFullYear(),
            listSort: [
                {
                    key: 'popularity.desc',
                    value: 'Popularity Descending'
                },
                {
                    key: 'popularity.asc',
                    value: 'Popularity Ascending'
                },
                {
                    key: 'title.asc',
                    value: 'Title (A-Z)'
                },
                {
                    key: 'vote_average.desc',
                    value: 'Vote Average Descending'
                },
                {
                    key: 'vote_average.asc',
                    value: 'Vote Average Ascending'
                }
            ],
            sortSelected: 'popularity.desc'
        }
    },
    components: {
        CustomDropdown
    }
}
</script>
