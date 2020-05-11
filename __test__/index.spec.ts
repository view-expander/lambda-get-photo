import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { handler } from '../src'

describe('handler()', () => {
  let mock: MockAdapter

  beforeEach(() => {
    process.env.IMGIX_DOMAIN = undefined
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.restore()
  })

  it('be succeed', async () => {
    expect.assertions(1)

    process.env.IMGIX_DOMAIN = 'view-expander.imgix.net'
    mock
      .onGet()
      .reply(
        200,
        Uint8Array.from(
          Buffer.from(
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=',
            'base64'
          )
        ).buffer,
        {
          'Content-Type': 'image/png',
        }
      )

    return expect(
      handler({
        pathParameters: { key: 'image.jpg' },
      } as any)
    ).resolves.toMatchSnapshot()
  })
})
