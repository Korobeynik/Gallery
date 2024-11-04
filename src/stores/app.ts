import { defineStore } from 'pinia';
import axios from 'axios';
import { BASE_URL } from "@/constans/api";

export const usePhotoStore = defineStore('photoStore', {
  state: () => ({
    photos: [],
    albums: ['Vacation', 'Family'],
    loading: false,
    error: null,
  }),

  getters: {
    getPhotoById: (state) => (id) => state.photos.find((photo) => photo.id === id),
  },
  
  actions: {
    
    async fetchPhotos() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(BASE_URL);
        this.photos = response.data;
      } catch (error) {
        this.error = "Error";
        console.error(this.error, error);
      } finally {
        this.loading = false;
      }
    },
  
    async updatePhoto(updatedPhoto) {
      try {
        await axios.put(`${BASE_URL}/${updatedPhoto.id}`, updatedPhoto);
        const index = this.photos.findIndex((photo) => photo.id === updatedPhoto.id);
        if (index !== -1) {
          this.photos[index] = updatedPhoto;
        }
      } catch (error) {
        console.error("Error update photo:", error);
      }
    },
  
    async addPhoto(newPhoto) {
      try {
        const response = await axios.post(BASE_URL, newPhoto);
        this.photos.push(response.data);
      } catch (error) {
        console.error("Error", error);
      }
    },
  
    addAlbum(newAlbum) {
      if (newAlbum && !this.albums.includes(newAlbum)) {
        this.albums.push(newAlbum);
      }
    }
  }

})

