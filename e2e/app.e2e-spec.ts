import { NgrxreduxPage } from './app.po';

describe('ngrxredux App', function() {
  let page: NgrxreduxPage;

  beforeEach(() => {
    page = new NgrxreduxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
