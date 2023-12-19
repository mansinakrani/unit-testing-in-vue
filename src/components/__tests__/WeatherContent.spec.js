import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import WeatherContent from '../WeatherContent.vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { createTestingPinia } from '@pinia/testing'
import { useCitiesStore } from '@/stores/cities'

var mock = new MockAdapter(axios)

describe('WeatherContent.vue Tests with Successful HTTP GET calls', () => {
  let wrapper = null
  let store = null

  beforeEach(() => {
    const geocodingUrlBase = "https://api.openweathermap.org/geo/1.0/direct"
    const geocodingUrl = new RegExp(`${geocodingUrlBase}/*`);
    mock.onGet(geocodingUrl).reply(200, [
      {
        "name": "Chicago",
        "lat": 41.8755616,
        "lon": -87.6244212,
        "country": "US",
        "state": "Illinois"
      }
    ])

    const weatherUrlBase = "https://api.openweathermap.org/data/2.5/weather"
    const weatherUrl = new RegExp(`${weatherUrlBase}/*`);
    mock.onGet(weatherUrl).reply(200, {
        "weather": [
          {
            "main": "Cloudy"
          }
        ],
        "main": {
          "temp": 56.3,
          "temp_max": 58.6,
          "temp_min": 53.8
        }
      }
    )

    wrapper = shallowMount(WeatherContent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
    
    store = useCitiesStore()
  })

  afterEach(() => {
    mock.reset();
    wrapper.unmount()
  })

  it('renders sub-components when the component is created', () => {
    const banner = wrapper.findAll('.banner')
    expect(banner.length).toEqual(1)
    const search = wrapper.findAll('.weather-search')
    expect(search.length).toEqual(1)
    const results = wrapper.findAll('.cities')
    expect(results.length).toEqual(1)
  })

  it('does load the weather data when a successful HTTP GET occurs', async () => {
    wrapper.vm.searchCity('Chicago')

    await flushPromises()

    expect(mock.history.get.length).toBe(2)
    expect(mock.history.get[0].url).toMatch('https://api.openweathermap.org/geo/1.0/direct')
    expect(mock.history.get[0].method).toMatch('get')
    expect(mock.history.get[1].url).toMatch('https://api.openweathermap.org/data/2.5/weather')
    expect(mock.history.get[1].method).toMatch('get')

    expect(store.addCity).toHaveBeenCalledTimes(1)
    expect(store.addCity).toHaveBeenLastCalledWith('Chicago', 'Illinois', 'US', 'Cloudy', 56.3, 58.6, 53.8)
  })

  it('resets the banner data when clearMessage() is called', () => {
    wrapper.vm.messageToDisplay = 'Great search results!'
    wrapper.vm.messageType = 'Success!!!'

    wrapper.vm.clearMessage()

    expect(wrapper.vm.messageToDisplay).toMatch(/^$/)
    expect(wrapper.vm.messageType).toMatch('Info')
  })
})

describe('WeatherContent.vue Tests with Failed HTTP GET call for coordinates', () => {
  let wrapper = null
  let store = null

  beforeEach(() => {
    const geocodingUrlBase = "https://api.openweathermap.org/geo/1.0/direct"
    const geocodingUrl = new RegExp(`${geocodingUrlBase}/*`);
    mock.onGet(geocodingUrl).reply(404)

    wrapper = shallowMount(WeatherContent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
    
    store = useCitiesStore()
  })

  afterEach(() => {
    mock.reset();
    wrapper.unmount()
  })

  it('does not save the weather data when the first HTTP GET fails', async () => {
    wrapper.vm.searchCity('Chicago')

    await flushPromises()

    expect(mock.history.get.length).toBe(1)
    expect(mock.history.get[0].url).toMatch('https://api.openweathermap.org/geo/1.0/direct')
    expect(mock.history.get[0].method).toMatch('get')
    
    expect(store.addCity).toHaveBeenCalledTimes(0)

    expect(wrapper.vm.messageToDisplay).toMatch('ERROR! Unable to retrieve coordinates (latitude, longitude) for Chicago!')
    expect(wrapper.vm.messageType).toMatch('Error')
  })
})

describe('WeatherContent.vue Tests with Failed HTTP GET call for current weather data', () => {
  let wrapper = null
  let store = null

  beforeEach(() => {
    const geocodingUrlBase = "https://api.openweathermap.org/geo/1.0/direct"
    const geocodingUrl = new RegExp(`${geocodingUrlBase}/*`);
    mock.onGet(geocodingUrl).reply(200, [
      {
        "name": "Chicago",
        "lat": 41.8755616,
        "lon": -87.6244212,
        "country": "US",
        "state": "Illinois"
      }
    ])

    const weatherUrlBase = "https://api.openweathermap.org/data/2.5/weather"
    const weatherUrl = new RegExp(`${weatherUrlBase}/*`);
    mock.onGet(weatherUrl).reply(404)

    wrapper = shallowMount(WeatherContent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
    
    store = useCitiesStore()
  })

  afterEach(() => {
    mock.reset();
    wrapper.unmount()
  })

  it('does not save the weather data when the second HTTP GET fails', async () => {
    wrapper.vm.searchCity('Chicago')

    await flushPromises()

    expect(mock.history.get.length).toBe(2)
    expect(mock.history.get[0].url).toMatch('https://api.openweathermap.org/geo/1.0/direct')
    expect(mock.history.get[0].method).toMatch('get')
    expect(mock.history.get[1].url).toMatch('https://api.openweathermap.org/data/2.5/weather')
    expect(mock.history.get[1].method).toMatch('get')
    
    expect(store.addCity).toHaveBeenCalledTimes(0)

    expect(wrapper.vm.messageToDisplay).toMatch('ERROR! Unable to retrieve weather data for Chicago!')
    expect(wrapper.vm.messageType).toMatch('Error')
  })
})
