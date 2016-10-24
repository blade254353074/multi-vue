import { expect } from 'chai'
import { Selector } from 'testcafe'

const getElementById = Selector(id => document.querySelector(`#${id}`))

fixture `Getting Started`
  .page('https://devexpress.github.io/testcafe/example');

test('My first test', async (t) => {
    // Test code
    await t
      .typeText('#developer-name', 'John Smith')
      .click('#submit-button')

    const articleHeader = await getElementById('article-header')
    const headerText = articleHeader.innerText

    expect(headerText).to.equal('Thank you, John Smith!')
});
