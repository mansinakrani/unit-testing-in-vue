import { defineStore } from 'pinia'

export const useCitiesStore = defineStore('cities', {
  state: () => ({
    weatherData: []
  }),
  
  getters: {
    getNumberOfCities: (state) => { return state.weatherData.length }
  },
  
  actions: {
    addCity(city, state, country, summary, currentTemp, high, low) { 
      if (this.weatherData.find(({ cityName }) => cityName === city) === undefined) {
        this.weatherData.push({
          'cityName': city,
          'stateName': state,
          'countryAbbreviation': country,
          'weatherSummary': summary,
          'currentTemperature': currentTemp,
          'dailyHigh': high,
          'dailyLow': low
        })
      }
    },
    clearAllCities() {
      this.weatherData.length = 0
    }
  }
})
