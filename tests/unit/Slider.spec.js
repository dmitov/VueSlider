import { shallowMount } from '@vue/test-utils'
import fetchMock from 'fetch-mock'
import flushPromises from 'flush-promises'
import Slider from '@/Slider.vue'

const images = [
  'https://placeimg.com/640/480/arch',
  'https://placeimg.com/640/480/animals',
  'https://placeimg.com/640/480/nature'
]

describe('Slider.vue', () => {
  beforeEach(() => {
    fetchMock.get('*', JSON.stringify({
      'images': images
    }))
  })

  it('loads a source when passed', async () => {
    const wrapper = shallowMount(Slider)

    await flushPromises()

    const expectedImages = []
    images.forEach((image) => {
      expectedImages.push({ src: image, loaded: false })
    })

    expect(wrapper.vm.images).toEqual(expectedImages)
  })

  it('renders an image', async () => {
    const wrapper = shallowMount(Slider)

    await flushPromises()

    expect(wrapper.contains('img')).toBe(true)
    expect(wrapper.find('img').attributes().src).toBe(images[0])
  })

  it('changes images forwards', async () => {
    const wrapper = shallowMount(Slider)

    await flushPromises()

    expect(wrapper.find('img').attributes().src).toBe(images[0])

    wrapper.find('.slider-button-next').trigger('click')

    expect(wrapper.find('img').attributes().src).toBe(images[1])
  })

  it('changes images backwards', async () => {
    const wrapper = shallowMount(Slider)

    await flushPromises()

    expect(wrapper.find('img').attributes().src).toBe(images[0])

    wrapper.find('.slider-button-back').trigger('click')

    expect(wrapper.find('img').attributes().src).toBe(images[images.length - 1])
  })

  afterEach(() => {
    fetchMock.restore()
  })
})
