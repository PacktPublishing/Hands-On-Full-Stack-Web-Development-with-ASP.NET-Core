import { MarketModule } from './market.module';

describe('MarketModule', () => {
  let marketModule: MarketModule;

  beforeEach(() => {
    marketModule = new MarketModule();
  });

  it('should create an instance', () => {
    expect(marketModule).toBeTruthy();
  });
});
