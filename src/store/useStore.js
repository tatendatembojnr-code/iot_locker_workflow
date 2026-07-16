import { create } from 'zustand';
import { initialParcels, initialStations, initialUsers, initialLockerBanks } from './mockData';

export const useStore = create((set) => ({
  parcels: initialParcels,
  stations: initialStations,
  users: initialUsers,
  lockerBanks: initialLockerBanks,
  
  // Actions
  addParcel: (parcel) => set((state) => ({ parcels: [...state.parcels, parcel] })),
  updateParcelStatus: (id, status) => set((state) => ({
    parcels: state.parcels.map(p => p.id === id ? { ...p, status } : p)
  })),
  
  // Auth simulation
  currentUser: initialUsers[0],
  login: (userId) => set((state) => ({ currentUser: state.users.find(u => u.id === userId) })),
  logout: () => set({ currentUser: null }),
}));
