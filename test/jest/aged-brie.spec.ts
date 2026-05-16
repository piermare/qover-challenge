import { Item, GildedRose } from '@/gilded-rose';

describe('Aged Brie', () => {
  it('increases quality by 1 each day', () => {
    const items = [new Item('Aged Brie', 5, 10)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(11);
  });

  it('decreases sellIn by 1 each day', () => {
    const items = [new Item('Aged Brie', 5, 10)];
    new GildedRose(items).updateQuality();
    expect(items[0].sellIn).toBe(4);
  });

  it('increases quality by 2 once sell-by date has passed', () => {
    const items = [new Item('Aged Brie', 0, 10)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(12);
  });

  it('quality never goes above 50', () => {
    const items = [new Item('Aged Brie', 5, 50)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it('quality is capped at 50 even when incrementing by 2', () => {
    const items = [new Item('Aged Brie', 0, 49)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it('quality never goes below 0', () => {
    const items = [new Item('Aged Brie', 5, 0)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(1);
  });

  it('quality never goes below 0 when sell-by date has passed and instead increases quality by 2', () => {
    const items = [new Item('Aged Brie', -1, 0)];
    new GildedRose(items).updateQuality();
    expect(items[0].quality).toBe(2);
  });
});
