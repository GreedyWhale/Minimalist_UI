<template>
  <div :class="{ 'm-table__wrapper': true, bordered: bordered }">
    <table :class="tableClass" v-if="columns.length && fixedHead">
      <colgroup>
        <template v-if="extendedColumns.length">
          <col
            v-for="extendedCol in extendedColumns"
            :key="`${extendedCol.field}-extended-col`"
            :style="setCellWidth(extendedCol.width)"
          />
        </template>
        <template v-if="columns.length">
          <col
            v-for="column in columns"
            :key="`${column.field}-col`"
            :style="setCellWidth(column.width)"
          />
        </template>
      </colgroup>
      <thead>
        <tr>
          <template v-if="extendedColumns.length">
            <template v-for="extendedCol in extendedColumns">
              <th
                :key="`${extendedCol.field}-th-checkbox`"
                v-if="extendedCol.field === 'selection'"
                class="center-cell"
              >
                <input
                  type="checkbox"
                  ref="selectAll"
                  @change="selectAllItems"
                  :checked="areAllItemsSelected"
                />
              </th>
              <th
                :key="`${extendedCol.field}-th-index`"
                v-if="extendedCol.field === 'index'"
                class="center-cell"
              >
                <span>#</span>
              </th>
              <th
                :key="`${extendedCol.field}-th-expend`"
                v-if="extendedCol.field === 'expend'"
                class="center-cell"
              ></th>
            </template>
          </template>
          <th v-for="col in columns" :key="col.field">
            <div class="table-header__cell">
              {{ col.title }}
              <span
                class="table-header__cell-icons"
                @click="clickSortIcon($event, col.field)"
                v-if="visibleSortIcons(col.field)"
              >
                <m-icon
                  icon="caret-up"
                  :class="{ active: setSortIconClass(col.field, 'asc') }"
                ></m-icon>
                <m-icon
                  icon="caret-down"
                  :class="{ active: setSortIconClass(col.field, 'desc') }"
                ></m-icon>
              </span>
            </div>
          </th>
          <th v-if="$scopedSlots.actions"></th>
        </tr>
      </thead>
    </table>
    <div
      class="m-table__wrapper-inner"
      :style="height ? `height: ${height}px` : ''"
    >
      <table :class="tableClass">
        <colgroup>
          <template v-if="extendedColumns.length">
            <col
              v-for="extendedCol in extendedColumns"
              :key="`${extendedCol.field}-extended-col`"
              :style="setCellWidth(extendedCol.width)"
            />
          </template>
          <template v-if="columns.length">
            <col
              v-for="column in columns"
              :key="`${column.field}-col`"
              :style="setCellWidth(column.width)"
            />
          </template>
        </colgroup>
        <thead v-if="columns.length && !fixedHead">
          <tr>
            <template v-if="extendedColumns.length">
              <template v-for="extendedCol in extendedColumns">
                <td
                  :key="`${extendedCol.field}-th-checkbox`"
                  v-if="extendedCol.field === 'selection'"
                  class="center-cell"
                >
                  <input
                    type="checkbox"
                    ref="selectAll"
                    @change="selectAllItems"
                    :checked="areAllItemsSelected"
                  />
                </td>
                <td
                  :key="`${extendedCol.field}-th-index`"
                  v-if="extendedCol.field === 'index'"
                  class="center-cell"
                >
                  <span>#</span>
                </td>
                <td
                  :key="`${extendedCol.field}-th-expend`"
                  v-if="extendedCol.field === 'expend'"
                  class="center-cell"
                ></td>
              </template>
            </template>
            <th v-for="col in columns" :key="col.field">
              <div class="table-header__cell">
                {{ col.title }}
                <span
                  class="table-header__cell-icons"
                  @click="clickSortIcon($event, col.field)"
                  v-if="visibleSortIcons(col.field)"
                >
                  <m-icon
                    icon="caret-up"
                    :class="{ active: setSortIconClass(col.field, 'asc') }"
                  ></m-icon>
                  <m-icon
                    icon="caret-down"
                    :class="{ active: setSortIconClass(col.field, 'desc') }"
                  ></m-icon>
                </span>
              </div>
            </th>
            <th v-if="$scopedSlots.actions"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in dataSource">
            <tr :key="item.key">
              <template v-if="extendedColumns.length">
                <template v-for="extendedCol in extendedColumns">
                  <td
                    :key="`${extendedCol.field}-td-checkbox`"
                    v-if="extendedCol.field === 'selection'"
                    class="center-cell"
                  >
                    <input
                      type="checkbox"
                      :checked="inSelectedItems(item.key)"
                      @change="selectItem($event, item, index)"
                    />
                  </td>
                  <td
                    :key="`${extendedCol.field}-td-index`"
                    v-if="extendedCol.field === 'index'"
                    class="center-cell"
                  >
                    <span>{{ index + 1 }}</span>
                  </td>
                  <td
                    :key="`${extendedCol.field}-td-expend`"
                    v-if="extendedCol.field === 'expend'"
                    class="expend-icon center-cell"
                    @click="toggleExpend(item.key)"
                  >
                    <m-icon icon="right" v-if="item[expendField]"></m-icon>
                  </td>
                </template>
              </template>
              <td v-for="col in columns" :key="`${item.key}-${col.field}`">
                {{ item[col.field] }}
              </td>
              <td v-if="$scopedSlots.actions">
                <slot name="actions" :item="item"></slot>
              </td>
            </tr>
            <tr
              v-if="item[expendField] && inExpendedKeys(item.key)"
              :key="`${item.key}-expend`"
            >
              <td
                class="no-border-cell"
                v-for="extendedItem in extendedColumns"
                :key="`${extendedItem.field}-placeholder`"
              ></td>
              <td :colspan="colspan">{{ item[expendField] }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="m-table__loading" v-if="this.loading">
      <m-icon :is-loading="true"></m-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import MIcon from "@/components/icon/index.vue";
@Component({
  name: "MTable",
  components: {
    MIcon
  }
})
export default class MTable extends Vue {
  @Prop({
    type: Array,
    default() {
      return [];
    },
    required: true
  })
  columns!: any[];
  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  extendedColumns!: any[];
  @Prop({
    type: Array,
    default() {
      return [];
    },
    required: true,
    validator(arr: any[]): boolean {
      return arr.every((value: any) => value.key !== undefined);
    }
  })
  dataSource!: any[];
  @Prop({ type: Boolean, default: false }) bordered!: boolean;
  @Prop({ type: Boolean, default: false }) striped!: boolean;
  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  selectedItems!: any[];
  @Prop({ type: Boolean, default: false }) loading!: boolean;
  @Prop({ type: Boolean, default: false }) fixedHead!: boolean;
  @Prop({ type: Number, default: 0 }) height!: number;
  @Watch("selectedItems")
  onSelectedItemsChanged(newValue: any[]) {
    const selectAll =
      (this.$refs.selectAll as any[])[0] || this.$refs.selectAll;
    if (newValue.length === this.dataSource.length) {
      (selectAll as HTMLInputElement).indeterminate = false;
    } else if (newValue.length && newValue.length < this.dataSource.length) {
      (selectAll as HTMLInputElement).indeterminate = true;
    } else {
      (selectAll as HTMLInputElement).indeterminate = false;
    }
  }
  // data
  sortTypes: any[] = [];
  expendedKeys: any[] = [];
  // cycle
  mounted(): void {
    this.setSortTypes();
  }
  // computed
  get tableClass(): Object {
    return {
      "m-table": true,
      striped: this.striped
    };
  }
  get areAllItemsSelected(): boolean {
    const dataSourceKeys = this.dataSource.map((data: any) => data.key).sort();
    const selectedItems = this.selectedItems
      .map((data: any) => data.key)
      .sort();
    if (dataSourceKeys.length !== selectedItems.length) {
      return false;
    }
    let equal = dataSourceKeys.some(
      (value: any, index: number) => value.key !== selectedItems[index].key
    );
    return !equal;
  }
  get expendField(): string {
    let key = "";
    if (this.extendedColumns.length) {
      this.extendedColumns.some((value: any) => {
        if (value.field === "expend") {
          key = value.expendField;
          return true;
        }
        return false;
      });
    }
    return key;
  }
  get colspan(): number {
    return this.$scopedSlots.actions
      ? this.columns.length + 1
      : this.columns.length;
  }
  // methods
  selectAllItems(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const selectedItems: any[] = checked ? this.dataSource : [];
    this.$emit("update:selectedItems", selectedItems);
    this.$emit("on-select-all", {
      selectedAll: checked,
      selectedItems
    });
    this.$emit("on-change", { selectedItems });
  }
  selectItem(event: Event, item: any, index: number): void {
    const checked = (event.target as HTMLInputElement).checked;
    let selectedItems = JSON.parse(JSON.stringify(this.selectedItems));
    if (checked) {
      selectedItems.push(item);
    } else {
      selectedItems = selectedItems.filter(
        (value: any) => value.key !== item.key
      );
    }
    this.$emit("update:selectedItems", selectedItems);
    this.$emit("on-select", {
      selected: checked,
      item: item
    });
    this.$emit("on-change", { selectedItems });
  }
  inSelectedItems(key: any): boolean {
    return this.selectedItems.some((item: any) => item.key === key);
  }
  setSortTypes(): void {
    this.sortTypes = this.columns.map((col: any) => ({
      [col.field]: col.sortType
    }));
  }
  clickSortIcon(event: Event, key: any): void {
    const elem: any = event.target;
    let icon: string = "";
    let currentIndex: number | null = null;
    let currentItem = this.sortTypes.find((value: any, index: number) => {
      currentIndex = index;
      return value[key] && value[key] !== undefined;
    });
    if (elem && elem.getAttribute) {
      icon = elem.getAttribute("xlink:href");
    }
    if (currentItem) {
      if (icon === "#icon-caret-up") {
        currentItem[key] = "asc";
      } else if (icon === "#icon-caret-down" || currentItem[key] === "asc") {
        currentItem[key] = "desc";
      } else if (currentItem[key] === "desc") {
        currentItem[key] = true;
      } else {
        currentItem[key] = "asc";
      }
      if (currentIndex !== null) {
        const currentColumn = this.columns.find(
          (value: any) => value.field === key
        );
        this.$emit("on-sort", {
          sortType: currentItem[key],
          currentColumn: currentColumn
        });
        this.$set(this.sortTypes, currentIndex, currentItem);
      }
    }
  }
  visibleSortIcons(key: any): boolean {
    return this.sortTypes.some(
      (value: any) => value[key] && value[key] !== undefined
    );
  }
  setSortIconClass(key: any, sortType: string): boolean {
    return this.sortTypes.some(
      (value: any) => value[key] && value[key] === sortType
    );
  }
  setCellWidth(width: number): string {
    if (width) {
      return `width: ${width}px; min-width: ${width}px`;
    }
    return "";
  }
  inExpendedKeys(key: any): boolean {
    return this.expendedKeys.indexOf(key) >= 0;
  }
  toggleExpend(key: any): void {
    if (this.inExpendedKeys(key)) {
      this.expendedKeys.splice(this.expendedKeys.indexOf(key), 1);
    } else {
      this.expendedKeys.push(key);
    }
  }
}
</script>

<style lang="scss" scoped>
$grey: #ebebeb;
.m-table__wrapper {
  position: relative;
  box-sizing: border-box;
  .m-table__loading {
    font-size: 32px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &-inner {
    overflow: auto;
  }
  .m-table {
    border-spacing: 0;
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    box-sizing: border-box;
    thead {
      tr {
        background: #fafafa;
      }
      .table-header__cell {
        display: flex;
        align-items: center;
        height: 100%;
        &-icons {
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          cursor: pointer;
          padding-left: 12px;
          height: 100%;
          > .m-icon {
            width: 8px;
            height: 8px;
            color: #ccc;
            &:first-child {
              margin-bottom: 2px;
            }
            &:hover {
              color: darken(#ccc, 30);
            }
            &.active {
              color: #ce4f46;
            }
          }
        }
      }
    }
    th,
    td {
      text-align: left;
      border-bottom: 1px solid $grey;
      padding: 14px;
      box-sizing: border-box;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .expend-icon {
      cursor: pointer;
      .m-icon {
        width: 10px;
        height: 10px;
      }
    }
    .center-cell {
      text-align: center;
    }
    &.striped {
      tbody {
        tr {
          &:nth-child(odd) {
            background: #fff;
          }
          &:nth-child(even) {
            background: #fafafa;
          }
        }
      }
    }
  }
  &.bordered {
    border: 1px solid $grey;
    border-right: none;
    th,
    td {
      border-right: 1px solid $grey;
    }
    tbody {
      tr:last-child {
        td {
          border-bottom: none;
        }
      }
    }
  }
  & .no-border-cell {
    border-right: none !important;
  }
}
</style>
