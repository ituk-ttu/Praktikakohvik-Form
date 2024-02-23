<template>    
    <Editor class="editor" placeholder="Description" editorStyle="height: 320px;">
        <template v-slot:toolbar>
            <span class="ql-formats">
                <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
                <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
                <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
            </span>
            <span class="ql-formats">
                <button v-tooltip.bottom="'List'" class="ql-list" value="bullet"></button>
                <button v-tooltip.bottom="'Ordered list'" class="ql-list" value="ordered"></button>
                <select class="ql-align"></select>
            </span>
            <span class="ql-formats">
                <select v-tooltip.bottom="'Text color'" class="ql-color"></select>
                <select v-tooltip.bottom="'Background color'" class="ql-background"></select>
            </span>
            <span class="ql-formats">
                <button v-tooltip.bottom="'Add link'" class="ql-link"></button>
                <button v-tooltip.bottom="'Remove styles'" class="ql-clean"></button>
            </span>
        </template>
    </Editor>
</template>

<script setup lang="ts">
import Editor from 'primevue/editor'
</script>
