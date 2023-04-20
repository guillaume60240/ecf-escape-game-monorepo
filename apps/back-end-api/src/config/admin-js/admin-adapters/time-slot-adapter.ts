import { TimeSlot } from 'src/entity/time-slot.entity';

export const timeSlotAdapter = {
  resource: TimeSlot,
  options: {
    navigation: { name: 'Booking manager' },
    id: 'Créneaux horaire',
    properties: {},
    actions: {
      edit: {
        isAccessible: false,
        isVisible: true,
      },
      new: {
        isAccessible: false,
        isVisible: true,
      },
      delete: {
        isAccessible: false,
        isVisible: true,
      },
    },
  },
};
