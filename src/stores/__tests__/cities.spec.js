import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCitiesStore } from '@/stores/cities'

describe('Data Store Test', () => {
  let store = null

  beforeEach(() => {
    setActivePinia(createPinia())

    store = useCitiesStore()
  })
  
  it('initializes with zero cities', () => {
    expect(store.getNumberOfCities).toEqual(0)
  })

  it('test adding a new city', () => {
    store.addCity('Chicago', 'Illinois', 'US', 'cloudy', 75.6, 78.9, 65.2)

    expect(store.getNumberOfCities).toEqual(1)
    expect(store.weatherData.length).toEqual(1)
    expect(store.weatherData[0]).toEqual({
      'cityName': 'Chicago',
      'stateName': 'Illinois',
      'countryAbbreviation': 'US',
      'weatherSummary': 'cloudy',
      'currentTemperature': 75.6,
      'dailyHigh': 78.9,
      'dailyLow': 65.2
    })
  })

  it('test adding a duplicate city', () => {
    store.addCity('New Orleans', 'Louisiana', 'US', 'sunny', 87.6, 78.9, 65.2)

    expect(store.weatherData.length).toEqual(1)
    expect(store.weatherData[0].cityName).toMatch('New Orleans')

    store.addCity('New Orleans', 'Louisiana', 'US', 'sunny', 87.6, 78.9, 65.2)

    expect(store.weatherData.length).toEqual(1)
    expect(store.weatherData[0].cityName).toMatch('New Orleans')
  })
  
  it('test removing all cities', () => {
    store.addCity('New Orleans', 'Louisiana', 'US', 'sunny', 87.6, 78.9, 65.2)
    store.addCity('Denver', 'Colorado', 'US', 'windy', 94.5, 95.6, 56.7)

    expect(store.weatherData.length).toEqual(2)

    store.clearAllCities()

    expect(store.weatherData.length).toEqual(0)
  })
})
