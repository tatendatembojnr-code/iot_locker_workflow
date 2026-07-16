export const initialStations = [
  { id: 'ST-001', name: 'Windhoek Central Hub', city: 'Windhoek', status: 'online', lat: -22.5609, lng: 17.0658, compartments: { total: 40, available: 12, occupied: 28 } },
  { id: 'ST-002', name: 'Swakopmund Mall', city: 'Swakopmund', status: 'online', lat: -22.6848, lng: 14.5292, compartments: { total: 20, available: 18, occupied: 2 } },
  { id: 'ST-003', name: 'Walvis Bay Port', city: 'Walvis Bay', status: 'maintenance', lat: -22.9576, lng: 14.5053, compartments: { total: 30, available: 0, occupied: 30 } },
];

export const initialParcels = [
  { id: 'PML-9923', status: 'Ready for collection', sender: 'Anna Shikongo', receiver: 'David Nghipandulwa', destination: 'ST-001', fees: 125.00 },
  { id: 'PML-9924', status: 'In transit', sender: 'John Doe', receiver: 'Jane Smith', destination: 'ST-002', fees: 150.00 },
];

export const initialUsers = [
  { id: 'U-01', name: 'Super Admin', role: 'super_admin' },
  { id: 'U-02', name: 'Courier Driver', role: 'driver' },
  { id: 'U-03', name: 'Customer User', role: 'customer' },
];

export const initialLockerBanks = [];
