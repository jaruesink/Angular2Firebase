import { SimpleappPage } from './app.po';

describe('simpleapp App', function() {
  let page: SimpleappPage;

  beforeEach(() => {
    page = new SimpleappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
