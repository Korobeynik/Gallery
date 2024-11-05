import { defineStore } from 'pinia';
import axios from 'axios';
import { BASE_URL } from "@/constants/api.ts";

// Define interfaces for photo and store state
interface Photo {
  id: number;
  description: string;
  album: string;
  url: string;
}

interface State {
  photos: Photo[];
  albums: string[];
  loading: boolean;
  error: string | null;
}

export const usePhotoStore = defineStore('photoStore', {
  state: (): State => ({
    photos: [],
    albums: ['Vacation', 'Family'],
    loading: false,
    error: null,
  }),

  getters: {
    // Add types for getter parameters and return type
    getPhotoById: (state) => (id: number): Photo | undefined => {
      return state.photos.find((photo) => photo.id === id);
    },
  },

  actions: {
    async fetchPhotos() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get<Photo[]>(BASE_URL);
        this.photos = response.data;
      } catch (error) {
        this.error = "Error fetching photos";
        console.error(this.error, error);
      } finally {
        this.loading = false;
      }
    },

    async updatedPhoto(photoId: number, updatedData: Partial<Photo>) {
      try {
        const response = await axios.put<Photo>(`${BASE_URL}/${photoId}`, updatedData);
        const index = this.photos.findIndex(photo => photo.id === photoId);
        if (index !== -1) {
          this.photos[index] = { ...this.photos[index], ...response.data };
        }
      } catch (error) {
        console.error("Error updating photo:", error);
      }
    },

    async addPhoto(newPhoto: Omit<Photo, "id">) {
      try {
        const response = await axios.post<Photo>(BASE_URL, newPhoto);
        this.photos.push(response.data);
      } catch (error) {
        console.error("Error adding photo:", error);
      }
    },

    async deletePhoto(photoId: number) {
      try {
        await axios.delete(`${BASE_URL}/${photoId}`);
        this.photos = this.photos.filter(photo => photo.id !== photoId);
      } catch (error) {
        console.error("Error deleting photo:", error);
      }
    },

    addAlbum(newAlbum: string) {
      if (newAlbum && !this.albums.includes(newAlbum)) {
        this.albums.push(newAlbum);
      }
    }
  }
});

