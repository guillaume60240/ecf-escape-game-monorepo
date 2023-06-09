import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { BookingDto } from '../dto/booking.dto'

export const useBookingStore = defineStore('booking', () => {
  const booking = ref({} as Partial<BookingDto>)

  function setNewBooking(newBooking: Partial<BookingDto>) {
    booking.value = newBooking
  }

  function getBooking() {
    return booking.value
  }

  function deleteBooking() {
    booking.value = {} as BookingDto
  }

  return { booking, setNewBooking, getBooking, deleteBooking }
})
