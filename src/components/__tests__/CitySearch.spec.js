import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import CitySearch from '../CitySearch.vue'


describe('CitySearch.vue Implementation Test', () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = shallowMount(CitySearch)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('initializes with correct elements', () => {
    expect(wrapper.findAll('h2').length).toEqual(1)
    expect(wrapper.findAll('h2').at(0).text()).toMatch('Weather Search')

    expect(wrapper.findAll('label').length).toEqual(1)
    expect(wrapper.findAll('label').at(0).text()).toMatch('City:')

    expect(wrapper.findAll('button').length).toEqual(2)
    expect(wrapper.findAll('button').at(0).text()).toMatch('Search')
    expect(wrapper.findAll('button').at(1).text()).toMatch('Clear')
    expect(wrapper.findAll('button').at(0).element.disabled).toBeTruthy()
    expect(wrapper.findAll('button').at(1).element.disabled).toBeTruthy()
  })

  it('emits a custom event when searchCity() is called', () => {
    wrapper.vm.inputCity = 'Denver'

    wrapper.vm.searchCity()

    expect(wrapper.emitted('search-city')).toBeTruthy()
    expect(wrapper.emitted('search-city').length).toBe(1)
    expect(wrapper.emitted('search-city')[0][0]).toMatch('Denver')

    // expect(wrapper.vm.inputCity).toMatch('Denver')
    expect(wrapper.vm.inputCity).toMatch(/^$/)
  })
})

describe('CitySearch.vue Behavioral Test', () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = shallowMount(CitySearch)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('initializes with the two buttons disabled', () => {
    expect(wrapper.findAll('button').length).toEqual(2)
    expect(wrapper.findAll('button').at(0).text()).toMatch('Search')
    expect(wrapper.findAll('button').at(1).text()).toMatch('Clear')
    expect(wrapper.findAll('button').at(0).element.disabled).toBeTruthy()
    expect(wrapper.findAll('button').at(1).element.disabled).toBeTruthy()
  })

  it('enables the two buttons when a city is entered', async () => {
    wrapper.vm.inputCity = 'San Francisco'

    await flushPromises()

    expect(wrapper.findAll('button').length).toEqual(2)
    expect(wrapper.findAll('button').at(0).text()).toMatch('Search')
    expect(wrapper.findAll('button').at(1).text()).toMatch('Clear')
    expect(wrapper.findAll('button').at(0).element.disabled).toBeFalsy()
    expect(wrapper.findAll('button').at(1).element.disabled).toBeFalsy()
  })

  it('clears the input when clearCity() is called', () => {
    wrapper.vm.inputCity = 'San Francisco'

    wrapper.vm.clearCity()

    expect(wrapper.vm.inputCity).toMatch(/^$/)
  })
})
