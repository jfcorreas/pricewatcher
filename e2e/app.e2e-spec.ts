import { PricewatcherPage } from './app.po';

describe('pricewatcher App', () => {
  let page: PricewatcherPage;

  beforeEach(() => {
    page = new PricewatcherPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
