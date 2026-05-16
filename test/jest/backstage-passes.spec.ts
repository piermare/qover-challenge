import { Item, GildedRose } from '@/gilded-rose';

describe('Backstage passes', () => {
  it('increases quality by 1 when more than 10 days remaining', () => {
    const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(21);
  });

  it('increases quality by 2 when 10 days or less remaining', () => {
    const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(22);
  });

  it('increases quality by 3 when 5 days or less remaining', () => {
    const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(23);
  });

  it('quality drops to 0 after the concert', () => {
    const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('decreases sellIn by 1 each day', () => {
    const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)];
    new GildedRose(items).updateQuality();
    expect(items[0].sellIn).toBe(14);
  });

  it('quality never goes above 50', () => {
    const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it('quality never goes below 0', () => {
    const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 15, 0)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(1);
  });

  it('sellIn continues to decrement when already negative', () => {
    const items = [new Item('Backstage passes to a TAFKAL80ETC concert', -1, 0)];
    new GildedRose(items).updateQuality();
    expect(items[0].sellIn).toBe(-2);
  });
});
