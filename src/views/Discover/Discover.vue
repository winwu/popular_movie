<template>
    <div class="container">
        <div class="display-4 pt-4 pb-4">{{ $t('common.discover') }}</div>
        <form>
            <div class="form-row">
                <div class="form-group col-md-2">
                    <label for="inputYear">Year</label>
                    <div class="custom-dd active">
                        <div class="custom-dd-selected">
                            <div class="custom-dd-selected-text">2018</div>
                            <i class="custom-dd-arrow">
                                <i class="fas fa-chevron-down"></i>
                            </i>
                        </div>
                        <div class="custom-dd-list">
                            <div class="custom-dd-item">2019</div>
                            <div class="custom-dd-item">2019</div>
                            <div class="custom-dd-item">2019</div>
                            <div class="custom-dd-item">2019</div>
                            <div class="custom-dd-item">2019</div>
                            <div class="custom-dd-item">2019</div>
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-3">
                    <label for="inputYear">Sort By</label>
                    <div class="custom-dd">
                        <div class="custom-dd-selected">2018</div>
                        <div class="custom-dd-list">
                            <div class="custom-dd-item">2019</div>
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-3">
                    <label for="inputYear">Genres</label>
                    <div>#TODO: tag lists</div>
                </div>
                <div class="form-group col-md-2">
                    <label for="inputYear">Keywords</label>
                    <input type="text" class="form-control">
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'discover',
    methods: {
        active(e) {
            console.log(event.currentTarget);
        }
    }
}
</script>

<style lang="scss" scoped>
.custom-dd {
    position: relative;
    color: #fff;
    .custom-dd-selected {
        padding: 6px 30px 6px 10px;
        border-radius: 3px;
        position: relative;
        cursor: pointer;
        background: #9E9E9E;
        &:hover {
            background: darken(#9E9E9E, 5%);
        }
    }
    .custom-dd-arrow {
        position: absolute;
        width: 30px;
        height: 100%;
        top: 0;
        right: 0;
        padding: 0 5px;
        line-height: 30px;
        text-align: center;
        i {
            transform-origin: 50% 50%;
        }
    }
    &.active {
        .custom-dd-list {
            display: block;
        }
        .custom-dd-arrow {
            i {
                transform: rotate(-180deg);
            }
        }
    }
    .custom-dd-list {
        display: none;
        position: absolute;
        background: #666;
        width: 100%;
        max-height: 400px;
        overflow-y: scroll;
        left: 0;
        z-index: 1;
        border-radius: 3px;
        overflow: hidden;
        .custom-dd-item {
            padding: 6px 10px;
            cursor: pointer;
            &:hover {
                background: #444;
            }
        }
    }
}
</style>

