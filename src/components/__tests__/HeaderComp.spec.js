import { describe, it, expect, vi, test } from 'vitest'
import { mount } from '@vue/test-utils'
import HeaderComp from '../HeaderComp.vue'
import router from '@/router'


function mountTheApp() {
  const wrapper = mount(HeaderComp, {
    global: {
      plugins: [router]
    }
  })
  return wrapper
}

describe('HeaderComp.vue Test', () => {
  it('mounts properly', () => {
    expect(mountTheApp().text()).toContain('About')
  })

  test('click the links', async () => {
    const push = vi.spyOn(router, 'push')

    await mountTheApp().find('a[id=link]').trigger('click')

    expect(push).toHaveBeenCalledOnce()
    expect(push).toHaveBeenCalledWith('/')

    await mountTheApp().find('a[type=button]').trigger('click')
    
    expect(push).toHaveBeenCalledTimes(2)
    expect(push).toHaveBeenCalledWith('/about')
  })
})
