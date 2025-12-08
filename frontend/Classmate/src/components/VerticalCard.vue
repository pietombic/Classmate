<template>
  <div class="card_vertical">
    <div class="header">
      <span class="component-label">{{ componentLabel }}</span>
    </div>
    <div class="content">
      <img :src="imageSrc" alt="Example" class="example-image">
    </div>
    <div class="footer_card_vertical">
      <h6>{{ title }}</h6>
      <p>{{ description }}</p>
      <div :class="['actions', { 'single-button': !showEditButton }]">
        <!-- Aggiungere i metodi per eliminazione -->

        <LinkButton v-if="showLinkButton" class="flex-1 btn_heigher" :href="link_for_button" :text="openButtonText" />
        <PrimaryButton v-if="showEditButton" class="flex-1 btn_heigher" :text="editButtonText" />

      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "../components/PrimaryButton.vue"
import LinkButton from "../components/LinkButton.vue"
export default {
  name: 'VerticalCard',
  props: {
    componentLabel: {
      type: String,
      default: 'Component 27'
    },
    imageSrc: {
      type: String,
      default: 'your-image-path.png'
    },
    title: {
      type: String,
      default: 'Lifecycle hooks'
    },
    description: {
      type: String,
      default: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id non repudiandae est deserunt ducimus veniam.'
    },
    openButtonText: {
      type: String,
      default: 'Open'
    },
    editButtonText: {
      type: String,
      default: 'Edit'
    },
    editAction: {
      type: Function,
      default: () => { }
    },
    showEditButton: {
      type: Boolean,
      default: false
    },
    link_for_button:{
      type: String,
      default: '/events'
    },
    showLinkButton:{
      type: Boolean,
      default: true
    }
  },
  components: {
    PrimaryButton,
    LinkButton
  }
}
</script>

<style scoped>
.flex-1{
  flex: 1;
}
.btn_heigher{
  height: 40px;
}
.card_vertical {
  background-color: var(--background-color-dark-mode-5);
  border-radius: 12px;
  color: #ffffff;
  width: 300px;
  padding: 20px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 310px;
  border: 1px solid var(--border-color-dark-mode);
}

.header {
  width: 100%;
  text-align: right;
  margin-bottom: 10px;
}

.component-label {
  background-color: #6435c9;
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
}

.content {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.example-image {
  max-width: 100%;
  max-height: 100px;
  /* Limita l'altezza dell'immagine */
  object-fit: cover;
  /* Mantiene le proporzioni dell'immagine senza stretcharla */
  border-radius: 8px;
}

.footer_card_vertical {
  width: 100%;
  text-align: center;
}

.footer_card_vertical h6 {
  margin: 10px 0;
}

.footer_card_vertical p {
  font-size: 14px;
  color: #aaaaaa;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.actions.single-button .btn.open {
  flex: 1;

}

.btn {
  background-color: #3b82f6;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.btn.edit {
  background-color: #4b5563;
}

.btn:hover {
  background-color: #2563eb;
}

.btn.edit:hover {
  background-color: #374151;
}
</style>