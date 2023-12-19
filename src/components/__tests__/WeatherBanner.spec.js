import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import WeatherBanner from '../WeatherBanner.vue'

describe('WeatherBanner.vue Implementation Test', () => {
  let wrapper = null

  beforeEach(() => {
    //render the components in each unit test
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('initializes with correct elements', () => {
    wrapper = shallowMount(WeatherBanner, {
      propsData: {
        bannerMessage: '',
        bannerType: ''
      }
    })

    expect(wrapper.vm.bannerMessage).toMatch('')
    expect(wrapper.vm.bannerType).toMatch('')
    expect(wrapper.vm.bannerBackgroundColor).toMatch('blue')
  })

  it('initializes with error message', () => {
    wrapper = shallowMount(WeatherBanner, {
      propsData: {
        bannerMessage: 'Banner message 123',
        bannerType: 'Error'
      }
    })

    expect(wrapper.vm.bannerMessage).toMatch('Banner message 123')
    expect(wrapper.vm.bannerType).toMatch('Error')
    expect(wrapper.vm.bannerBackgroundColor).toMatch('red')
  })

  it('initializes with success message', () => {
    wrapper = shallowMount(WeatherBanner, {
      propsData: {
        bannerMessage: 'Banner message 456',
        bannerType: 'Success'
      }
    })

    expect(wrapper.vm.bannerMessage).toMatch('Banner message 456')
    expect(wrapper.vm.bannerType).toMatch('Success')
    expect(wrapper.vm.bannerBackgroundColor).toMatch('green')
  })

  it('initializes with info message', () => {
    wrapper = shallowMount(WeatherBanner, {
      propsData: {
        bannerMessage: 'Banner message 789',
        bannerType: 'Info'
      }
    })

    expect(wrapper.vm.bannerMessage).toMatch('Banner message 789')
    expect(wrapper.vm.bannerType).toMatch('Info')
    expect(wrapper.vm.bannerBackgroundColor).toMatch('blue')
  })

  it('emits an event when the clear button is clicked', () => {
    wrapper = shallowMount(WeatherBanner, {
      propsData: {
        bannerMessage: 'Banner message 123',
        bannerType: 'Error'
      }
    })

    wrapper.find('span').trigger('click')

    expect(wrapper.emitted('clear-banner')).toBeTruthy()
    expect(wrapper.emitted('clear-banner').length).toBe(1)
  })
})
