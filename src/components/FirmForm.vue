<template>
  <form @submit.prevent="emit('on-submit', formFirm)">
    <label><span style="color: red;">*</span> required field</label>
    <br />
    <label for="name">Name <span style="color: red;">*</span></label>
    <input 
      :class="errors?.Name != undefined ? 'error' : ''" 
      name="name" 
      v-model="formFirm.name" 
      placeholder="Firms name"
      type="text"
    >
    <h4 v-for="error in errors?.Name" :key="error">⚠️{{ error }}</h4>
    <label for="image">Image <span style="color: red;">*</span></label>
    <div class="image-upload-container">
      <label for="file-upload" class="custom-file-upload">
          <input id="file-upload" name="image" type="file" v-on:change="(e) => onChange(e)">
          Upload 📁
      </label>
      <p>{{formFirm.image.name ?? 'No file chosen'}}</p>
    </div>
    <p id="recommendation">Recommended file resolution 1000x300px</p>
    <div
      v-if="imageSrc != undefined" 
      :class="errors?.Image != undefined ? 'image-container error' : 'image-container'"
      :style="'background-color: ' + (formFirm.imageBackground ?? 'white') + '; border-color: '+ (formFirm.imageBackground ?? 'white') + ';'"
    >
      <img 
        :src="imageSrc" 
        alt="Firms logo" 
      />
    </div>
    <div
      v-else
      :class="errors?.Image != undefined ? 'image-container error' : 'image-container'"
      :style="'background-color: ' + (formFirm.imageBackground ?? 'white') + '; border-color: '+ (formFirm.imageBackground ?? 'white') + ';'"
    >
      <img v-if="firm?.id != undefined"
        :src="urlApi + 'firms/' + firm?.id + '/image/' + (new Date()).toISOString()"
        :style="loading ? 'visibility: hidden; width: 0;' : ''"
        @load="loading = false" 
        alt="logo" 
      />
      <img v-if="loading"
        :src="require('@/assets/placeholder.png')"
        alt="placeholder"
      />
    </div>
    <h4 v-for="error in errors?.Image" :key="error">⚠️{{ error }}</h4>
    <label for="imageBackground">Image background color</label>
    <input
      name="shortName" 
      v-model="formFirm.imageBackground"
      placeholder="Firms image background color"
      type="color"
    >
    <label for="estonianDescription">Estonian description</label>
    <FormEditor v-model="formFirm.estonianDescription" />
    <h4 v-for="error in errors?.EstonianDescription" :key="error">⚠️{{ error }}</h4>
    <label for="englishDescription">English description</label>
    <FormEditor v-model="formFirm.englishDescription" />
    <h4 v-for="error in errors?.EnglishDescription" :key="error">⚠️{{ error }}</h4>
    <label for="shortName">Short name <span style="color: red;">*</span></label>
    <input 
      :class="errors?.ShortName != undefined ? 'error' : ''" 
      name="shortName" 
      v-model="formFirm.shortName" 
      placeholder="Firms 3 letter short name to display on map"
      type="text"
    >
    <h4 v-for="error in errors?.ShortName" :key="error">⚠️{{ error }}</h4>
    <label>Hall placement</label>
    <div class="map-container">
      <img :src="require('@/assets/map.png')" alt="hall"/>
      <CrudButton 
        class="remove" :color="'red'" :text="'❌'" :type="'button'" 
        v-tooltip.bottom="'Remove from map'"
        v-on:click="() => { formFirm.gridMapColumn = '', formFirm.gridMapRow = '' }" 
      />
      <div className="aspect-ratio-box">
        <div className='container-map'>
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="2" column="2" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="2" column="3" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="2" column="4" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="2" column="5" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="2" column="6" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="2" column="7" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="3 / span 2" column="8" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="5 / span 2" column="8" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="7 / span 2" column="8" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="9" column="7" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="9" column="6" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="9" column="5" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="9" column="4" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="9" column="3" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="6" column="2" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="6" column="3" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="6" column="4" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="6" column="5" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="6" column="6" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="5" column="6" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="5" column="5" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="5" column="4" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="5" column="3" />
          <MapButton @on-click-map="setLocation" :formFirm="formFirm" :firms="firms" row="5" column="2" />
        </div>
      </div>
    </div>
    <h4 v-for="error in errors?.GridMapRow" :key="error">⚠️{{ error }}</h4>
    <label for="key">Key <span style="color: red;">*</span></label>
    <div class="password-container">
      <input
        :class="errors?.title != undefined ? 'error' : ''" 
        name="key" 
        v-model="formFirm.key" 
        placeholder="API key"
        :type="passwordVisibility ? 'text' : 'password'"
      >
      <CrudButton type="button" v-tooltip.bottom="'Toggle password'" class="password-button" v-on:click="togglePassword" :color="'#1f7a8c'" :text="passwordVisibility ? '😀' : '😄'" />
    </div>
    <h4>{{ errors?.title != undefined ? '⚠️' + errors?.title : '' }}</h4>
    <CrudButton type="submit" :color="'green'" :text="'Salvesta ✔️'" />
  </form>
</template>

