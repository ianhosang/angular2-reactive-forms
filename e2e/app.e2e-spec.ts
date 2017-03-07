import { Angular2ReactiveformsExamplePage } from './app.po';

describe('angular2-reactiveforms-example App', function() {
  let page: Angular2ReactiveformsExamplePage;

  beforeEach(() => {
    page = new Angular2ReactiveformsExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
