import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

describe('bộ test', () => {
  it('mount được component Vue trong jsdom', () => {
    const C = defineComponent({ render: () => h('p', 'xin chào') })
    expect(mount(C).text()).toBe('xin chào')
  })
})
