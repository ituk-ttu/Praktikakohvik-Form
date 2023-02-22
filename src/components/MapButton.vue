<template>
    <li 
        :style="{ gridColumn: column, gridRow: row }"
        :class="
			Array.isArray(firms)
			? firms?.filter(x => x.gridMapRow === row && x.gridMapColumn === column)?.length != 0 
				? 'in-use' 
				: ''
			: ''" 
    >
        <button 
            :disabled="
				Array.isArray(firms)
					? firms?.filter(x => x.gridMapRow === row && x.gridMapColumn === column)?.length != 0
					: false" 
            :class="formFirm.gridMapColumn == column && formFirm.gridMapRow == row ? 'active' : ''"
            @click="() => { setRowsAndColumns(column, row)  }" type="button"
        >
        </button>
    </li>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import { Firm } from '@/Models/Firms'
defineProps<{ firms?: Firm[], formFirm: Firm, row: string, column: string }>();
const emit = defineEmits<{ (e: 'on-click-map', rowsAndColumns: string[]): void }>()

function setRowsAndColumns(column: string, row: string) 
{
    emit('on-click-map', [column, row])
}
</script>

<style scoped>
.container-map li {
	padding: 1px;
	display: flex;
	flex: 1;
}
.container-map button {
	padding: 0;
	cursor: pointer;
	font-weight: 600;
	display: flex;
	flex: 1;
	justify-content: center;
	align-items: center;
    font-size: 0.7vw;
	border: 3px dashed black;
	border-radius: 4px;
	background-color: transparent;
}
.container-map button:hover {
	border-style: solid;
}
.container-map .active {
	border-color: #ff0063;
}
.in-use button {
    opacity: 0.2;
	cursor: context-menu;
}

@media only screen and (max-width: 850px) {
	.container-map button {
		border-width: 1px;
	}
}
</style>
