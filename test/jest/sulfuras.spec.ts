import { Item, GildedRose } from '@/gilded-rose';

describe('Sulfuras', () => {
  it('never changes quality', () => {
    const items = [new Item('Sulfuras, Hand of Ragnaros', 0, 80)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(80);
  });

  it('never changes sellIn', () => {
    const items = [new Item('Sulfuras, Hand of Ragnaros', 0, 80)];
    new GildedRose(items).updateQuality();
    expect(items[0].sellIn).toBe(0);
  });

  it('never changes quality even with negative sellIn', () => {
    const items = [new Item('Sulfuras, Hand of Ragnaros', -1, 80)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(80);
  });

  it('never changes sellIn even when already negative', () => {
    const items = [new Item('Sulfuras, Hand of Ragnaros', -1, 80)];
    new GildedRose(items).updateQuality();
    expect(items[0].sellIn).toBe(-1);
  });
});
