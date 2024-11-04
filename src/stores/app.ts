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
    async updatedPhoto(photoId, updatedData) {
      try {
        const response = await axios.put(`${BASE_URL}/${photoId}`, updatedData);
        const index = this.photos.findIndex(photo => photo.id === photoId);
        if (index !== -1) {
          this.photos[index] = { ...this.photos[index], ...response.data };
        }
      } catch (error) {
        console.error("Error update:", error);
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

    async deletePhoto(photoId) {
      try {
        await axios.delete(`${BASE_URL}/${photoId}`);
        this.photos = this.photos.filter(photo => photo.id !== photoId);
        //this.savePhotosToLocalStorage();
      } catch (error) {
        console.error("Error deleted", error);
      }
    },
  
    addAlbum(newAlbum) {
      if (newAlbum && !this.albums.includes(newAlbum)) {
        this.albums.push(newAlbum);
      }
    }
  }

})