<script setup lang="ts">
import { ref, Ref, defineProps, defineEmits, onMounted } from 'vue'
import { Firm, FirmValidation } from '@/Models/Firms'
import useFirms from '@/Stores/FirmsStore'
import CrudButton from './CrudButton.vue'
import FormEditor from './FormEditor.vue'
import MapButton from './MapButton.vue'
import Editor from 'primevue/editor'

let { urlApi, apiKey, load, firms } = useFirms();
const emit = defineEmits<{ (e: 'on-submit', formFirm: Firm): void }>()
const prop = defineProps<{ firm?: Firm, errors?: FirmValidation }>();
const formFirm: Ref<Firm> = ref({
  id: '',
  name: prop.firm?.name ?? '',
  shortName: prop.firm?.shortName ?? '',
  image: prop.firm?.image ?? '',
  imageBackground: prop.firm?.imageBackground ?? '#FFFFFF',
  englishDescription: prop.firm?.englishDescription ?? '',
  estonianDescription: prop.firm?.estonianDescription ?? '',
  gridMapColumn: prop.firm?.gridMapColumn ?? '',
  gridMapRow: prop.firm?.gridMapRow ?? '',
  key: apiKey
});

onMounted(() => load());

let passwordVisibility = ref(false)
function togglePassword() { passwordVisibility.value = !passwordVisibility.value }

let loading = ref(true)
let imageSrc = ref<string>()
function onChange(e: any) {
  var files = e.target.files || e.dataTransfer.files
  if (!files.length) return
  createImage(files[0])
}
function createImage(file: any) {
  var reader = new FileReader()
  reader.onload = (e) => {
    if (e.target != null) 
    { 
      formFirm.value.image = file
      imageSrc.value = URL.createObjectURL(file)
    }
  }
  reader.readAsDataURL(file)
}
function setLocation(value: string[])
{
  formFirm.value.gridMapColumn = value[0];
  formFirm.value.gridMapRow = value[1];
}
</script>

<style scoped>
form {
  border-radius: 10px;
  background: none;
  width: 500px;
  height: auto;
  display: flex;
  flex-direction: column;
  color: #FFFFFF;
}
p {
  overflow-x: hidden;
  text-overflow: ellipsis;
}
.image-container {
  max-width: 300px;
  margin: 0 0 5px 0;
  aspect-ratio: 3.5/1;
  border: solid;
  border-bottom-color: #fff;
  border-left: 15px solid #fff;
  border-radius: 7px;
  border-right: 15px solid #fff;
  border-top-color: #fff;
  background-color: #FFFFFF;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-container img {
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
label {
  font-weight: 1000;
  margin: 15px 0 5px 0;
}
input, textarea {
  border: 3px solid transparent;
  color: #000000;
  border-radius: 5px;
  transition: 0.25s;
  font-weight: 1000;
  outline: none;
}
textarea {
  resize: none;
  min-height: 100px;
}
input {
  padding: 2px 5px;
  min-height: 30px;
  height: 30px;
}
textarea::-webkit-scrollbar {
  width: 5px;
  height: 7px;
}
textarea::-webkit-scrollbar-thumb {
  background: #ff0063;
  border-radius: 5px;
}
.error {
  border: 3px solid red;
}
.error:not(.image-container) {
  background-color: #ffe9e9;
}
input:focus:not(.error), textarea:focus:not(.error) {
  border: 3px solid #c3c3c3;
}
input:hover:not(.error), textarea:hover:not(.error) {
  border: 3px solid #c3c3c3;
}
.image-upload-container {
  display: flex;
  align-items: center;
}
input[type="file"] {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}
.custom-file-upload {
  height: 35px;
  width: auto;
  min-width: 85px;
  padding: 0 5px;
  line-height: 35px;
  display: inline-block;
  background-color: #ff0063;
  border-radius: 3px;
  cursor: pointer;
  margin: 0 5px 0 0;
}
.custom-file-upload:hover {
  filter: brightness(120%);
}
h4 {
  color: #ff5959;
  font-weight: 1000;
  margin: 5px 0 10px 0;
  padding: 0;
}

.map-container {
	position: relative;
	height: min-content;
}
.aspect-ratio-box {
	height: 0;
	overflow: hidden;
	padding-top: calc(68/81*100%);
	position: relative;
}
.container-map {
	list-style-type: none;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	position: absolute;
	display: grid;
	grid-template-columns: 17% 12% 12% 12% 12% 12% 12% 7% 4%;
	grid-template-rows: 4fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr;
}
.map-container img {
	position: absolute;
	width: 100%;
	height: auto;
}
.remove {
  z-index: 100;
  position: absolute;
}

.password-button {
  position: absolute;
  margin: 2px 2px 0 0;
}
.password-container {
  width: auto;
  display: flex;
  flex-direction: row-reverse;
}
.password-container input {
  width: 97.1%;
}

#recommendation {
  margin-top: 0;
  font-size: 14px;
  color: #afafaf;
}

@media only screen and (max-width: 850px) {
  form {   
    width: auto;
  }
  .password-container input {
    width: 96.5%;
  }
  p {
    width: 202px;
  }
}
</style>
