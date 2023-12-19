import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import { createTestingPinia } from '@pinia/testing'

describe('HomeView.vue Test', () => {
  it('renders the page', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    expect(wrapper.getComponent({ name: 'WeatherHeader' }).exists()).toBeTruthy()
    expect(wrapper.getComponent({ name: 'WeatherContent' }).exists()).toBeTruthy()
  })
})
