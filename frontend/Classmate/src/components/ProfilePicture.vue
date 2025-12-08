<template>
    <div class="profile-picture">

        <img :src="imageSrc" alt="Profile Picture" class="profile-image">
        <p>Ciao, {{ name }}!</p>
    </div>
</template>

<script>
export default {
    name: 'ProfilePicture',
    props: {
        imageSrc: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    computed: {
        resolvedImageSrc() {
            try {
                return require(`../imgs/${this.imageSrc}`);
            } catch (e) {
                console.error('Image not found', e);
                return '';
            }
        }
    }
}
</script>

<style scoped>
.profile-picture {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.profile-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #ccc;
    margin-bottom: 10px;
}

p {
    font-size: 16px;
    color: #e9e9e9;
    margin: 0;
}
</style>